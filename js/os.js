// ===================================================
// SOLACE OS BETA 1.1.6 - SYSTEM CLOAKING EXECUTOR
// ===================================================
document.addEventListener('keydown', (event) => {
    // Quick emergency drop key sequence: Shift + Escape
    if (event.shiftKey && event.key === 'Escape') {
        const isStealthActive = localStorage.getItem('solace_stealth_active') === 'true';
        
        if (isStealthActive) {
            event.preventDefault();
            const emergencyDest = localStorage.getItem('solace_panic_url') || 'https://google.com';
            
            console.warn("[Panic Trigger] Evacuating solaceOS container context immediately.");
            window.location.replace(emergencyDest);
        }
    }
});