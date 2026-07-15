// ===================================================
// SOLACE OS BETA 1.1.6 - ENGINE STATE ROUTER
// ===================================================
const SOLACE_THEME_MATRIX = {
    'blackhole': {
        name: 'Blackhole',
        mode: 'dark',
        gif: 'url("wallpapers/wallpaper.gif")',
        accent: '#ffffff'
    },
    'nature': {
        name: 'Nature',
        mode: 'light',
        gif: 'url("wallpapers/nature.gif")',
        accent: '#16a34a'
    }
};

function applySystemTheme(themeKey) {
    if (!SOLACE_THEME_MATRIX[themeKey]) {
        themeKey = 'blackhole';
    }
    
    localStorage.setItem('sys_active_theme', themeKey);
    
    const targetWallpaper = SOLACE_THEME_MATRIX[themeKey].gif;
    document.body.style.backgroundImage = targetWallpaper;
    localStorage.setItem('custom_wallpaper', targetWallpaper);
    
    document.documentElement.setAttribute('data-theme', themeKey);
    document.documentElement.setAttribute('data-theme-mode', SOLACE_THEME_MATRIX[themeKey].mode);
    document.documentElement.style.setProperty('--theme-accent', SOLACE_THEME_MATRIX[themeKey].accent);
    
    const settingsWin = document.getElementById('win-Settings');
    if (settingsWin && typeof renderSettingsMarkup === 'function') {
        const contentBox = settingsWin.querySelector('.window-content');
        if (contentBox) {
            const activeTabBtn = settingsWin.querySelector('.settings-tab-btn.active-tab');
            const activeTabName = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : 'themes';
            
            contentBox.innerHTML = renderSettingsMarkup();
            if (typeof initSettingsCallbacks === 'function') initSettingsCallbacks();
            switchSettingsTab(activeTabName);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('sys_active_theme') || 'blackhole';
    applySystemTheme(savedTheme);
});