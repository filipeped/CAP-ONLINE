<!-- �� PAINEL DE TESTES CAPI - COMPATÍVEL COM VERCEL -->
<!-- COLE ESTE CÓDIGO NO FINAL DO SEU INDEX.HTML, ANTES DO </body> -->

<style>
  /* 🎨 ESTILOS DO PAINEL CAPI */
  .capi-panel-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    font-size: 1.5em;
    transition: all 0.3s ease;
  }

  .capi-panel-toggle:hover {
    transform: scale(1.1);
  }

  .capi-panel-container {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 500px;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: -5px 0 15px rgba(0,0,0,0.1);
    transition: right 0.3s ease;
    overflow-y: auto;
    z-index: 9999;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .capi-panel-container.open {
    right: 0;
  }

  .capi-panel-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    text-align: center;
    position: relative;
  }

  .capi-panel-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: white;
    font-size: 1.5em;
    cursor: pointer;
  }

  .capi-status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    padding: 20px;
  }

  .capi-status-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    text-align: center;
    border-left: 4px solid #667eea;
  }

  .capi-status-value {
    font-size: 1.8em;
    font-weight: 700;
    margin-bottom: 8px;
    color: #667eea;
  }

  .capi-status-label {
    font-size: 1em;
    color: #666;
    margin-bottom: 5px;
  }

  .capi-status-badge {
    font-size: 0.8em;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 10px;
    display: inline-block;
  }

  .capi-status-excellent {
    background: #d4edda;
    color: #155724;
  }

  .capi-status-good {
    background: #fff3cd;
    color: #856404;
  }

  .capi-status-poor {
    background: #f8d7da;
    color: #721c24;
  }

  .capi-controls {
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    text-align: center;
  }

  .capi-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 0.9em;
    cursor: pointer;
    margin: 5px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  .capi-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  }

  .capi-btn.quick {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  }

  .capi-btn.full {
    background: linear-gradient(135deg, #17a2b8 0%, #20c997 100%);
  }

  .capi-btn.performance {
    background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
  }

  .capi-btn.routing {
    background: linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%);
  }

  .capi-btn.clear {
    background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
  }

  .capi-test-results {
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    display: none;
  }

  .capi-test-item {
    display: flex;
    align-items: flex-start;
    padding: 12px;
    margin: 8px 0;
    border-radius: 8px;
    background: #f8f9fa;
    border-left: 3px solid #dee2e6;
  }

  .capi-test-item.success {
    border-left-color: #28a745;
    background: #d4edda;
  }

  .capi-test-item.warning {
    border-left-color: #ffc107;
    background: #fff3cd;
  }

  .capi-test-item.error {
    border-left-color: #dc3545;
    background: #f8d7da;
  }

  .capi-test-icon {
    font-size: 1.2em;
    margin-right: 12px;
    min-width: 25px;
  }

  .capi-test-content {
    flex: 1;
  }

  .capi-test-title {
    font-weight: 600;
    margin-bottom: 3px;
    color: #333;
    font-size: 0.9em;
  }

  .capi-test-message {
    color: #666;
    font-size: 0.8em;
    margin-bottom: 3px;
  }

  .capi-test-timestamp {
    color: #999;
    font-size: 0.7em;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .capi-panel-container {
      width: 100%;
      max-width: 100%;
    }
    
    .capi-status-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<!-- 🎯 BOTÃO DO PAINEL -->
<button class="capi-panel-toggle" onclick="toggleCapiPanel()">🎯</button>

<!-- 📋 CONTAINER DO PAINEL -->
<div class="capi-panel-container" id="capiPanelContainer">
  <div class="capi-panel-header">
    <button class="capi-panel-close" onclick="toggleCapiPanel()">×</button>
    <h2>�� Painel de Testes CAPI</h2>
    <p>Testes rápidos e completos da implementação CAPI</p>
  </div>

  <div class="capi-status-grid">
    <div class="capi-status-card">
      <div class="capi-status-value" id="capiStatusValue">--</div>
      <div class="capi-status-label">Status CAPI</div>
      <div class="capi-status-badge" id="capiStatusBadge">Aguardando...</div>
    </div>

    <div class="capi-status-card">
      <div class="capi-status-value" id="capiLatencyValue">--</div>
      <div class="capi-status-label">Latência</div>
      <div class="capi-status-badge" id="capiLatencyBadge">Aguardando...</div>
    </div>

    <div class="capi-status-card">
      <div class="capi-status-value" id="capiSuccessValue">--</div>
      <div class="capi-status-label">Taxa Sucesso</div>
      <div class="capi-status-badge" id="capiSuccessBadge">Aguardando...</div>
    </div>

    <div class="capi-status-card">
      <div class="capi-status-value" id="capiEndpointValue">--</div>
      <div class="capi-status-label">Endpoint</div>
      <div class="capi-status-badge" id="capiEndpointBadge">Aguardando...</div>
    </div>
  </div>

  <div class="capi-controls">
    <button class="capi-btn quick" onclick="capiQuickTest()">⚡ Teste Rápido</button>
    <button class="capi-btn full" onclick="capiFullTest()">🔍 Teste Completo</button>
    <button class="capi-btn performance" onclick="capiPerformanceTest()">📊 Performance</button>
    <button class="capi-btn routing" onclick="capiRoutingTest()">�� Roteamento</button>
    <button class="capi-btn clear" onclick="capiClearResults()">��️ Limpar</button>
  </div>

  <div class="capi-test-results" id="capiTestResults">
    <h3>📋 Resultados dos Testes</h3>
    <div id="capiResults"></div>
  </div>
</div>

<script>
// 🚀 FUNÇÕES CAPI COMPATÍVEIS COM VERCEL
function getVisitorId() {
  let visitorId = document.cookie
    .split('; ')
    .find(row => row.startsWith('_visitor_id='));
  
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
    document.cookie = `_visitor_id=${visitorId}; path=/; max-age=${60 * 60 * 24 * 730}; SameSite=Lax`;
  } else {
    visitorId = visitorId.split('=')[1];
  }
  
  return visitorId;
}

