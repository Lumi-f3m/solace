// ===================================================================
// SOLACE OS BETA 1.1.6 - CORE INTERFACE & CONFIGURATION MODULE
// ===================================================================

function renderSettingsMarkup() {
    const currentTheme = localStorage.getItem('sys_active_theme') || 'blackhole';
    const currentDisguise = localStorage.getItem('solace_disguise_type') || 'desmos';
    
    return `
        <div class="settings-layout">
            <div class="settings-sidebar">
                <button onclick="switchSettingsTab('overview')" class="settings-tab-btn" data-tab="overview">Overview</button>
                <button onclick="switchSettingsTab('system')" class="settings-tab-btn" data-tab="system">System OS</button>
                <button onclick="switchSettingsTab('cloaking')" class="settings-tab-btn" data-tab="cloaking">Cloaking</button>
                <button onclick="switchSettingsTab('themes')" class="settings-tab-btn active-tab" data-tab="themes">Customization</button>
            </div>
            
            <div class="settings-main-pane" id="settings-panes">
                
                <div class="settings-pane" id="pane-overview" style="display: none;">
                    <h4 class="section-title">System Overview</h4>
                    <div class="settings-row">
                        <span class="label">OS Version</span>
                        <span class="value">solaceOS Beta v1.1.6</span>
                    </div>
                </div>

                <div class="settings-pane" id="pane-system" style="display: none;">
                    <h4 class="section-title">Hardware Specifications</h4>
                    <div class="specs-backdrop-box" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
                        <div class="settings-row" style="padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
                            <span class="label" style="opacity: 0.7;">Central Processing Unit</span>
                            <span class="value" style="font-family: monospace; font-size: 11px; color: var(--theme-accent);">solaceCore™ v8i @ 4.20GHz</span>
                        </div>
                        <div class="settings-row" style="padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
                            <span class="label" style="opacity: 0.7;">System Memory</span>
                            <span class="value" style="font-family: monospace; font-size: 11px;">16.0 GB Virtual swap_pool</span>
                        </div>
                        <div class="settings-row" style="padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
                            <span class="label" style="opacity: 0.7;">Graphics Rendering Engine</span>
                            <span class="value" style="font-family: monospace; font-size: 11px;">WebGpu Canvas Compositor Handle</span>
                        </div>
                        <div class="settings-row" style="padding: 6px 0; border-top: none;">
                            <span class="label" style="opacity: 0.7;">Core Architecture</span>
                            <span class="value" style="font-family: monospace; font-size: 11px; color: #a3e635;">x86_64 POSIX (Emulated)</span>
                        </div>
                    </div>
                    <h4 class="section-title" style="margin-top: 20px;">Kernel Status</h4>
                    <p class="desc-text">All subsystems functional. System state links operating within optimal environment variables.</p>
                </div>

                <div class="settings-pane" id="pane-cloaking" style="display: none;">
                    <h4 class="section-title">Tab Disguise Settings</h4>
                    <p class="desc-text" style="margin-bottom: 16px;">Quick settings to hide your workspace or leave the page quickly if someone walks into your room.</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div class="settings-row" style="border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px;">
                            <div>
                                <span class="label" style="display: block; font-weight: 500; font-size: 12px;">Hide Tab Title</span>
                                <span class="desc-text" style="opacity: 0.6; font-size: 10px; display: block; margin-top: 2px;">Changes the tab name and icon when you look away from this window.</span>
                            </div>
                            <input type="checkbox" id="hideTabToggle" style="cursor: pointer; width: 16px; height: 16px;">
                        </div>

                        <div class="settings-row" style="border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px;">
                            <div>
                                <span class="label" style="display: block; font-weight: 500; font-size: 12px;">Disguise Preset</span>
                                <span class="desc-text" style="opacity: 0.6; font-size: 10px; display: block; margin-top: 2px;">Choose the site identity used when cloaked.</span>
                            </div>
                            <select id="disguiseSelect" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; padding: 6px 10px; border-radius: 4px; font-size: 11px; width: 160px; outline: none; cursor: pointer;">
                                <option value="desmos" ${currentDisguise === 'desmos' ? 'selected' : ''}>Desmos | Graphing Calculator</option>
                                <option value="google" ${currentDisguise === 'google' ? 'selected' : ''}>Google Drive</option>
                                <option value="clever" ${currentDisguise === 'clever' ? 'selected' : ''}>Clever | Portal</option>
                                <option value="khanacademy" ${currentDisguise === 'khanacademy' ? 'selected' : ''}>Khan Academy</option>
                                <option value="schoology" ${currentDisguise === 'schoology' ? 'selected' : ''}>Home | Schoology</option>
                            </select>
                        </div>

                        <div class="settings-row" style="border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px;">
                            <div>
                                <span class="label" style="display: block; font-weight: 500; font-size: 12px;">Emergency Website</span>
                                <span class="desc-text" style="opacity: 0.6; font-size: 10px; display: block; margin-top: 2px;">Pressing the Escape key twice will instantly open this safe website instead.</span>
                            </div>
                            <input type="text" id="panicUrlInput" placeholder="https://google.com" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; padding: 6px 10px; border-radius: 4px; font-size: 11px; width: 160px; outline: none;">
                        </div>
                    </div>
                </div>

                <div class="settings-pane" id="pane-themes" style="display: block;">
                    <h4 class="section-title">Desktop Wallpapers</h4>
                    <div class="theme-selection-grid">
                        <div onclick="applySystemTheme('blackhole')" class="theme-card ${currentTheme === 'blackhole' ? 'active-theme-card' : ''}">
                            <div class="theme-card-header">
                                <span class="indicator indicator-dark"></span>
                                <span class="theme-name">Blackhole (Dark Mode)</span>
                            </div>
                            <p class="desc-text">Deep space ambient default environment profile layer styling.</p>
                        </div>

                        <div onclick="applySystemTheme('nature')" class="theme-card ${currentTheme === 'nature' ? 'active-theme-card' : ''}">
                            <div class="theme-card-header">
                                <span class="indicator indicator-nature"></span>
                                <span class="theme-name">Nature (Light Mode)</span>
                            </div>
                            <p class="desc-text">Metropolitan transit backdrop with preset frosted mint layouts.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
}

function switchSettingsTab(tabName) {
    const tabs = document.querySelectorAll('.settings-tab-btn');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active-tab');
        } else {
            tab.classList.remove('active-tab');
        }
    });

    const panes = document.querySelectorAll('.settings-pane');
    panes.forEach(pane => {
        if (pane.id === `pane-${tabName}`) {
            pane.style.display = 'block';
        } else {
            pane.style.display = 'none';
        }
    });
}

function initSettingsCallbacks() {
    console.log("solaceOS System Configuration Controls Instantiated.");
    
    const hideTabToggle = document.getElementById('hideTabToggle');
    const disguiseSelect = document.getElementById('disguiseSelect');
    const panicUrlInput = document.getElementById('panicUrlInput');

    if (hideTabToggle) {
        hideTabToggle.checked = localStorage.getItem('solace_hide_tab') === 'true';
        hideTabToggle.addEventListener('change', (e) => {
            localStorage.setItem('solace_hide_tab', e.target.checked);
        });
    }

    if (disguiseSelect) {
        disguiseSelect.addEventListener('change', (e) => {
            localStorage.setItem('solace_disguise_type', e.target.value);
        });
    }

    if (panicUrlInput) {
        panicUrlInput.value = localStorage.getItem('solace_panic_url') || 'https://google.com';
        panicUrlInput.addEventListener('input', (e) => {
            localStorage.setItem('solace_panic_url', e.target.value.trim());
        });
    }
}

// ===================================================================
// GLOBAL INTERCEPT RUNTIME INSTANCES (Flee & Blend Engines)
// ===================================================================

const DISGUISE_PROFILES = {
    'desmos': { title: 'Desmos | Graphing Calculator', file: 'desmos.jpg' },
    'google': { title: 'Google Drive', file: 'google.jpg' },
    'clever': { title: 'Clever | Portal', file: 'clever.jpg' },
    'khanacademy': { title: 'Khan Academy', file: 'khanacademy.jpg' },
    'schoology': { title: 'Home | Schoology', file: 'schoology.jpg' }
};

const originalTitle = document.title;
let originalFavicon = "";

function setupFaviconTracker() {
    let iconEl = document.querySelector("link[rel*='icon']");
    if (!iconEl) {
        iconEl = document.createElement('link');
        iconEl.rel = 'icon';
        document.head.appendChild(iconEl);
    }
    originalFavicon = iconEl.getAttribute("href") || "";
}

setupFaviconTracker();

document.addEventListener('visibilitychange', () => {
    let iconEl = document.querySelector("link[rel*='icon']");
    const isDisguiseActive = localStorage.getItem('solace_hide_tab') === 'true';
    
    if (!iconEl) {
        iconEl = document.createElement('link');
        iconEl.rel = 'icon';
        document.head.appendChild(iconEl);
    }
    
    if (isDisguiseActive) {
        if (document.hidden) {
            const selectedKey = localStorage.getItem('solace_disguise_type') || 'desmos';
            const profile = DISGUISE_PROFILES[selectedKey] || DISGUISE_PROFILES['desmos'];
            
            document.title = profile.title;
            iconEl.setAttribute("href", `favicons/${profile.file}`);
        } else {
            document.title = originalTitle;
            iconEl.setAttribute("href", originalFavicon);
        }
    } else {
        document.title = originalTitle;
        iconEl.setAttribute("href", originalFavicon);
    }
});

let lastEscapeTime = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const currentTime = new Date().getTime();
        if (currentTime - lastEscapeTime < 400) {
            const targetUrl = localStorage.getItem('solace_panic_url') || 'https://google.com';
            window.location.replace(targetUrl);
        }
        lastEscapeTime = currentTime;
    }
});