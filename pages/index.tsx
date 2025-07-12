<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código Painel CAPI - Vercel Compatível</title>
    <style>
        /* ===== ESTILOS DO PAINEL CAPI ===== */
        .capi-panel-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            border: none;
            padding: 15px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5em;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transition: all 0.3s ease;
        }

        .capi-panel-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .capi-panel {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            display: none;
            overflow-y: auto;
        }

        .capi-panel.show {
            display: block;
        }

        .capi-panel-container {
            max-width: 1200px;
            margin: 20px auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            max-height: calc(100vh - 40px);
            overflow-y: auto;
        }

        .capi-panel-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
        }

        .capi-panel-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 10px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2em;
        }

        .capi-panel-header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .capi-panel-header p {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .capi-panel-content {
            padding: 30px;
        }

        .capi-test-section {
            margin-bottom: 40px;
            padding: 25px;
            border: 2px solid #e1e5e9;
            border-radius: 12px;
            background: #f8f9fa;
        }

        .capi-test-section h2 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 1.5em;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }

        .capi-test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .capi-test-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            border-left: 4px solid #667eea;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .capi-test-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .capi-test-card h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.2em;
        }

        .capi-test-card p {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.6;
        }

        .capi-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1em;
            font-weight: 600;
            transition: all 0.3s ease;
            margin: 5px;
            min-width: 120px;
        }

        .capi-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .capi-btn:active {
            transform: translateY(0);
        }

        .capi-btn-success {
            background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
        }

        .capi-btn-warning {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .capi-btn-info {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .capi-btn-danger {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }

        .capi-results {
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            max-height: 300px;
            overflow-y: auto;
        }

        .capi-result-item {
            margin-bottom: 10px;
            padding: 10px;
            background: white;
            border-radius: 6px;
            border-left: 3px solid #28a745;
        }

        .capi-result-item.error {
            border-left-color: #dc3545;
            background: #fff5f5;
        }

        .capi-result-item.warning {
            border-left-color: #ffc107;
            background: #fffbf0;
        }

        .capi-status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .capi-status-success {
            background: #28a745;
        }

        .capi-status-error {
            background: #dc3545;
        }

        .capi-status-warning {
            background: #ffc107;
        }

        .capi-status-info {
            background: #17a2b8;
        }

        .capi-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .capi-stat-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .capi-stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }

        .capi-stat-label {
            color: #666;
            margin-top: 5px;
        }

        .capi-hidden {
            display: none;
        }

        .capi-loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: capi-spin 1s linear infinite;
        }

        @keyframes capi-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Responsividade */
        @media (max-width: 768px) {
            .capi-panel-container {
                margin: 10px;
                max-height: calc(100vh - 20px);
            }
            
            .capi-test-grid {
                grid-template-columns: 1fr;
            }
            
            .capi-stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .capi-panel-header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>

<!-- ===== CÓDIGO HTML DO PAINEL CAPI ===== -->
<button class="capi-panel-toggle" onclick="toggleCapiPanel()" title="Painel de Testes CAPI">🧪</button>

<div class="capi-panel" id="capiPanel">
    <div class="capi-panel-container">
        <div class="capi-panel-header">
            <button class="capi-panel-close" onclick="toggleCapiPanel()">×</button>
            <h1>🧪 Painel de Testes CAPI</h1>
            <p>Testes completos para Facebook Conversions API</p>
        </div>

        <div class="capi-panel-content">
            <!-- Seção de Status Geral -->
            <div class="capi-test-section">
                <h2>📊 Status Geral do Sistema</h2>
                <div class="capi-stats-grid">
                    <div class="capi-stat-card">
                        <div class="capi-stat-number" id="capiTotalTests">0</div>
                        <div class="capi-stat-label">Testes Executados</div>
                    </div>
                    <div class="capi-stat-card">
                        <div class="capi-stat-number" id="capiSuccessRate">0%</div>
                        <div class="capi-stat-label">Taxa de Sucesso</div>
                    </div>
                    <div class="capi-stat-card">
                        <div class="capi-stat-number" id="capiAvgLatency">0ms</div>
                        <div class="capi-stat-label">Latência Média</div>
                    </div>
                    <div class="capi-stat-card">
                        <div class="capi-stat-number" id="capiEndpointUsed">-</div>
                        <div class="capi-stat-label">Endpoint Ativo</div>
                    </div>
                </div>
            </div>

            <!-- Seção de Testes Básicos -->
            <div class="capi-test-section">
                <h2>🔧 Testes Básicos</h2>
                <div class="capi-test-grid">
                    <div class="capi-test-card">
                        <h3>Teste de Conectividade</h3>
                        <p>Verifica se o sistema consegue se conectar ao endpoint CAPI</p>
                        <button class="capi-btn capi-btn-info" onclick="capiTestConnectivity()">
                            <span class="capi-loading capi-hidden" id="capiLoadingConnectivity"></span>
                            Testar Conexão
                        </button>
                        <div class="capi-results" id="capiResultsConnectivity"></div>
                    </div>

                    <div class="capi-test-card">
                        <h3>Teste de Cookie</h3>
                        <p>Verifica se o cookie _visitor_id está sendo gerado corretamente</p>
                        <button class="capi-btn capi-btn-info" onclick="capiTestCookie()">
                            <span class="capi-loading capi-hidden" id="capiLoadingCookie"></span>
                            Verificar Cookie
                        </button>
                        <div class="capi-results" id="capiResultsCookie"></div>
                    </div>

                    <div class="capi-test-card">
                        <h3>Teste de Endpoint</h3>
                        <p>Verifica qual endpoint está sendo usado baseado no domínio</p>
                        <button class="capi-btn capi-btn-info" onclick="capiTestEndpoint()">
                            <span class="capi-loading capi-hidden" id="capiLoadingEndpoint"></span>
                            Verificar Endpoint
                        </button>
                        <div class="capi-results" id="capiResultsEndpoint"></div>
                    </div>
                </div>
            </div>

            <!-- Seção de Testes de Eventos -->
            <div class="capi-test-section">
                <h2>📡 Testes de Eventos</h2>
                <div class="capi-test-grid">
                    <div class="capi-test-card">
                        <h3>PageView</h3>
                        <p>Dispara evento PageView via CAPI</p>
                        <button class="capi-btn capi-btn-success" onclick="capiTestPageView()">
                            <span class="capi-loading capi-hidden" id="capiLoadingPageView"></span>
                            Disparar PageView
                        </button>
                        <div class="capi-results" id="capiResultsPageView"></div>
                    </div>

                    <div class="capi-test-card">
                        <h3>Lead</h3>
                        <p>Dispara evento Lead via CAPI</p>
                        <button class="capi-btn capi-btn-success" onclick="capiTestLead()">
                            <span class="capi-loading capi-hidden" id="capiLoadingLead"></span>
                            Disparar Lead
                        </button>
                        <div class="capi-results" id="capiResultsLead"></div>
                    </div>

                    <div class="capi-test-card">
                        <h3>Purchase</h3>
                        <p>Dispara evento Purchase via CAPI</p>
                        <button class="capi-btn capi-btn-success" onclick="capiTestPurchase()">
                            <span class="capi-loading capi-hidden" id="capiLoadingPurchase"></span>
                            Disparar Purchase
                        </button>
                        <div class="capi-results" id="capiResultsPurchase"></div>
                    </div>

                    <div class="capi-test-card">
                        <h3>Custom Event</h3>
                        <p>Dispara evento customizado via CAPI</p>
                        <button class="capi-btn capi-btn-warning" onclick="capiTestCustomEvent()">
                            <span class="capi-loading capi-hidden" id="capiLoadingCustom"></span>
                            Disparar Custom
                        </button>
                        <div class="capi-results" id="capiResultsCustom"></div>
                    </div>
                </div>
            </div>

            <!-- Seção de Testes Avançados -->
            <div class="capi-test-section">
                <h2>🚀 Testes Avançados</h2>
                <div class="capi-test-grid">
                    <div class="capi-test-card">
                        <h3>Teste de Performance</h3>
                        <p>Executa múltiplos eventos para testar performance</p>
                        <button class="capi-btn capi-btn-warning" onclick="capiTestPerformance()">
                            <span class="capi-loading capi-hidden" id="capiLoadingPerformance"></span>
                            Teste Performance
                        </button>
                        <div class="capi-results" id="capiResultsPerformance"></div>
                    </div>

                    <div class="capi-test-card">
                        <h3>Teste de Deduplicação</h3>
                        <p>Verifica se eventos duplicados são tratados corretamente</p>
                        <button class="capi-btn capi-btn-warning" onclick="capiTestDeduplication()">
                            <span class="capi-loading capi-hidden" id="capiLoadingDeduplication"></span>
                            Testar Deduplicação
                        </button>
                        <div class="capi-results" id="capiResultsDeduplication"></div>
                    </div>

                    <div class="capi-test-card">
                        <h3>Validação Completa</h3>
                        <p>Executa todos os testes de validação</p>
                        <button class="capi-btn capi-btn-danger" onclick="capiRunFullValidation()">
                            <span class="capi-loading capi-hidden" id="capiLoadingValidation"></span>
                            Validação Completa
                        </button>
                        <div class="capi-results" id="capiResultsValidation"></div>
                    </div>

                    <div class="capi-test-card">
                        <h3>Limpar Resultados</h3>
                        <p>Limpa todos os resultados dos testes</p>
                        <button class="capi-btn capi-btn-info" onclick="capiClearResults()">
                            Limpar Tudo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ===== JAVASCRIPT DO PAINEL CAPI ===== -->
<script>
// Configurações globais do painel CAPI
let capiTestResults = {
    total: 0,
    success: 0,
    latency: []
};

// Função para alternar visibilidade do painel
function toggleCapiPanel() {
    const panel = document.getElementById('capiPanel');
    panel.classList.toggle('show');
}

// Função para mostrar loading
function capiShowLoading(buttonId) {
    const button = document.querySelector(`#${buttonId}`).parentElement;
    const loading = button.querySelector('.capi-loading');
    const text = button.querySelector('button').textContent;
    button.querySelector('button').textContent = '';
    loading.classList.remove('capi-hidden');
}

// Função para esconder loading
function capiHideLoading(buttonId) {
    const button = document.querySelector(`#${buttonId}`).parentElement;
    const loading = button.querySelector('.capi-loading');
    loading.classList.add('capi-hidden');
    
    // Restaurar texto original baseado no ID
    const buttonElement = button.querySelector('button');
    if (buttonId.includes('Connectivity')) buttonElement.textContent = 'Testar Conexão';
    else if (buttonId.includes('Cookie')) buttonElement.textContent = 'Verificar Cookie';
    else if (buttonId.includes('Endpoint')) buttonElement.textContent = 'Verificar Endpoint';
    else if (buttonId.includes('PageView')) buttonElement.textContent = 'Disparar PageView';
    else if (buttonId.includes('Lead')) buttonElement.textContent = 'Disparar Lead';
    else if (buttonId.includes('Purchase')) buttonElement.textContent = 'Disparar Purchase';
    else if (buttonId.includes('Custom')) buttonElement.textContent = 'Disparar Custom';
    else if (buttonId.includes('Performance')) buttonElement.textContent = 'Teste Performance';
    else if (buttonId.includes('Deduplication')) buttonElement.textContent = 'Testar Deduplicação';
    else if (buttonId.includes('Validation')) buttonElement.textContent = 'Validação Completa';
}

// Função para adicionar resultado
function capiAddResult(containerId, message, type = 'success') {
    const container = document.getElementById(containerId);
    const resultItem = document.createElement('div');
    resultItem.className = `capi-result-item ${type}`;
    
    const statusIndicator = document.createElement('span');
    statusIndicator.className = `capi-status-indicator capi-status-${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    resultItem.innerHTML = `
        ${statusIndicator.outerHTML}
        <strong>[${timestamp}]</strong> ${message}
    `;
    
    container.appendChild(resultItem);
    container.scrollTop = container.scrollHeight;
}

// Função para atualizar estatísticas
function capiUpdateStats() {
    document.getElementById('capiTotalTests').textContent = capiTestResults.total;
    const successRate = capiTestResults.total > 0 ? Math.round((capiTestResults.success / capiTestResults.total) * 100) : 0;
    document.getElementById('capiSuccessRate').textContent = `${successRate}%`;
    
    if (capiTestResults.latency.length > 0) {
        const avgLatency = Math.round(capiTestResults.latency.reduce((a, b) => a + b, 0) / capiTestResults.latency.length);
        document.getElementById('capiAvgLatency').textContent = `${avgLatency}ms`;
    }
}

// Função para obter endpoint CAPI
function capiGetEndpoint() {
    const hostname = window.location.hostname;
    const url = window.location.href;
    
    // Verificar se é localhost ou arquivo local
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '') {
        return 'https://www.digitalpaisagismo.online/api/events-otimizado-online';
    }
    
    // Verificar se contém "online" na URL ou hostname
    if (hostname.includes('online') || url.includes('online')) {
        return 'https://www.digitalpaisagismo.online/api/events-otimizado-online';
    }
    
    // Fallback para .com.br
    return 'https://www.digitalpaisagismo.com.br/api/events-otimizado';
}

// Função para gerar visitor_id
function capiGenerateVisitorId() {
    let visitorId = localStorage.getItem('_visitor_id');
    if (!visitorId) {
        visitorId = 'vis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('_visitor_id', visitorId);
    }
    return visitorId;
}

// Função para enviar evento CAPI
async function capiSendEvent(eventName, eventData = {}) {
    const startTime = Date.now();
    const endpoint = capiGetEndpoint();
    const visitorId = capiGenerateVisitorId();
    
    const payload = {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: window.location.href,
        user_data: {
            client_ip_address: '127.0.0.1',
            client_user_agent: navigator.userAgent,
            fbc: localStorage.getItem('_fbp') || '',
            fbp: localStorage.getItem('_fbc') || ''
        },
        custom_data: {
            visitor_id: visitorId,
            ...eventData
        }
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const endTime = Date.now();
        const latency = endTime - startTime;
        
        capiTestResults.total++;
        capiTestResults.latency.push(latency);
        
        if (response.ok) {
            capiTestResults.success++;
            capiUpdateStats();
            return { success: true, latency, response: await response.json() };
        } else {
            capiUpdateStats();
            return { success: false, latency, error: `HTTP ${response.status}` };
        }
    } catch (error) {
        const endTime = Date.now();
        const latency = endTime - startTime;
        capiTestResults.total++;
        capiTestResults.latency.push(latency);
        capiUpdateStats();
        return { success: false, latency, error: error.message };
    }
}

// Teste de conectividade
async function capiTestConnectivity() {
    capiShowLoading('capiLoadingConnectivity');
    const resultsContainer = document.getElementById('capiResultsConnectivity');
    resultsContainer.innerHTML = '';
    
    try {
        const result = await capiSendEvent('PageView');
        
        if (result.success) {
            capiAddResult('capiResultsConnectivity', `✅ Conexão bem-sucedida! Latência: ${result.latency}ms`, 'success');
            document.getElementById('capiEndpointUsed').textContent = capiGetEndpoint().includes('online') ? 'ONLINE' : 'COM.BR';
        } else {
            capiAddResult('capiResultsConnectivity', `❌ Falha na conexão: ${result.error}`, 'error');
        }
    } catch (error) {
        capiAddResult('capiResultsConnectivity', `❌ Erro inesperado: ${error.message}`, 'error');
    }
    
    capiHideLoading('capiLoadingConnectivity');
}

// Teste de cookie
async function capiTestCookie() {
    capiShowLoading('capiLoadingCookie');
    const resultsContainer = document.getElementById('capiResultsCookie');
    resultsContainer.innerHTML = '';
    
    const visitorId = capiGenerateVisitorId();
    const storedId = localStorage.getItem('_visitor_id');
    
    if (visitorId && storedId && visitorId === storedId) {
        capiAddResult('capiResultsCookie', `✅ Cookie _visitor_id gerado corretamente: ${visitorId}`, 'success');
    } else {
        capiAddResult('capiResultsCookie', `❌ Problema com cookie _visitor_id`, 'error');
    }
    
    capiHideLoading('capiLoadingCookie');
}

// Teste de endpoint
async function capiTestEndpoint() {
    capiShowLoading('capiLoadingEndpoint');
    const resultsContainer = document.getElementById('capiResultsEndpoint');
    resultsContainer.innerHTML = '';
    
    const endpoint = capiGetEndpoint();
    const hostname = window.location.hostname;
    const url = window.location.href;
    
    capiAddResult('capiResultsEndpoint', `📍 Hostname: ${hostname}`, 'info');
    capiAddResult('capiResultsEndpoint', `🌐 URL: ${url}`, 'info');
    capiAddResult('capiResultsEndpoint', `🔗 Endpoint selecionado: ${endpoint}`, 'success');
    
    if (endpoint.includes('online')) {
        capiAddResult('capiResultsEndpoint', `✅ Usando endpoint .online`, 'success');
    } else {
        capiAddResult('capiResultsEndpoint', `ℹ️ Usando endpoint .com.br`, 'warning');
    }
    
    capiHideLoading('capiLoadingEndpoint');
}

// Teste PageView
async function capiTestPageView() {
    capiShowLoading('capiLoadingPageView');
    const resultsContainer = document.getElementById('capiResultsPageView');
    resultsContainer.innerHTML = '';
    
    try {
        const result = await capiSendEvent('PageView', {
            content_name: 'Teste PageView',
            content_category: 'test'
        });
        
        if (result.success) {
            capiAddResult('capiResultsPageView', `✅ PageView enviado com sucesso! Latência: ${result.latency}ms`, 'success');
        } else {
            capiAddResult('capiResultsPageView', `❌ Falha no envio: ${result.error}`, 'error');
        }
    } catch (error) {
        capiAddResult('capiResultsPageView', `❌ Erro inesperado: ${error.message}`, 'error');
    }
    
    capiHideLoading('capiLoadingPageView');
}

// Teste Lead
async function capiTestLead() {
    capiShowLoading('capiLoadingLead');
    const resultsContainer = document.getElementById('capiResultsLead');
    resultsContainer.innerHTML = '';
    
    try {
        const result = await capiSendEvent('Lead', {
            content_name: 'Teste Lead',
            content_category: 'lead_generation',
            value: 100.00,
            currency: 'BRL'
        });
        
        if (result.success) {
            capiAddResult('capiResultsLead', `✅ Lead enviado com sucesso! Latência: ${result.latency}ms`, 'success');
        } else {
            capiAddResult('capiResultsLead', `❌ Falha no envio: ${result.error}`, 'error');
        }
    } catch (error) {
        capiAddResult('capiResultsLead', `❌ Erro inesperado: ${error.message}`, 'error');
    }
    
    capiHideLoading('capiLoadingLead');
}

// Teste Purchase
async function capiTestPurchase() {
    capiShowLoading('capiLoadingPurchase');
    const resultsContainer = document.getElementById('capiResultsPurchase');
    resultsContainer.innerHTML = '';
    
    try {
        const result = await capiSendEvent('Purchase', {
            content_name: 'Teste Purchase',
            content_category: 'ecommerce',
            value: 299.90,
            currency: 'BRL',
            content_ids: ['prod_001'],
            content_type: 'product'
        });
        
        if (result.success) {
            capiAddResult('capiResultsPurchase', `✅ Purchase enviado com sucesso! Latência: ${result.latency}ms`, 'success');
        } else {
            capiAddResult('capiResultsPurchase', `❌ Falha no envio: ${result.error}`, 'error');
        }
    } catch (error) {
        capiAddResult('capiResultsPurchase', `❌ Erro inesperado: ${error.message}`, 'error');
    }
    
    capiHideLoading('capiLoadingPurchase');
}

// Teste Custom Event
async function capiTestCustomEvent() {
    capiShowLoading('capiLoadingCustom');
    const resultsContainer = document.getElementById('capiResultsCustom');
    resultsContainer.innerHTML = '';
    
    try {
        const result = await capiSendEvent('CustomEvent', {
            content_name: 'Teste Custom',
            content_category: 'custom',
            custom_parameter: 'test_value'
        });
        
        if (result.success) {
            capiAddResult('capiResultsCustom', `✅ Custom Event enviado com sucesso! Latência: ${result.latency}ms`, 'success');
        } else {
            capiAddResult('capiResultsCustom', `❌ Falha no envio: ${result.error}`, 'error');
        }
    } catch (error) {
        capiAddResult('capiResultsCustom', `❌ Erro inesperado: ${error.message}`, 'error');
    }
    
    capiHideLoading('capiLoadingCustom');
}

// Teste de Performance
async function capiTestPerformance() {
    capiShowLoading('capiLoadingPerformance');
    const resultsContainer = document.getElementById('capiResultsPerformance');
    resultsContainer.innerHTML = '';
    
    capiAddResult('capiResultsPerformance', `🚀 Iniciando teste de performance...`, 'info');
    
    const events = ['PageView', 'Lead', 'Purchase', 'CustomEvent'];
    const results = [];
    
    for (let i = 0; i < 5; i++) {
        for (const event of events) {
            try {
                const result = await capiSendEvent(event, {
                    content_name: `Performance Test ${i + 1}`,
                    content_category: 'performance_test'
                });
                results.push(result);
                
                if (result.success) {
                    capiAddResult('capiResultsPerformance', `✅ ${event} ${i + 1}: ${result.latency}ms`, 'success');
                } else {
                    capiAddResult('capiResultsPerformance', `❌ ${event} ${i + 1}: ${result.error}`, 'error');
                }
            } catch (error) {
                capiAddResult('capiResultsPerformance', `❌ ${event} ${i + 1}: ${error.message}`, 'error');
            }
            
            // Pequena pausa entre eventos
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    
    const successfulEvents = results.filter(r => r.success).length;
    const totalEvents = results.length;
    const avgLatency = results.length > 0 ? 
        Math.round(results.reduce((sum, r) => sum + r.latency, 0) / results.length) : 0;
    
    capiAddResult('capiResultsPerformance', `📊 Resultado Final: ${successfulEvents}/${totalEvents} eventos bem-sucedidos`, 'info');
    capiAddResult('capiResultsPerformance', `⚡ Latência média: ${avgLatency}ms`, 'info');
    
    capiHideLoading('capiLoadingPerformance');
}

// Teste de Deduplicação
async function capiTestDeduplication() {
    capiShowLoading('capiLoadingDeduplication');
    const resultsContainer = document.getElementById('capiResultsDeduplication');
    resultsContainer.innerHTML = '';
    
    capiAddResult('capiResultsDeduplication', `🔄 Testando deduplicação...`, 'info');
    
    // Enviar o mesmo evento múltiplas vezes
    const eventData = {
        content_name: 'Teste Deduplicação',
        content_category: 'dedup_test',
        test_id: Date.now()
    };
    
    const results = [];
    for (let i = 0; i < 3; i++) {
        try {
            const result = await capiSendEvent('PageView', eventData);
            results.push(result);
            
            if (result.success) {
                capiAddResult('capiResultsDeduplication', `✅ Evento ${i + 1}: ${result.latency}ms`, 'success');
            } else {
                capiAddResult('capiResultsDeduplication', `❌ Evento ${i + 1}: ${result.error}`, 'error');
            }
        } catch (error) {
            capiAddResult('capiResultsDeduplication', `❌ Evento ${i + 1}: ${error.message}`, 'error');
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    const successfulEvents = results.filter(r => r.success).length;
    capiAddResult('capiResultsDeduplication', `📊 Eventos enviados: ${successfulEvents}/${results.length}`, 'info');
    
    capiHideLoading('capiLoadingDeduplication');
}

// Validação Completa
async function capiRunFullValidation() {
    capiShowLoading('capiLoadingValidation');
    const resultsContainer = document.getElementById('capiResultsValidation');
    resultsContainer.innerHTML = '';
    
    capiAddResult('capiResultsValidation', `🔍 Iniciando validação completa...`, 'info');
    
    // Reset estatísticas
    capiTestResults = { total: 0, success: 0, latency: [] };
    
    // Executar todos os testes
    await capiTestConnectivity();
    await capiTestCookie();
    await capiTestEndpoint();
    await capiTestPageView();
    await capiTestLead();
    await capiTestPurchase();
    await capiTestCustomEvent();
    
    // Resultado final
    const successRate = capiTestResults.total > 0 ? Math.round((capiTestResults.success / capiTestResults.total) * 100) : 0;
    const avgLatency = capiTestResults.latency.length > 0 ? 
        Math.round(capiTestResults.latency.reduce((a, b) => a + b, 0) / capiTestResults.latency.length) : 0;
    
    capiAddResult('capiResultsValidation', `📊 VALIDAÇÃO COMPLETA FINALIZADA`, 'info');
    capiAddResult('capiResultsValidation', `✅ Taxa de Sucesso: ${successRate}%`, successRate >= 80 ? 'success' : 'warning');
    capiAddResult('capiResultsValidation', `⚡ Latência Média: ${avgLatency}ms`, avgLatency < 1000 ? 'success' : 'warning');
    capiAddResult('capiResultsValidation', `🎯 Total de Testes: ${capiTestResults.total}`, 'info');
    
    if (successRate >= 90) {
        capiAddResult('capiResultsValidation', `🎉 SISTEMA PRONTO PARA PRODUÇÃO!`, 'success');
    } else if (successRate >= 70) {
        capiAddResult('capiResultsValidation', `⚠️ SISTEMA FUNCIONAL, MAS NECESSITA AJUSTES`, 'warning');
    } else {
        capiAddResult('capiResultsValidation', `❌ SISTEMA COM PROBLEMAS CRÍTICOS`, 'error');
    }
    
    capiHideLoading('capiLoadingValidation');
}

// Limpar resultados
function capiClearResults() {
    const resultContainers = document.querySelectorAll('.capi-results');
    resultContainers.forEach(container => {
        container.innerHTML = '';
    });
    
    capiTestResults = { total: 0, success: 0, latency: [] };
    capiUpdateStats();
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    capiUpdateStats();
    capiAddResult('capiResultsConnectivity', '🧪 Painel de Testes CAPI carregado com sucesso!', 'info');
});

// Fechar painel ao clicar fora
document.addEventListener('click', function(event) {
    const panel = document.getElementById('capiPanel');
    const toggle = document.querySelector('.capi-panel-toggle');
    
    if (panel.classList.contains('show') && 
        !panel.contains(event.target) && 
        !toggle.contains(event.target)) {
        panel.classList.remove('show');
    }
});
</script>

</body>
</html>
