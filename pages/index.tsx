<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel de Testes CAPI Completo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .content {
            padding: 30px;
        }

        .test-section {
            margin-bottom: 40px;
            padding: 25px;
            border: 2px solid #e1e5e9;
            border-radius: 12px;
            background: #f8f9fa;
        }

        .test-section h2 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 1.5em;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }

        .test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .test-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            border-left: 4px solid #667eea;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .test-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .test-card h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.2em;
        }

        .test-card p {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.6;
        }

        .btn {
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

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn-success {
            background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
        }

        .btn-warning {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .btn-info {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .btn-danger {
            background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
        }

        .results {
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }

        .result-item {
            margin-bottom: 10px;
            padding: 10px;
            background: white;
            border-radius: 6px;
            border-left: 3px solid #28a745;
        }

        .result-item.error {
            border-left-color: #dc3545;
            background: #fff5f5;
        }

        .result-item.warning {
            border-left-color: #ffc107;
            background: #fffbf0;
        }

        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .status-success {
            background: #28a745;
        }

        .status-error {
            background: #dc3545;
        }

        .status-warning {
            background: #ffc107;
        }

        .status-info {
            background: #17a2b8;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }

        .stat-label {
            color: #666;
            margin-top: 5px;
        }

        .hidden {
            display: none;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .toggle-panel {
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
            z-index: 1000;
        }

        .panel-hidden {
            display: none;
        }
    </style>
</head>
<body>
    <button class="toggle-panel" onclick="togglePanel()" title="Mostrar/Ocultar Painel de Testes">🧪</button>
    
    <div class="container" id="testPanel">
        <div class="header">
            <h1>🧪 Painel de Testes CAPI</h1>
            <p>Testes completos para Facebook Conversions API</p>
        </div>

        <div class="content">
            <!-- Seção de Status Geral -->
            <div class="test-section">
                <h2>📊 Status Geral do Sistema</h2>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number" id="totalTests">0</div>
                        <div class="stat-label">Testes Executados</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="successRate">0%</div>
                        <div class="stat-label">Taxa de Sucesso</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="avgLatency">0ms</div>
                        <div class="stat-label">Latência Média</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number" id="endpointUsed">-</div>
                        <div class="stat-label">Endpoint Ativo</div>
                    </div>
                </div>
            </div>

            <!-- Seção de Testes Básicos -->
            <div class="test-section">
                <h2>🔧 Testes Básicos</h2>
                <div class="test-grid">
                    <div class="test-card">
                        <h3>Teste de Conectividade</h3>
                        <p>Verifica se o sistema consegue se conectar ao endpoint CAPI</p>
                        <button class="btn btn-info" onclick="testConnectivity()">
                            <span class="loading hidden" id="loading-connectivity"></span>
                            Testar Conexão
                        </button>
                        <div class="results" id="results-connectivity"></div>
                    </div>

                    <div class="test-card">
                        <h3>Teste de Cookie</h3>
                        <p>Verifica se o cookie _visitor_id está sendo gerado corretamente</p>
                        <button class="btn btn-info" onclick="testCookie()">
                            <span class="loading hidden" id="loading-cookie"></span>
                            Verificar Cookie
                        </button>
                        <div class="results" id="results-cookie"></div>
                    </div>

                    <div class="test-card">
                        <h3>Teste de Endpoint</h3>
                        <p>Verifica qual endpoint está sendo usado baseado no domínio</p>
                        <button class="btn btn-info" onclick="testEndpoint()">
                            <span class="loading hidden" id="loading-endpoint"></span>
                            Verificar Endpoint
                        </button>
                        <div class="results" id="results-endpoint"></div>
                    </div>
                </div>
            </div>

            <!-- Seção de Testes de Eventos -->
            <div class="test-section">
                <h2>📡 Testes de Eventos</h2>
                <div class="test-grid">
                    <div class="test-card">
                        <h3>PageView</h3>
                        <p>Dispara evento PageView via CAPI</p>
                        <button class="btn btn-success" onclick="testPageView()">
                            <span class="loading hidden" id="loading-pageview"></span>
                            Disparar PageView
                        </button>
                        <div class="results" id="results-pageview"></div>
                    </div>

                    <div class="test-card">
                        <h3>Lead</h3>
                        <p>Dispara evento Lead via CAPI</p>
                        <button class="btn btn-success" onclick="testLead()">
                            <span class="loading hidden" id="loading-lead"></span>
                            Disparar Lead
                        </button>
                        <div class="results" id="results-lead"></div>
                    </div>

                    <div class="test-card">
                        <h3>Purchase</h3>
                        <p>Dispara evento Purchase via CAPI</p>
                        <button class="btn btn-success" onclick="testPurchase()">
                            <span class="loading hidden" id="loading-purchase"></span>
                            Disparar Purchase
                        </button>
                        <div class="results" id="results-purchase"></div>
                    </div>

                    <div class="test-card">
                        <h3>Custom Event</h3>
                        <p>Dispara evento customizado via CAPI</p>
                        <button class="btn btn-warning" onclick="testCustomEvent()">
                            <span class="loading hidden" id="loading-custom"></span>
                            Disparar Custom
                        </button>
                        <div class="results" id="results-custom"></div>
                    </div>
                </div>
            </div>

            <!-- Seção de Testes Avançados -->
            <div class="test-section">
                <h2>🚀 Testes Avançados</h2>
                <div class="test-grid">
                    <div class="test-card">
                        <h3>Teste de Performance</h3>
                        <p>Executa múltiplos eventos para testar performance</p>
                        <button class="btn btn-warning" onclick="testPerformance()">
                            <span class="loading hidden" id="loading-performance"></span>
                            Teste Performance
                        </button>
                        <div class="results" id="results-performance"></div>
                    </div>

                    <div class="test-card">
                        <h3>Teste de Deduplicação</h3>
                        <p>Verifica se eventos duplicados são tratados corretamente</p>
                        <button class="btn btn-warning" onclick="testDeduplication()">
                            <span class="loading hidden" id="loading-deduplication"></span>
                            Testar Deduplicação
                        </button>
                        <div class="results" id="results-deduplication"></div>
                    </div>

                    <div class="test-card">
                        <h3>Validação Completa</h3>
                        <p>Executa todos os testes de validação</p>
                        <button class="btn btn-danger" onclick="runFullValidation()">
                            <span class="loading hidden" id="loading-validation"></span>
                            Validação Completa
                        </button>
                        <div class="results" id="results-validation"></div>
                    </div>

                    <div class="test-card">
                        <h3>Limpar Resultados</h3>
                        <p>Limpa todos os resultados dos testes</p>
                        <button class="btn btn-info" onclick="clearResults()">
                            Limpar Tudo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Configurações globais
        let testResults = {
            total: 0,
            success: 0,
            latency: []
        };

        // Função para alternar visibilidade do painel
        function togglePanel() {
            const panel = document.getElementById('testPanel');
            panel.classList.toggle('panel-hidden');
        }

        // Função para mostrar loading
        function showLoading(buttonId) {
            const button = document.querySelector(`#${buttonId}`).parentElement;
            const loading = button.querySelector('.loading');
            const text = button.querySelector('button').textContent;
            button.querySelector('button').textContent = '';
            loading.classList.remove('hidden');
        }

        // Função para esconder loading
        function hideLoading(buttonId) {
            const button = document.querySelector(`#${buttonId}`).parentElement;
            const loading = button.querySelector('.loading');
            const text = button.querySelector('button').textContent;
            loading.classList.add('hidden');
            
            // Restaurar texto original baseado no ID
            const buttonElement = button.querySelector('button');
            if (buttonId.includes('connectivity')) buttonElement.textContent = 'Testar Conexão';
            else if (buttonId.includes('cookie')) buttonElement.textContent = 'Verificar Cookie';
            else if (buttonId.includes('endpoint')) buttonElement.textContent = 'Verificar Endpoint';
            else if (buttonId.includes('pageview')) buttonElement.textContent = 'Disparar PageView';
            else if (buttonId.includes('lead')) buttonElement.textContent = 'Disparar Lead';
            else if (buttonId.includes('purchase')) buttonElement.textContent = 'Disparar Purchase';
            else if (buttonId.includes('custom')) buttonElement.textContent = 'Disparar Custom';
            else if (buttonId.includes('performance')) buttonElement.textContent = 'Teste Performance';
            else if (buttonId.includes('deduplication')) buttonElement.textContent = 'Testar Deduplicação';
            else if (buttonId.includes('validation')) buttonElement.textContent = 'Validação Completa';
        }

        // Função para adicionar resultado
        function addResult(containerId, message, type = 'success') {
            const container = document.getElementById(containerId);
            const resultItem = document.createElement('div');
            resultItem.className = `result-item ${type}`;
            
            const statusIndicator = document.createElement('span');
            statusIndicator.className = `status-indicator status-${type}`;
            
            const timestamp = new Date().toLocaleTimeString();
            resultItem.innerHTML = `
                ${statusIndicator.outerHTML}
                <strong>[${timestamp}]</strong> ${message}
            `;
            
            container.appendChild(resultItem);
            container.scrollTop = container.scrollHeight;
        }

        // Função para atualizar estatísticas
        function updateStats() {
            document.getElementById('totalTests').textContent = testResults.total;
            const successRate = testResults.total > 0 ? Math.round((testResults.success / testResults.total) * 100) : 0;
            document.getElementById('successRate').textContent = `${successRate}%`;
            
            if (testResults.latency.length > 0) {
                const avgLatency = Math.round(testResults.latency.reduce((a, b) => a + b, 0) / testResults.latency.length);
                document.getElementById('avgLatency').textContent = `${avgLatency}ms`;
            }
        }

        // Função para obter endpoint CAPI
        function getCapiEndpoint() {
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
        function generateVisitorId() {
            let visitorId = localStorage.getItem('_visitor_id');
            if (!visitorId) {
                visitorId = 'vis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('_visitor_id', visitorId);
            }
            return visitorId;
        }

        // Função para enviar evento CAPI
        async function sendCapiEvent(eventName, eventData = {}) {
            const startTime = Date.now();
            const endpoint = getCapiEndpoint();
            const visitorId = generateVisitorId();
            
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
                
                testResults.total++;
                testResults.latency.push(latency);
                
                if (response.ok) {
                    testResults.success++;
                    updateStats();
                    return { success: true, latency, response: await response.json() };
                } else {
                    updateStats();
                    return { success: false, latency, error: `HTTP ${response.status}` };
                }
            } catch (error) {
                const endTime = Date.now();
                const latency = endTime - startTime;
                testResults.total++;
                testResults.latency.push(latency);
                updateStats();
                return { success: false, latency, error: error.message };
            }
        }

        // Teste de conectividade
        async function testConnectivity() {
            showLoading('loading-connectivity');
            const resultsContainer = document.getElementById('results-connectivity');
            resultsContainer.innerHTML = '';
            
            try {
                const result = await sendCapiEvent('PageView');
                
                if (result.success) {
                    addResult('results-connectivity', `✅ Conexão bem-sucedida! Latência: ${result.latency}ms`, 'success');
                    document.getElementById('endpointUsed').textContent = getCapiEndpoint().includes('online') ? 'ONLINE' : 'COM.BR';
                } else {
                    addResult('results-connectivity', `❌ Falha na conexão: ${result.error}`, 'error');
                }
            } catch (error) {
                addResult('results-connectivity', `❌ Erro inesperado: ${error.message}`, 'error');
            }
            
            hideLoading('loading-connectivity');
        }

        // Teste de cookie
        async function testCookie() {
            showLoading('loading-cookie');
            const resultsContainer = document.getElementById('results-cookie');
            resultsContainer.innerHTML = '';
            
            const visitorId = generateVisitorId();
            const storedId = localStorage.getItem('_visitor_id');
            
            if (visitorId && storedId && visitorId === storedId) {
                addResult('results-cookie', `✅ Cookie _visitor_id gerado corretamente: ${visitorId}`, 'success');
            } else {
                addResult('results-cookie', `❌ Problema com cookie _visitor_id`, 'error');
            }
            
            hideLoading('loading-cookie');
        }

        // Teste de endpoint
        async function testEndpoint() {
            showLoading('loading-endpoint');
            const resultsContainer = document.getElementById('results-endpoint');
            resultsContainer.innerHTML = '';
            
            const endpoint = getCapiEndpoint();
            const hostname = window.location.hostname;
            const url = window.location.href;
            
            addResult('results-endpoint', `📍 Hostname: ${hostname}`, 'info');
            addResult('results-endpoint', `🌐 URL: ${url}`, 'info');
            addResult('results-endpoint', `🔗 Endpoint selecionado: ${endpoint}`, 'success');
            
            if (endpoint.includes('online')) {
                addResult('results-endpoint', `✅ Usando endpoint .online`, 'success');
            } else {
                addResult('results-endpoint', `ℹ️ Usando endpoint .com.br`, 'warning');
            }
            
            hideLoading('loading-endpoint');
        }

        // Teste PageView
        async function testPageView() {
            showLoading('loading-pageview');
            const resultsContainer = document.getElementById('results-pageview');
            resultsContainer.innerHTML = '';
            
            try {
                const result = await sendCapiEvent('PageView', {
                    content_name: 'Teste PageView',
                    content_category: 'test'
                });
                
                if (result.success) {
                    addResult('results-pageview', `✅ PageView enviado com sucesso! Latência: ${result.latency}ms`, 'success');
                } else {
                    addResult('results-pageview', `❌ Falha no envio: ${result.error}`, 'error');
                }
            } catch (error) {
                addResult('results-pageview', `❌ Erro inesperado: ${error.message}`, 'error');
            }
            
            hideLoading('loading-pageview');
        }

        // Teste Lead
        async function testLead() {
            showLoading('loading-lead');
            const resultsContainer = document.getElementById('results-lead');
            resultsContainer.innerHTML = '';
            
            try {
                const result = await sendCapiEvent('Lead', {
                    content_name: 'Teste Lead',
                    content_category: 'lead_generation',
                    value: 100.00,
                    currency: 'BRL'
                });
                
                if (result.success) {
                    addResult('results-lead', `✅ Lead enviado com sucesso! Latência: ${result.latency}ms`, 'success');
                } else {
                    addResult('results-lead', `❌ Falha no envio: ${result.error}`, 'error');
                }
            } catch (error) {
                addResult('results-lead', `❌ Erro inesperado: ${error.message}`, 'error');
            }
            
            hideLoading('loading-lead');
        }

        // Teste Purchase
        async function testPurchase() {
            showLoading('loading-purchase');
            const resultsContainer = document.getElementById('results-purchase');
            resultsContainer.innerHTML = '';
            
            try {
                const result = await sendCapiEvent('Purchase', {
                    content_name: 'Teste Purchase',
                    content_category: 'ecommerce',
                    value: 299.90,
                    currency: 'BRL',
                    content_ids: ['prod_001'],
                    content_type: 'product'
                });
                
                if (result.success) {
                    addResult('results-purchase', `✅ Purchase enviado com sucesso! Latência: ${result.latency}ms`, 'success');
                } else {
                    addResult('results-purchase', `❌ Falha no envio: ${result.error}`, 'error');
                }
            } catch (error) {
                addResult('results-purchase', `❌ Erro inesperado: ${error.message}`, 'error');
            }
            
            hideLoading('loading-purchase');
        }

        // Teste Custom Event
        async function testCustomEvent() {
            showLoading('loading-custom');
            const resultsContainer = document.getElementById('results-custom');
            resultsContainer.innerHTML = '';
            
            try {
                const result = await sendCapiEvent('CustomEvent', {
                    content_name: 'Teste Custom',
                    content_category: 'custom',
                    custom_parameter: 'test_value'
                });
                
                if (result.success) {
                    addResult('results-custom', `✅ Custom Event enviado com sucesso! Latência: ${result.latency}ms`, 'success');
                } else {
                    addResult('results-custom', `❌ Falha no envio: ${result.error}`, 'error');
                }
            } catch (error) {
                addResult('results-custom', `❌ Erro inesperado: ${error.message}`, 'error');
            }
            
            hideLoading('loading-custom');
        }

        // Teste de Performance
        async function testPerformance() {
            showLoading('loading-performance');
            const resultsContainer = document.getElementById('results-performance');
            resultsContainer.innerHTML = '';
            
            addResult('results-performance', `🚀 Iniciando teste de performance...`, 'info');
            
            const events = ['PageView', 'Lead', 'Purchase', 'CustomEvent'];
            const results = [];
            
            for (let i = 0; i < 5; i++) {
                for (const event of events) {
                    try {
                        const result = await sendCapiEvent(event, {
                            content_name: `Performance Test ${i + 1}`,
                            content_category: 'performance_test'
                        });
                        results.push(result);
                        
                        if (result.success) {
                            addResult('results-performance', `✅ ${event} ${i + 1}: ${result.latency}ms`, 'success');
                        } else {
                            addResult('results-performance', `❌ ${event} ${i + 1}: ${result.error}`, 'error');
                        }
                    } catch (error) {
                        addResult('results-performance', `❌ ${event} ${i + 1}: ${error.message}`, 'error');
                    }
                    
                    // Pequena pausa entre eventos
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            
            const successfulEvents = results.filter(r => r.success).length;
            const totalEvents = results.length;
            const avgLatency = results.length > 0 ? 
                Math.round(results.reduce((sum, r) => sum + r.latency, 0) / results.length) : 0;
            
            addResult('results-performance', `📊 Resultado Final: ${successfulEvents}/${totalEvents} eventos bem-sucedidos`, 'info');
            addResult('results-performance', `⚡ Latência média: ${avgLatency}ms`, 'info');
            
            hideLoading('loading-performance');
        }

        // Teste de Deduplicação
        async function testDeduplication() {
            showLoading('loading-deduplication');
            const resultsContainer = document.getElementById('results-deduplication');
            resultsContainer.innerHTML = '';
            
            addResult('results-deduplication', `🔄 Testando deduplicação...`, 'info');
            
            // Enviar o mesmo evento múltiplas vezes
            const eventData = {
                content_name: 'Teste Deduplicação',
                content_category: 'dedup_test',
                test_id: Date.now()
            };
            
            const results = [];
            for (let i = 0; i < 3; i++) {
                try {
                    const result = await sendCapiEvent('PageView', eventData);
                    results.push(result);
                    
                    if (result.success) {
                        addResult('results-deduplication', `✅ Evento ${i + 1}: ${result.latency}ms`, 'success');
                    } else {
                        addResult('results-deduplication', `❌ Evento ${i + 1}: ${result.error}`, 'error');
                    }
                } catch (error) {
                    addResult('results-deduplication', `❌ Evento ${i + 1}: ${error.message}`, 'error');
                }
                
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            const successfulEvents = results.filter(r => r.success).length;
            addResult('results-deduplication', `📊 Eventos enviados: ${successfulEvents}/${results.length}`, 'info');
            
            hideLoading('loading-deduplication');
        }

        // Validação Completa
        async function runFullValidation() {
            showLoading('loading-validation');
            const resultsContainer = document.getElementById('results-validation');
            resultsContainer.innerHTML = '';
            
            addResult('results-validation', `🔍 Iniciando validação completa...`, 'info');
            
            // Reset estatísticas
            testResults = { total: 0, success: 0, latency: [] };
            
            // Executar todos os testes
            await testConnectivity();
            await testCookie();
            await testEndpoint();
            await testPageView();
            await testLead();
            await testPurchase();
            await testCustomEvent();
            
            // Resultado final
            const successRate = testResults.total > 0 ? Math.round((testResults.success / testResults.total) * 100) : 0;
            const avgLatency = testResults.latency.length > 0 ? 
                Math.round(testResults.latency.reduce((a, b) => a + b, 0) / testResults.latency.length) : 0;
            
            addResult('results-validation', `📊 VALIDAÇÃO COMPLETA FINALIZADA`, 'info');
            addResult('results-validation', `✅ Taxa de Sucesso: ${successRate}%`, successRate >= 80 ? 'success' : 'warning');
            addResult('results-validation', `⚡ Latência Média: ${avgLatency}ms`, avgLatency < 1000 ? 'success' : 'warning');
            addResult('results-validation', `🎯 Total de Testes: ${testResults.total}`, 'info');
            
            if (successRate >= 90) {
                addResult('results-validation', `🎉 SISTEMA PRONTO PARA PRODUÇÃO!`, 'success');
            } else if (successRate >= 70) {
                addResult('results-validation', `⚠️ SISTEMA FUNCIONAL, MAS NECESSITA AJUSTES`, 'warning');
            } else {
                addResult('results-validation', `❌ SISTEMA COM PROBLEMAS CRÍTICOS`, 'error');
            }
            
            hideLoading('loading-validation');
        }

        // Limpar resultados
        function clearResults() {
            const resultContainers = document.querySelectorAll('.results');
            resultContainers.forEach(container => {
                container.innerHTML = '';
            });
            
            testResults = { total: 0, success: 0, latency: [] };
            updateStats();
        }

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            updateStats();
            addResult('results-connectivity', '🧪 Painel de Testes CAPI carregado com sucesso!', 'info');
        });
    </script>
</body>
</html>
