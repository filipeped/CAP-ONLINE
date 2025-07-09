// ✅ Proxy Meta CAPI com deduplicação real e user_data enriquecido (multi-domínio)
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "1142320931265624";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

if (!ACCESS_TOKEN) {
  throw new Error("Meta CAPI Access Token não configurado. Defina META_ACCESS_TOKEN nas variáveis de ambiente.");
}

interface MetaEvent {
  event_name: string;
  event_id?: string;
  event_time?: number;
  event_source_url?: string;
  action_source?: string;
  session_id?: string;
  custom_data?: {
    value?: number;
    currency?: string;
    [key: string]: any;
  };
  user_data?: {
    fbp?: string;
    fbc?: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin || "";
  if (origin.includes("digitalpaisagismo")) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const events: MetaEvent[] = req.body?.data;
    if (!events || !Array.isArray(events)) {
      console.error("❌ Payload inválido: 'data' ausente ou formato incorreto.", req.body);
      return res.status(400).json({ error: "Payload inválido - campo 'data' (array) obrigatório" });
    }

    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";

    const enrichedData = events
      .filter(event => !!event?.event_name)
      .map(event => {
        const sessionId = event.session_id || `${ip}_${userAgent}_${Date.now()}`;
        const externalIdHash = crypto.createHash("sha256").update(sessionId).digest("hex");

        const eventId = event.event_id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
        const eventTime = event.event_time || Math.floor(Date.now() / 1000);
        const actionSource = event.action_source || "website";
        const eventSourceUrl = event.event_source_url || origin || `https://${req.headers.host}`;

        const customData = { ...event.custom_data };
        if (typeof customData.value !== "number" || customData.value <= 0) {
          delete customData.value;
        }
        customData.currency = customData.currency ?? "BRL";

        const userData: Record<string, any> = {
          external_id: externalIdHash,
          client_ip_address: ip,
          client_user_agent: userAgent,
        };
        if (event.user_data?.fbp) userData.fbp = event.user_data.fbp;
        if (event.user_data?.fbc) userData.fbc = event.user_data.fbc;

        return {
          event_name: event.event_name,
          event_id: eventId,
          event_time: eventTime,
          event_source_url: eventSourceUrl,
          action_source: actionSource,
          custom_data: customData,
          user_data: userData,
        };
      });

    const payload = { data: enrichedData };
    console.log("📤 Enviando eventos para Meta CAPI...");
    console.debug("📦 Payload:", JSON.stringify(payload));

    const response = await fetch(`${META_URL}?access_token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    console.log(`✅ Resposta da Meta [Status: ${response.status}]:`, responseData);
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error("❌ Erro no Proxy CAPI:", error);
    return res.status(500).json({ error: "Erro interno no servidor CAPI." });
  }
}
