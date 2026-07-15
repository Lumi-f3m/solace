// ===================================================================
// SOLACE OS BETA 1.1.6 - CORE SHELL & SUBROUTINE INTERPRETER ENGINE
// ===================================================================

const NEOFETCH_BLOCK_LOGO = `
             ⣼⣧⡀
       ⢀⣼⡿⢿⣷⡀
⣀⣀⣀⣀⣀⣀⢀⣾⡿⣁⣈⣿⣷⣀⣀⣀⣀⣀⣀⣀
⠙⣿⣿⠿⠿⢏⣾⡟⠽⠿⠿⠿⢿⣿⡿⠿⠿⣿⣿⠏
  ⣿⣧⢠⣾⡟          ⢻⣿⡄⣴⣿⠋
     ⣿⣯⠛              ⢻⣿⡜⠃
     ⢠⣏⣿⣧⡀          ⣴⡽⣿⣄
    ⣰⣿⠏⠈⢿⣷⡀        ⢀⣼⡿⠁⠹⣿⣆
 ⣰⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣟⣾⡿⣽⣿⣷⣿⣿⦦
             ⠈⢳⣶⡄⢀⣾⡿⠁
               ⢻⣿⣾⡟
                ⠻⡟
`;

/**
 * Validates active shell layer styles down against the DOM window context
 * @returns {boolean} True if running inside a hard monochromatic void frame
 */
function isBlackholeActive() {
    const parentWindow = document.querySelector('.app-window') || document.querySelector('.terminal-window');
    if (parentWindow) {
        return parentWindow.classList.contains('blackhole-mode');
    }
    return document.body.classList.contains('blackhole-mode');
}

/**
 * Generates structural HTML markup definitions for original container attachments
 * @returns {string} Fully isolated base markup shell
 */
function renderTerminalMarkup() {
    const monochrome = isBlackholeActive();
    
    // Core Layout Environmental Variables
    const textLogColor = '#ffffff';
    const promptColor = monochrome ? '#ffffff' : '#2dd4bf'; 
    const inputLineBg = monochrome ? '#080808' : 'rgba(255, 255, 255, 0.05)';
    const borderLine = monochrome ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255, 255, 255, 0.1)';

    return `
        <div class="terminal-container" style="color: ${textLogColor}; font-family: monospace; font-size: 13px; height: 100%; display: flex; flex-direction: column; justify-content: space-between; line-height: 1.4; background: transparent;">
            <div class="terminal-body" id="termHistory" style="flex: 1; padding: 14px; overflow-y: auto; white-space: pre-wrap; font-family: monospace; background: transparent;">Welcome to solaceOS Virtual Shell v1.0.0\nType 'help' for a list of available sub-routines.\n\n</div>
            
            <div class="terminal-input-line" style="display: flex; align-items: center; padding: 10px 14px; background: ${inputLineBg}; border-top: ${borderLine}; flex-shrink: 0;">
                <span style="color: ${promptColor}; margin-right: 8px; font-weight: bold; user-select: none; font-family: monospace;">solaceCore ~ #</span>
                <input type="text" id="termInput" autocomplete="off" spellcheck="false" style="flex: 1; background: transparent !important; border: none; color: #fff; font-family: monospace; font-size: 13px; outline: none; padding: 0; margin: 0;">
            </div>
        </div>
    `;
}

/**
 * Initializes listeners, executes routing pipelines, and holds the active log buffer matrix
 */