function getCapiEndpoint() {
  if (window.location.hostname.includes('online')) {
    return 'https://cap.digitalpaisagismo.online/api/events';
  }
  return 'https://cap.digitalpaisagismo.com.br/api/events';
}

async function sendCapiEvent(eventName, customData = {}, userData = {}) {
  const endpoint = getCapiEndpoint();
  const externalId = getVisitorId();
  
  const payload = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      action_source: 'website',
      user_data: {
        external_id: externalId,
        ...userData
      },
      custom_data: customData
    }]
  };

  const startTime = performance.now();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const endTime = performance.now();
    const latency = endTime - startTime;

    if (response.ok) {
      return { 
        success: true, 
        endpoint: endpoint, 
        latency: latency,
        status: response.status
      };
    } else {
      return { 
        success: false, 
        error: `HTTP ${response.status}`, 
        latency: latency,
        status: response.status
      };
    }
  } catch (error) {
    const endTime = performance.now();
    return { 
      success: false, 
      error: error.message, 
      latency: endTime - startTime
    };
  }
}

// �� FUNÇÕES DO PAINEL
function getTimestamp() {
  return new Date().toLocaleTimeString('pt-BR');
}

function updateCapiStatus(id, value, status, statusClass) {
  document.getElementById(id).textContent = value;
  const badgeElement = document.getElementById(id.replace('Value', 'Badge'));
  badgeElement.textContent = status;
  badgeElement.className = `capi-status-badge ${statusClass}`;
}

function showCapiResult(title, result) {
  const testResults = document.getElementById('capiTestResults');
  const results = document.getElementById('capiResults');
  
  const resultClass = result.success ? 'success' : result.error ? 'error' : 'warning';
  const icon = result.success ? '✅' : result.error ? '❌' : '⚠️';
  
  const html = `
    <div class="capi-test-item ${resultClass}">
      <div class="capi-test-icon">${icon}</div>
      <div class="capi-test-content">
        <div class="capi-test-title">${title}</div>
        <div class="capi-test-message">${result.message}</div>
        <div class="capi-test-timestamp">⏰ ${result.timestamp}</div>
      </div>
    </div>
  `;
  
  results.innerHTML += html;
  testResults.style.display = 'block';
}

