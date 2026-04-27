(function () {
  /* ================================================================
   *  REFINED NETWORK JOURNEY – Protocol Stack + CMD Terminals
   *  - Client/server small CMD screens show OSI-layer processing
   *  - Bit-stream travel along the network topology
   *  - Reverse processing when response comes back
   *  - No host zoom, just readable terminals
   * ================================================================ */
  
  // ─── Stage constants (explicit, easy to follow) ───
  const STAGE_IDLE         = 0;
  const STAGE_APP          = 1;   // Application layer (client terminal)
  const STAGE_SESSION      = 2;
  const STAGE_TRANSPORT    = 3;
  const STAGE_NETWORK      = 4;
  const STAGE_LINK_PHY     = 5;   // Physical layer and start travel
  const STAGE_ROUTER       = 6;
  const STAGE_SATELLITE    = 7;
  const STAGE_HOST_RECV    = 8;   // Host receives + processes layers
  const STAGE_HOST_FILES   = 9;   // Host prepares files
  const STAGE_RESP_SEND    = 10;  // Response travels back
  const STAGE_CLIENT_RECV  = 11;  // Client reverse processing
  const STAGE_DONE         = 12;

  // ─── Node positions (normalised 0‑1) ───
  const NODES = {
    client:    { x: 0.10, y: 0.70, label: '👤 YOUR DEVICE' },
    router:    { x: 0.30, y: 0.60, label: '📡 EDGE ROUTER'   },
    satellite: { x: 0.55, y: 0.25, label: '🛰️ SAT-LINK'      },
    host:      { x: 0.85, y: 0.55, label: '💻 HOST SERVER'   }
  };

  // ─── Canvas & DOM refs ───
  let canvas, ctx, width, height;
  let statusDiv, heroOverlay, portfolioDiv, resetBtn;

  // ─── Animation state ───
  let stage            = STAGE_IDLE;
  let packetPos        = { x: NODES.client.x, y: NODES.client.y };
  let travelTarget     = null;      // destination node
  let travelStartTime  = 0;
  let travelDuration   = 0;
  let travelCallback   = null;
  let stageTimeout     = null;      // for delayed stage transitions
  let tickId           = null;

  // ─── Terminal windows (arrays of lines) ───
  let clientLog = [];
  let serverLog = [];

  // ─── Bit‑stream effect helpers ───
  let streamActive = false;        // true when travel should show 0/1 along the link
  let streamRoute = [];            // nodes forming current link

  // ─── Output files ───
  const RESPONSE_FILES = ['index.html', 'style.css', 'bundle.js'];

  // ==================================================================
  //  INITIALISATION
  // ==================================================================
  function initDOM () {
    canvas       = document.getElementById('packetCanvas');
    statusDiv    = document.getElementById('statusMsg');
    heroOverlay  = document.getElementById('heroOverlay');
    portfolioDiv = document.getElementById('portfolioRoot');
    resetBtn     = document.getElementById('resetBtn');
    if (!canvas) { console.error('Canvas #packetCanvas not found'); return false; }
    ctx = canvas.getContext('2d');
    return true;
  }

  // Responsive canvas sizing
  function resizeCanvas () {
    if (!canvas) return;
    const container = canvas.parentElement;
    const maxW  = Math.min(1000, container.clientWidth * 0.9);
    const ratio = 0.5;
    width  = maxW;
    height = maxW * ratio;
    canvas.width  = width;
    canvas.height = height;
  }

  // ==================================================================
  //  DRAWING HELPERS
  // ==================================================================
  function drawBackground () {
    ctx.clearRect(0, 0, width, height);
    // Grid
    ctx.strokeStyle = '#0f2c3a';
    ctx.lineWidth   = 0.6;
    for (let i = 0; i < width; i += 45) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
    }
  }

  function drawLinks () {
    const pairs = [
      [NODES.client, NODES.router],
      [NODES.router, NODES.satellite],
      [NODES.satellite, NODES.host]
    ];
    ctx.setLineDash([8, 10]);
    ctx.strokeStyle = '#2f8faa';
    ctx.lineWidth   = 1.5;
    pairs.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(a.x * width, a.y * height);
      ctx.lineTo(b.x * width, b.y * height);
      ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  function drawNodes () {
    for (const node of Object.values(NODES)) {
      const x = node.x * width, y = node.y * height;
      ctx.font = '28px monospace';
      ctx.fillStyle = '#caf2ff';
      ctx.shadowBlur = 6;
      let icon = '🖥️';
      if (node.label.includes('ROUTER')) icon = '📡';
      else if (node.label.includes('SAT')) icon = '🛰️';
      else if (node.label.includes('HOST')) icon = '💻';
      ctx.fillText(icon, x - 20, y + 10);
      ctx.font = '11px "Fira Code"';
      ctx.fillStyle = '#aad4ff';
      ctx.fillText(node.label.replace(/[^\w ]/g, ''), x - 25, y - 12);
    }
    ctx.shadowBlur = 0;
  }

  // Bit‑stream particles along a link (0/1 flowing)
  function drawStream (from, to) {
    const x1 = from.x * width, y1 = from.y * height;
    const x2 = to.x   * width, y2 = to.y   * height;
    const t  = (Date.now() * 0.01) % 1; // time offset
    const count = 10;
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = '#7ef0ff';
    for (let i = 0; i < count; i++) {
      const phase = (t + i / count) % 1;
      const px = x1 + (x2 - x1) * phase;
      const py = y1 + (y2 - y1) * phase;
      // alternate 0/1
      const bit = Math.floor(Date.now() / 200 + i) % 2;
      ctx.fillText(bit, px - 3, py - 3);
    }
  }

  // Packet marker (with label)
  function drawPacket () {
    if (stage === STAGE_DONE) return;
    const x = packetPos.x * width, y = packetPos.y * height;
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fillStyle   = '#ffbc6e';
    ctx.shadowBlur  = 14;
    ctx.fill();
    ctx.fillStyle   = '#000';
    ctx.font        = 'bold 14px monospace';
    const label = (stage <= STAGE_HOST_RECV) ? '📦+HDR' : '📦+RESP';
    ctx.fillText(label, x - 16, y + 6);
    ctx.shadowBlur = 0;
  }

  // Terminal drawing helper
  function drawTerminal (lines, x, y, widthTerm, heightTerm, title) {
    // Background
    ctx.fillStyle = 'rgba(5, 15, 30, 0.92)';
    ctx.fillRect(x, y, widthTerm, heightTerm);
    ctx.strokeStyle = '#3bc0fc';
    ctx.lineWidth   = 2;
    ctx.strokeRect(x, y, widthTerm, heightTerm);
    // Title
    ctx.fillStyle = '#3bc0fc';
    ctx.font      = 'bold 12px monospace';
    ctx.fillText(title, x + 10, y + 20);
    // Lines
    ctx.fillStyle = '#b9f6ff';
    ctx.font      = '11px monospace';
    const maxLines = Math.floor((heightTerm - 30) / 16);
    const visible  = lines.slice(-maxLines);
    visible.forEach((line, i) => {
      ctx.fillText(line, x + 10, y + 40 + i * 16);
    });
  }

  // Status message at the top
  function drawStatus () {
    if (!statusDiv) return;
    const msgs = {
      [STAGE_IDLE]:         'Initialising...',
      [STAGE_APP]:          '🖥️  Application layer preparing request...',
      [STAGE_SESSION]:      '🔗 Session layer establishing connection...',
      [STAGE_TRANSPORT]:    '📦 Transport layer adding headers + port numbers...',
      [STAGE_NETWORK]:      '🌐 Network layer encapsulating IP packet (src→dst)...',
      [STAGE_LINK_PHY]:     '⚡ Physical layer converting to bit stream...',
      [STAGE_ROUTER]:       '🚀 Bit stream traversing edge router...',
      [STAGE_SATELLITE]:    '🛰️  Satellite relay – intercontinental hop...',
      [STAGE_HOST_RECV]:    '💻 Host receiving & processing request...',
      [STAGE_HOST_FILES]:   '📄 Host preparing response files...',
      [STAGE_RESP_SEND]:    '⬅️  Sending response back to client...',
      [STAGE_CLIENT_RECV]:  '📥 Client processing response (reverse layers)...',
      [STAGE_DONE]:         '✅ Handshake complete – loading portfolio ✨'
    };
    statusDiv.innerText = msgs[stage] || '';
  }

  function drawFull () {
    if (!ctx) return;
    drawBackground();
    drawLinks();

    // Show bit‑stream effect only during travel stages
    if (streamActive && streamRoute.length === 2) {
      drawStream(streamRoute[0], streamRoute[1]);
    }

    drawNodes();
    drawPacket();

    // Client terminal (bottom‑left)
    if (clientLog.length > 0) {
      const termX = 10, termY = height - 130;
      drawTerminal(clientLog, termX, termY, 300, 115, 'CLIENT TERMINAL');
    }
    // Server terminal (bottom‑right)
    if (serverLog.length > 0) {
      const termW = 340, termH = 120;
      const termX = width - termW - 10, termY = height - termH - 10;
      drawTerminal(serverLog, termX, termY, termW, termH, 'HOST TERMINAL');
    }
    drawStatus();
  }

  // ==================================================================
  //  TRAVEL ANIMATION (used for both directions)
  // ==================================================================
  function clearTravel () {
    travelTarget   = null;
    travelCallback = null;
    streamActive   = false;
    streamRoute    = [];
  }

  function startTravel (fromNode, toNode, durationSec, callback, showStream = false) {
    packetPos        = { x: fromNode.x, y: fromNode.y };
    travelTarget     = { x: toNode.x,   y: toNode.y   };
    travelStartTime  = performance.now() / 1000;
    travelDuration   = durationSec;
    travelCallback   = callback;
    if (showStream) {
      streamActive = true;
      streamRoute  = [fromNode, toNode];
    }
  }

  // Called inside the main tick
  function updateTravel (nowSec) {
    if (!travelTarget) return;
    const elapsed = nowSec - travelStartTime;
    const t       = Math.min(1, elapsed / travelDuration);
    packetPos.x   = packetPos.x + (travelTarget.x - packetPos.x) * t;
    packetPos.y   = packetPos.y + (travelTarget.y - packetPos.y) * t;
    if (t >= 1) {
      packetPos.x   = travelTarget.x;
      packetPos.y   = travelTarget.y;
      const cb       = travelCallback;
      streamActive   = false;     // stream effect stops
      travelTarget   = null;
      travelCallback = null;
      if (cb) cb();
    }
  }

  // ==================================================================
  //  STAGE TRANSITIONS
  // ==================================================================
  function clearStageTimeout () {
    if (stageTimeout) clearTimeout(stageTimeout);
    stageTimeout = null;
  }

  function goToStage (newStage) {
    clearStageTimeout();
    stage = newStage;
    handleStage();
    drawFull();
  }

  function nextStage () { goToStage(stage + 1); }

  // All stage logic
  function handleStage () {
    switch (stage) {
      // ─── Client sends request ───
      case STAGE_APP:
        clientLog.push('Application: GET /index.html HTTP/1.1');
        clientLog.push('→ constructing request URI');
        stageTimeout = setTimeout(nextStage, 1200);
        break;

      case STAGE_SESSION:
        clientLog.push('Session: establishing TLS session');
        clientLog.push('→ handshake keys exchanged');
        stageTimeout = setTimeout(nextStage, 1400);
        break;

      case STAGE_TRANSPORT:
        clientLog.push('Transport: TCP src=54321 dst=80');
        clientLog.push('→ adding sequence numbers & checksum');
        stageTimeout = setTimeout(nextStage, 1300);
        break;

      case STAGE_NETWORK:
        clientLog.push('Network: IP src=192.168.1.5 dst=203.0.113.5');
        clientLog.push('→ TTL=64, protocol=TCP');
        stageTimeout = setTimeout(nextStage, 1300);
        break;

      case STAGE_LINK_PHY:
        clientLog.push('Data Link: framing with MAC addresses');
        clientLog.push('Physical: 1011001011100... (bit stream)');
        stageTimeout = setTimeout(() => {
          // Start travel to router with stream effect
          startTravel(NODES.client, NODES.router, 1.2, nextStage, true);
        }, 800);
        break;

      case STAGE_ROUTER:
        // Already travelling; on arrival (callback) we come here
        clientLog.push('Router: forwarding packet to satellite');
        startTravel(NODES.router, NODES.satellite, 1.4, nextStage, true);
        break;

      case STAGE_SATELLITE:
        clientLog.push('Satellite: intercontinental relay');
        startTravel(NODES.satellite, NODES.host, 1.3, () => {
          // Arrived at host, now show server receiving
          goToStage(STAGE_HOST_RECV);
        }, true);
        break;

      // ─── Host receives & processes ───
      case STAGE_HOST_RECV:
        serverLog.push('Physical: bit stream detected');
        serverLog.push('Data Link: decoding frames');
        stageTimeout = setTimeout(() => {
          serverLog.push('Network: IP packet src=192.168.1.5 dst=203.0.113.5');
          serverLog.push('→ valid TTL, routing to host');
          stageTimeout = setTimeout(() => {
            serverLog.push('Transport: TCP reassembly (seq/ack OK)');
            stageTimeout = setTimeout(() => {
              serverLog.push('Session: TLS decryption');
              stageTimeout = setTimeout(() => {
                serverLog.push('Application: received GET /index.html');
                serverLog.push('→ processing path & file list');
                stageTimeout = setTimeout(() => {
                  goToStage(STAGE_HOST_FILES);
                }, 1300);
              }, 1000);
            }, 1000);
          }, 1000);
        }, 900);
        break;

      case STAGE_HOST_FILES:
        serverLog.push('Preparing response:');
        RESPONSE_FILES.forEach(f => serverLog.push(`  - ${f}`));
        serverLog.push('→ compressing & adding HTTP headers');
        stageTimeout = setTimeout(() => {
          // Start response journey back to client
          serverLog.push('Sending response bit stream...');
          startTravel(NODES.host, NODES.satellite, 1.2, () => {
            serverLog.push('Passing through satellite...');
            startTravel(NODES.satellite, NODES.router, 1.3, () => {
              serverLog.push('Router forwarding response...');
              startTravel(NODES.router, NODES.client, 1.1, () => {
                goToStage(STAGE_CLIENT_RECV);
              }, true);
            }, true);
          }, true);
        }, 1500);
        break;

      // ─── Client receives response (reverse layers) ───
      case STAGE_CLIENT_RECV:
        clientLog.push('Physical: receiving response bit stream');
        clientLog.push('Data Link: extracting frames');
        stageTimeout = setTimeout(() => {
          clientLog.push('Network: IP packet verified');
          stageTimeout = setTimeout(() => {
            clientLog.push('Transport: TCP reassembly complete');
            stageTimeout = setTimeout(() => {
              clientLog.push('Session: TLS decryption');
              stageTimeout = setTimeout(() => {
                clientLog.push('Application: HTTP 200 OK');
                clientLog.push('→ files: index.html, style.css, bundle.js');
                clientLog.push('→ executing code...');
                stageTimeout = setTimeout(() => goToStage(STAGE_DONE), 1200);
              }, 800);
            }, 800);
          }, 800);
        }, 800);
        break;

      case STAGE_DONE:
        // Final status updated via drawStatus, then reveal portfolio
        setTimeout(() => {
          heroOverlay  && heroOverlay.classList.add('hide');
          portfolioDiv && portfolioDiv.classList.add('revealed');
        }, 600);
        break;
    }
  }

  // ==================================================================
  //  MAIN ANIMATION LOOP
  // ==================================================================
  function tick (nowMs) {
    const nowSec = nowMs / 1000;
    updateTravel(nowSec);
    drawFull();
    tickId = requestAnimationFrame(tick);
  }

  function startTick () {
    if (tickId) cancelAnimationFrame(tickId);
    tickId = requestAnimationFrame(tick);
  }

  function stopTick () {
    if (tickId) cancelAnimationFrame(tickId);
    tickId = null;
  }

  // ==================================================================
  //  RESET (optional replay)
  // ==================================================================
  function resetJourney () {
    stopTick();
    clearStageTimeout();
    clearTravel();
    stage          = STAGE_IDLE;
    packetPos      = { x: NODES.client.x, y: NODES.client.y };
    clientLog      = [];
    serverLog      = [];
    streamActive   = false;
    streamRoute    = [];
    heroOverlay  && heroOverlay.classList.remove('hide');
    portfolioDiv && portfolioDiv.classList.remove('revealed');
    drawFull();
    // Restart after short delay
    setTimeout(() => {
      startTick();
      goToStage(STAGE_APP);
    }, 300);
  }

  // ==================================================================
  //  EVENT LISTENERS
  // ==================================================================
  function bindEvents () {
    if (resetBtn) resetBtn.addEventListener('click', resetJourney);
    window.addEventListener('resize', () => { resizeCanvas(); drawFull(); });
    // Use ResizeObserver for more reliable container changes
    if (window.ResizeObserver && canvas.parentElement) {
      new ResizeObserver(() => {
        resizeCanvas();
        drawFull();
      }).observe(canvas.parentElement);
    }
  }

  // ==================================================================
  //  BOOTSTRAP
  // ==================================================================
  function init () {
    if (!initDOM()) return;
    resizeCanvas();
    bindEvents();
    // Start the show
    startTick();
    goToStage(STAGE_APP);
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();