function initTerminalEngine() {
    const termInput = document.getElementById('termInput');
    const termHistory = document.getElementById('termHistory');
    const termContainer = document.querySelector('.terminal-container');

    if (!termInput || !termHistory) {
        console.warn("solaceOS Shell Engine: Prompt elements missing from current DOM branch root context.");
        return;
    }

    // Direct initialization pointer focus snap
    termInput.focus();

    // Catch peripheral mouse pointer down events to handle focus preservation loops
    if (termContainer) {
        termContainer.addEventListener('click', () => {
            termInput.focus();
        });
    }

    // Capture standard enter key execution streams
    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCmd = termInput.value;
            const cleanCmd = rawCmd.trim();
            
            if (cleanCmd === '') return;

            // 🌟 Split strings by white space to divide the command from its arguments
            const args = cleanCmd.split(/\s+/);
            const baseCmd = args.toLowerCase(); 

            const monochrome = isBlackholeActive();
            const echoPromptColor = monochrome ? '#ffffff' : '#2dd4bf';
            const errorColor = monochrome ? '#ffffff' : '#f43f5e';

            // 1. Log line stream history reflection
            termHistory.innerHTML += `<div style="color: ${echoPromptColor}; margin-bottom: 4px; font-family: monospace; text-align: left !important;">solaceCore ~ # <span style="color: #fff; font-family: monospace;">${escapeHtml(rawCmd)}</span></div>`;

            // 2. Shell Command Routing Subsystems
            switch (baseCmd) {
                case 'neofetch':
                    termHistory.innerHTML += executeNeofetchOutput();
                    break;

                case 'blur':
                    const blurValue = parseInt(args, 10);
                    if (isNaN(blurValue) || blurValue < 0 || blurValue > 50) {
                        termHistory.innerHTML += `<div style="color: ${errorColor}; margin-bottom: 8px; font-family: monospace;">Usage: blur [0-50] (e.g., blur 20)</div>`;
                    } else {
                        const win = document.querySelector('.app-window') || document.querySelector('.terminal-window');
                        if (win) {
                            win.style.backdropFilter = `blur(${blurValue}px) saturate(140%)`;
                            win.style.webkitBackdropFilter = `blur(${blurValue}px) saturate(140%)`;
                            termHistory.innerHTML += `<div style="color: #4ade80; margin-bottom: 8px; font-family: monospace;">[OK] Terminal window backdrop blur set to ${blurValue}px.</div>`;
                        } else {
                            termHistory.innerHTML += `<div style="color: ${errorColor}; margin-bottom: 8px; font-family: monospace;">Error: Layout window context frame container not resolved.</div>`;
                        }
                    }
                    break;

                case 'launch':
                    let targetUrl = args;
                    if (!targetUrl) {
                        termHistory.innerHTML += `<div style="color: ${errorColor}; margin-bottom: 8px; font-family: monospace;">Usage: launch [url] (e.g., launch google.com)</div>`;
                    } else {
                        if (!/^https?:\/\//i.test(targetUrl)) {
                            targetUrl = 'https://' + targetUrl;
                        }
                        
                        try {
                            const blankWin = window.open('about:blank', '_blank');
                            if (blankWin) {
                                blankWin.document.write(`
                                    <html>
                                    <head>
                                        <title>solaceOS App Runner</title>
                                        <style>
                                            body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
                                            iframe { border: none; width: 100%; height: 100%; }
                                        </style>
                                    </head>
                                    <body>
                                        <iframe src="${targetUrl}"></iframe>
                                    </body>
                                    </html>
                                `);
                                blankWin.document.close();
                                termHistory.innerHTML += `<div style="color: #4ade80; margin-bottom: 8px; font-family: monospace;">[OK] Launched instance container hook targeting ${escapeHtml(targetUrl)}</div>`;
                            } else {
                                termHistory.innerHTML += `<div style="color: ${errorColor}; margin-bottom: 8px; font-family: monospace;">Error: Window pop-up blocker intercepted the routine.</div>`;
                            }
                        } catch (err) {
                            termHistory.innerHTML += `<div style="color: ${errorColor}; margin-bottom: 8px; font-family: monospace;">Execution failure: ${escapeHtml(err.message)}</div>`;
                        }
                    }
                    break;

                case 'ping':
                    const host = args || 'solaceos.network';
                    termHistory.innerHTML += `<div style="margin-bottom: 4px; font-family: monospace;">PING ${escapeHtml(host)} (127.0.0.1) 56(84) bytes of data.</div>`;
                    
                    termInput.disabled = true;
                    let pingsSent = 0;
                    
                    const intervalId = setInterval(() => {
                        const ms = (Math.random() * 12 + 4).toFixed(1);
                        termHistory.innerHTML += `<div style="margin-bottom: 4px; font-family: monospace;">64 bytes from 127.0.0.1: icmp_seq=${pingsSent + 1} ttl=64 time=${ms} ms</div>`;
                        termHistory.scrollTop = termHistory.scrollHeight;
                        pingsSent++;

                        if (pingsSent >= 4) {
                            clearInterval(intervalId);
                            termHistory.innerHTML += `
                                <div style="margin-top: 4px; margin-bottom: 8px; font-family: monospace;">
                                    --- ${escapeHtml(host)} ping statistics ---<br>
                                    4 packets transmitted, 4 received, 0% packet loss, time 3004ms<br>
                                    rtt min/avg/max = 4.1/9.4/16.2 ms
                                </div>`;
                            termInput.disabled = false;
                            termInput.focus();
                            termHistory.scrollTop = termHistory.scrollHeight;
                        }
                    }, 600);
                    break;

                case 'help':
                    const helpAccent = monochrome ? '#ffffff' : '#38bdf8';
                    const cmdAccent = monochrome ? '#ffffff' : '#a7f3d0';
                    termHistory.innerHTML += `
                        <div style="margin-bottom: 8px; line-height: 1.6; font-family: monospace; text-align: left !important;">
                            <span style="color: ${helpAccent}; font-weight: bold;">Available Core Subroutines:</span><br>
                            &nbsp;&nbsp;<span style="color: ${cmdAccent};">neofetch</span>        - Fetch hardware specifications.<br>
                            &nbsp;&nbsp;<span style="color: ${cmdAccent};">blur [0-50]</span>     - Adjust background frosted blur intensity.<br>
                            &nbsp;&nbsp;<span style="color: ${cmdAccent};">launch [url]</span>    - Deploy web node sandbox into an about:blank canvas.<br>
                            &nbsp;&nbsp;<span style="color: ${cmdAccent};">ping [target]</span>   - Run connection telemetry loops.<br>
                            &nbsp;&nbsp;<span style="color: ${cmdAccent};">clear</span>           - Wipe the interface log stack buffer.<br>
                            &nbsp;&nbsp;<span style="color: ${cmdAccent};">help</span>            - Display local system diagnostic commands.
                        </div>`;
                    break;

                case 'clear':
                    termHistory.innerHTML = '';
                    break;

                default:
                    termHistory.innerHTML += `<div style="color: ${errorColor}; margin-bottom: 8px; font-family: monospace; text-align: left !important;">sh: command not found: ${escapeHtml(baseCmd)}</div>`;
            }

            // 3. Reset inputs and scroll to bottom
            termInput.value = '';
            termHistory.scrollTop = termHistory.scrollHeight;
        }
    });
}

