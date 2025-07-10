// ✅ digitalpaisagismo.online – Versão CAPI secundária com validação e logs aprimorados
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const PIXEL_ID = "1142320931265624";
const ACCESS_TOKEN = "EAAQfmxkTTZCcBPMtbiRdOTtGC1LycYJsKXnFZCs3N04MsoBjbx5WdvaPhObbtmKg3iDZBJZAjAlpzqWAr80uEUsUSm95bVCODpzJSsC3X6gA9u6yPC3oDko8gUIMW2SA5C7MOsZBvmyVN72N38UcMKp8uGbQaPxe9r5r66H6PAXuZCieIl6gPIFU5c2ympRwZDZD";
const META_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`;

function hashPII(value: string): string {
  if (!value || typeof value !== "string") return "";
  return crypto.createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase().trim());
}

function isValidPhone(phone: string): boolean {
  const clean = phone.replace(/\D/g, "");
  return clean.length >= 10 && clean.length <= 15;
}

function cleanPII(value: string): string {
  return typeof value === "string" ? value.toLowerCase().trim() : "";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    if (!req.body?.data || !Array.isArray(req.body.data)) {
      return res.status(400).json({ error: "Payload inválido" });
    }

    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";

    const enrichedData = req.body.data.map((event: any) => {
      const sessionId = event.session_id || "";
      const externalId = sessionId ? hashPII(sessionId) : "";

      const eventId = event.event_id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const eventTime = event.event_time || Math.floor(Date.now() / 1000);
      const eventSourceUrl = event.event_source_url || "https://www.digitalpaisagismo.online";
      const actionSource = event.action_source || "website";

      const rawCustom = typeof event.custom_data === "object" ? event.custom_data : {};
      const rawUser = typeof event.user_data === "object" ? event.user_data : {};

      const parsedValue = typeof rawCustom?.value === "string" ? Number(rawCustom.value) : rawCustom.value;
      const customData: any = {
        ...rawCustom,
        currency: rawCustom?.currency ?? "BRL",
      };
      if (!isNaN(parsedValue) && parsedValue > 0) {
        customData.value = parsedValue;
      }

      const userData: any = {
        client_ip_address: ip,
        client_user_agent: userAgent,
      };

      if (externalId) userData.external_id = externalId;
      if (rawUser.fbp && typeof rawUser.fbp === "string") userData.fbp = rawUser.fbp.trim();
      if (rawUser.fbc && typeof rawUser.fbc === "string" && rawUser.fbc.trim().length >= 10) userData.fbc = rawUser.fbc.trim();

      if (rawUser.em && isValidEmail(cleanPII(rawUser.em))) userData.em = hashPII(cleanPII(rawUser.em));
      if (rawUser.ph && isValidPhone(cleanPII(rawUser.ph))) userData.ph = hashPII(cleanPII(rawUser.ph));
      if (rawUser.fn && cleanPII(rawUser.fn).length >= 2) userData.fn = hashPII(cleanPII(rawUser.fn));
      if (rawUser.ln && cleanPII(rawUser.ln).length >= 2) userData.ln = hashPII(cleanPII(rawUser.ln));

      if (event.event_name === "Lead") {
        if (!externalId || (!userData.em && !userData.ph && !userData.fn && !userData.ln)) {
          console.warn("⚠️ Evento Lead com dados de correspondência insuficientes");
        }
      }

      console.log("📦 Evento preparado:", {
        event_name: event.event_name,
        event_id,
        external_id,
        user_data: userData,
        custom_data: customData,
      });

      return {
        ...event,
        event_id: eventId,
        event_time: eventTime,
        event_source_url: eventSourceUrl,
        action_source: actionSource,
        custom_data: customData,
        user_data: userData,
      };
    });

    const response = await fetch(`${META_URL}?access_token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: enrichedData }),
    });

    const result = await response.json();
    res.status(response.status).json(result);
  } catch (err) {
    console.error("❌ Erro ao processar evento:", err);
    res.status(500).json({ error: "Erro interno no servidor CAPI." });
  }
}