// ⚡ TESTES CAPI
async function capiQuickTest() {
  const timestamp = getTimestamp();
  
  try {
    const result = await sendCapiEvent('QuickTest', { 
      quick_test: true,
      timestamp: timestamp
    }, { 
      fn: 'Quick', 
      ln: 'Test' 
    });

    const finalResult = {
      success: result.success,
      message: result.success ? 
        `Status: ${result.status} | Endpoint: ${result.endpoint} | Latência: ${Math.round(result.latency)}ms` : 
        `Erro: ${result.error}`,
      timestamp: timestamp
    };

    updateCapiStatus('capiStatusValue', result.success ? '✅ OK' : '❌ ERRO', 
      result.success ? 'Funcionando' : 'Falhou', 
      result.success ? 'capi-status-excellent' : 'capi-status-poor');
    
    updateCapiStatus('capiLatencyValue', `${Math.round(result.latency)}ms`,
      result.latency < 500 ? 'Excelente' : result.latency < 1000 ? 'Bom' : 'Ruim',
      result.latency < 500 ? 'capi-status-excellent' : result.latency < 1000 ? 'capi-status-good' : 'capi-status-poor');

    showCapiResult('⚡ TESTE RÁPIDO', finalResult);
    return finalResult;
  } catch (e) {
    const result = {
      success: false,
      message: `Erro: ${e.message}`,
      timestamp: timestamp
    };
    
    updateCapiStatus('capiStatusValue', '❌ ERRO', 'Falhou', 'capi-status-poor');
    showCapiResult('⚡ TESTE RÁPIDO', result);
    return result;
  }
}

async function capiFullTest() {
  const timestamp = getTimestamp();
  const tests = [];
  
  // Teste 1: Cookie
  const visitorId = getVisitorId();
  tests.push({
    name: 'Sistema de Cookies',
    success: !!visitorId,
    message: visitorId ? `Cookie criado: ${visitorId}` : 'Cookie não encontrado'
  });

  // Teste 2: Endpoint
  const endpoint = getCapiEndpoint();
  const isCorrectEndpoint = endpoint.includes('cap.digitalpaisagismo');
  tests.push({
    name: 'Detecção de Endpoint',
    success: isCorrectEndpoint,
    message: `Endpoint: ${endpoint}`
  });

  // Teste 3: Envio de evento
  const eventResult = await sendCapiEvent('FullTest', { 
    full_test: true,
    timestamp: timestamp
  }, { 
    fn: 'Full', 
    ln: 'Test' 
  });

  tests.push({
    name: 'Envio de Evento',
    success: eventResult.success,
    message: eventResult.success ? 
      `Status: ${eventResult.status} | Latência: ${Math.round(eventResult.latency)}ms` : 
      `Erro: ${eventResult.error}`
  });

  // Teste 4: Pixel removido
  const pixelRemoved = typeof window.fbq === 'undefined';
  tests.push({
    name: 'Facebook Pixel Removido',
    success: pixelRemoved,
    message: pixelRemoved ? 'Pixel removido' : 'Pixel ainda presente'
  });

  const passed = tests.filter(t => t.success).length;
  const total = tests.length;
  const successRate = (passed / total) * 100;

  updateCapiStatus('capiSuccessValue', `${Math.round(successRate)}%`,
    successRate > 95 ? 'Excelente' : successRate > 80 ? 'Bom' : 'Ruim',
    successRate > 95 ? 'capi-status-excellent' : successRate > 80 ? 'capi-status-good' : 'capi-status-poor');

  updateCapiStatus('capiEndpointValue', endpoint.includes('online') ? '.online' : '.com.br',
    'Configurado', 'capi-status-excellent');

  const result = {
    success: successRate > 80,
    message: `Testes: ${total} | Passados: ${passed} | Taxa: ${Math.round(successRate)}%`,
    timestamp: timestamp
  };

  showCapiResult('🔍 TESTE COMPLETO', result);
  return result;
}