/**
 * Compiles grid structure mappings to ensure clean column locks under fluid theme contexts
 * @returns {string} High-contrast structured markup string block
 */
function executeNeofetchOutput() {
    const monochrome = isBlackholeActive();
    
    const logoColor = monochrome ? '#ffffff' : '#115e59';        
    const accentColor = monochrome ? '#ffffff' : '#0d9488';      
    const dividerColor = monochrome ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.25)';
    const themeString = monochrome ? 'Blackhole (Dark Mode)' : 'Mint Nature Glass (Light Mode)';

    return `
<div style="display: grid; grid-template-columns: auto 1fr; gap: 24px; padding: 14px 4px; font-family: monospace; color: #ffffff; margin-bottom: 12px; line-height: 1.3; background: transparent; text-align: left !important; width: max-content; max-width: 100%;">
    <pre style="margin: 0; padding: 0; color: ${logoColor}; font-weight: bold; font-family: monospace; line-height: 1.1; white-space: pre; text-align: left !important;">${NEOFETCH_BLOCK_LOGO}</pre>
    
    <div style="line-height: 1.5; font-family: monospace; text-align: left !important; min-width: 240px; display: flex; flex-direction: column; justify-content: center;">
        <div><span style="color: ${accentColor}; font-weight: bold;">root</span>@<span style="color: ${accentColor}; font-weight: bold;">solaceOS-node</span></div>
        <span style="display: block; margin-bottom: 4px; color: ${dividerColor}; font-weight: bold; text-align: left !important; user-select: none;">--------------------------</span>
        <div><span style="color: #38bdf8; font-weight: bold;">OS</span>: solaceOS Beta v1.1.6</div>
        <div><span style="color: #38bdf8; font-weight: bold;">Kernel</span>: x86_64 POSIX Core v5.1.0-emulated</div>
        <div><span style="color: #38bdf8; font-weight: bold;">Uptime</span>: 42 mins</div>
        <div><span style="color: #38bdf8; font-weight: bold;">Shell</span>: solaceShell v1.0</div>
        <div><span style="color: #38bdf8; font-weight: bold;">Display</span>: WebGpu Canvas HTML5 Workspace</div>
        <div><span style="color: #38bdf8; font-weight: bold;">Theme</span>: ${themeString}</div>
        <div><span style="color: #38bdf8; font-weight: bold;">CPU</span>: solaceCore™ v8i @ 4.20GHz</div>
        <div><span style="color: #38bdf8; font-weight: bold;">Memory</span>: 4096MB / 16384MB Swap Pool</div>
        
        <div style="margin-top: 8px; display: flex; gap: 4px; text-align: left !important;">
            ${monochrome ? `
                <span style="background: #000; border: 1px solid #fff; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #333; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #666; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #999; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #ccc; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #fff; width: 14px; height: 14px; display: inline-block;"></span>
            ` : `
                <span style="background: #000; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #ef4444; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #22c55e; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #eab308; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #3b82f6; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #a855f7; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #06b6d4; width: 14px; height: 14px; display: inline-block;"></span>
                <span style="background: #fff; width: 14px; height: 14px; display: inline-block;"></span>
            `}
        </div>
    </div>
</div>
`;
}

/**
 * Escapes special entities to prevent injection vectors across the history log buffer
 * @param {string} text Raw terminal stream data
 * @returns {string} Sanitized text string
 */
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Structural safety layout loader hook.
 */
function setupTerminalAutobind() {
    if (document.getElementById('termInput')) {
        initTerminalEngine();
    } else {
        const observer = new MutationObserver((mutations, obs) => {
            if (document.getElementById('termInput')) {
                initTerminalEngine();
                obs.disconnect(); 
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Fire system initialization layer loops
setupTerminalAutobind();