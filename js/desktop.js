// ===================================================================
// SOLACE OS BETA 1.1.6 - DESKTOP WINDOW & SYSTEM ENVIRONMENT MANAGER
// ===================================================================

// Track structural configurations and cascading window coordinates
let windowCascadeOffset = 0;
const INITIAL_WINDOW_ZINDEX = 100;
let highestZIndex = INITIAL_WINDOW_ZINDEX;

document.addEventListener('DOMContentLoaded', () => {
    initSystemClock();
    initSplashScreen();
});

/**
 * 1. Live Top Ribbon Taskbar Clock Utility
 * Updates the structural time elements matching standard 12-hour format strings
 */
function initSystemClock() {
    const clockElement = document.getElementById('systemClock');
    
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight '0' as '12'
        
        if (clockElement) {
            clockElement.textContent = `${hours}:${minutes} ${ampm}`;
        }
    }
    
    updateClock();
    setInterval(updateClock, 1000); // Tick frame execution every single second
}

/**
 * 2. Splash Initialization Automation Timer
 * Handles booting progress bar states and drops out tracking filters on load
 */
function initSplashScreen() {
    const splashOverlay = document.getElementById('splashOverlay');
    const skipBtn = document.getElementById('skipBtn');
    const countdownText = document.getElementById('countdownText');
    
    if (!splashOverlay) return;

    let timeLeft = 20; // 20 seconds baseline setup sequencing runtime loop

    const bootTimer = setInterval(() => {
        timeLeft--;
        if (countdownText) {
            countdownText.textContent = `Initializing (${timeLeft}s)`;
        }

        if (timeLeft <= 0) {
            clearInterval(bootTimer);
            if (skipBtn && countdownText) {
                skipBtn.disabled = false;
                countdownText.textContent = "Enter Workspace";
                skipBtn.classList.add('ready');
            }
        }
    }, 1000);

    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            splashOverlay.style.opacity = '0';
            setTimeout(() => {
                splashOverlay.remove();
            }, 500); // Destroy completely from tree parsing nodes
        });
    }
}

/**
 * 3. App Frame Launcher System
 * Injects app layout modules into the #workspace element container grid
 * @param {string} appName - Context string identifying target program identity
 */
function launchApp(appName) {
    const workspace = document.getElementById('workspace');
    if (!workspace) return;

    const lowerName = appName.toLowerCase();
    const existingWindow = document.getElementById(`win-${lowerName}`);
    
    // Focus existing window instead of duplicating instances
    if (existingWindow) {
        focusWindow(existingWindow);
        return;
    }

    // Generate isolated workspace application frame
    const winFrame = document.createElement('div');
    winFrame.id = `win-${lowerName}`;
    winFrame.className = 'app-window';
    
    // Window position tracking configuration presets
    highestZIndex++;
    winFrame.style.width = '680px';
    winFrame.style.height = '420px';
    winFrame.style.position = 'absolute';
    winFrame.style.zIndex = highestZIndex;
    
    // Position cascade layout shifts so elements stagger beautifully
    const baseTop = 60 + windowCascadeOffset;
    const baseLeft = 80 + windowCascadeOffset;
    winFrame.style.top = `${baseTop}px`;
    winFrame.style.left = `${baseLeft}px`;
    
    // Increment window offsets for staggered placements
    windowCascadeOffset = (windowCascadeOffset + 25) % 150;

    // Outer Titlebar wrapper structural architecture templates
    winFrame.innerHTML = `
        <div class="window-titlebar" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; cursor: move; border-radius: 6px 6px 0 0;">
            <span class="win-title" style="font-size: 12px; font-weight: 500; opacity: 0.8; font-family: 'Inter', sans-serif;">${appName}</span>
            <div class="win-controls" style="display: flex; gap: 6px;">
                <button onclick="closeAppWindow('${winFrame.id}')" style="background: #ef4444; border: none; width: 12px; height: 12px; border-radius: 50%; cursor: pointer; padding: 0; outline: none; transition: opacity 0.1s;" onhover="this.style.opacity=0.8"></button>
            </div>
        </div>
        <div class="window-content-body" id="body-${lowerName}" style="height: calc(100% - 32px); overflow: auto; border-radius: 0 0 6px 6px;">
            </div>
    `;

    // Click trigger frame wrapper to elevate index layers on hover interaction
    winFrame.addEventListener('mousedown', () => focusWindow(winFrame));

    workspace.appendChild(winFrame);

    // Context Functional Component Core Router Matrix
    const bodyBox = document.getElementById(`body-${lowerName}`);
    
    switch(lowerName) {
        case 'terminal':
            if (typeof renderTerminalMarkup === 'function') {
                bodyBox.innerHTML = renderTerminalMarkup();
                initTerminalEngine();
            } else {
                bodyBox.innerHTML = `<div style="padding:16px; color:#ef4444; font-family:monospace;">Terminal execution logic unlinked.</div>`;
            }
            break;
            
        case 'settings':
            if (typeof renderSettingsMarkup === 'function') {
                bodyBox.innerHTML = renderSettingsMarkup();
                initSettingsCallbacks();
            } else {
                bodyBox.innerHTML = `<div style="padding:16px; color:#ef4444; font-family:monospace;">Settings execution bundle missing.</div>`;
            }
            break;
            
        default:
            // Placeholder template rendering layout frame for unmapped workspace icons
            bodyBox.innerHTML = `
                <div style="padding: 24px; color: #fff; font-family: 'Inter', sans-serif;">
                    <h3 style="font-weight: 600; font-size: 16px; color: #fda4af;">${appName} Subroutine</h3>
                    <p style="opacity: 0.6; margin-top: 8px; font-size: 13px; line-height: 1.5;">This device application partition module is currently offline or undergoing core system compilation cycles.</p>
                </div>
            `;
    }

    makeWindowDraggable(winFrame);
}

/**
 * 4. Bring Target Windows into Top Layer Space Focus
 * @param {HTMLElement} el - Targeted DOM structural instance layer element
 */
function focusWindow(el) {
    if (parseInt(el.style.zIndex) < highestZIndex) {
        highestZIndex++;
        el.style.zIndex = highestZIndex;
    }
}

/**
 * 5. Utility to clean up and destroy active frame node trees
 * @param {string} windowId - Core document selector element tag string match identifier
 */
function closeAppWindow(windowId) {
    const targetWin = document.getElementById(windowId);
    if (targetWin) {
        targetWin.remove();
        // Reset cascading parameters if no components remain on standard grid viewport
        if (document.querySelectorAll('.app-window').length === 0) {
            windowCascadeOffset = 0;
            highestZIndex = INITIAL_WINDOW_ZINDEX;
        }
    }
}

/**
 * 6. Draggable Pointer Interceptor Engine for Title-Bars
 * @param {HTMLElement} el - Core master app window layout wrapper element
 */
function makeWindowDraggable(el) {
    const header = el.querySelector('.window-titlebar');
    if (!header) return;

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        // Intercept close button pointer captures to block drag triggers during termination clicks
        if (e.target.tagName === 'BUTTON') return; 
        
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        // Setup raw dynamic delta positions onto document styles
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}