async function capiPerformanceTest() {
  const timestamp = getTimestamp();
  const results = [];
  const totalTests = 5;
  
  for (let i = 0; i < totalTests; i++) {
    const result = await sendCapiEvent('PerformanceTest', { 
      test_number: i + 1,
      performance_test: true 
    }, { 
      fn: 'Performance', 
      ln: 'Test' 
    });
    results.push(result);
  }

  const successful = results.filter(r => r.success).length;
  const avgLatency = results.reduce((sum, r) => sum + r.latency, 0) / results.length;
  const successRate = (successful / totalTests) * 100;

  const result = {
    success: successRate > 80,
    message: `Testes: ${totalTests} | Sucessos: ${successful} | Latência média: ${Math.round(avgLatency)}ms | Taxa: ${Math.round(successRate)}%`,
    timestamp: timestamp
  };

  showCapiResult('📊 TESTE PERFORMANCE', result);
  return result;
}

async function capiRoutingTest() {
  const timestamp = getTimestamp();
  const hostname = window.location.hostname;
  const endpoint = getCapiEndpoint();
  
  const isCorrect = endpoint.includes('cap.digitalpaisagismo');
  const isOnline = endpoint.includes('online');
  const isCombr = endpoint.includes('com.br');

  const result = {
    success: isCorrect,
    message: `Hostname: ${hostname} | Endpoint: ${endpoint} | Tipo: ${isOnline ? '.online' : isCombr ? '.com.br' : 'desconhecido'}`,
    timestamp: timestamp
  };

  showCapiResult('�� TESTE ROTEAMENTO', result);
  return result;
}

function capiClearResults() {
  document.getElementById('capiTestResults').style.display = 'none';
  document.getElementById('capiResults').innerHTML = '';
  
  updateCapiStatus('capiStatusValue', '--', 'Aguardando...', '');
  updateCapiStatus('capiLatencyValue', '--', 'Aguardando...', '');
  updateCapiStatus('capiSuccessValue', '--', 'Aguardando...', '');
  updateCapiStatus('capiEndpointValue', '--', 'Aguardando...', '');
}

function toggleCapiPanel() {
  const panel = document.getElementById('capiPanelContainer');
  panel.classList.toggle('open');
}

// 🚀 INICIALIZAÇÃO E EXPOSIÇÃO GLOBAL
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se CAPI está disponível
  if (typeof window.sendCapiEvent === 'function') {
    updateCapiStatus('capiStatusValue', '✅ OK', 'Disponível', 'capi-status-excellent');
  } else {
    updateCapiStatus('capiStatusValue', '❌ N/A', 'Não disponível', 'capi-status-poor');
  }

  // Detectar endpoint
  const endpoint = getCapiEndpoint();
  updateCapiStatus('capiEndpointValue', endpoint.includes('online') ? '.online' : '.com.br', 'Detectado', 'capi-status-excellent');
});

// ✅ EXPOSIÇÃO GLOBAL DAS FUNÇÕES CAPI
window.getVisitorId = getVisitorId;
window.getCapiEndpoint = getCapiEndpoint;
window.sendCapiEvent = sendCapiEvent;

// ✅ EXPOSIÇÃO GLOBAL DO PAINEL
window.CAPITestPanel = {
  quickTest: capiQuickTest,
  fullTest: capiFullTest,
  performanceTest: capiPerformanceTest,
  routingTest: capiRoutingTest,
  clearResults: capiClearResults,
  togglePanel: toggleCapiPanel
};

// ✅ FUNÇÃO PARA TESTE DIRETO VIA CONSOLE
window.testCapi = function() {
  console.log('🎯 Iniciando teste CAPI...');
  capiQuickTest().then(result => {
    console.log('✅ Resultado do teste:', result);
  });
};
</script>
