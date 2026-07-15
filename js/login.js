document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;
    const status = document.getElementById('statusMessage');

    status.style.color = "rgba(255, 255, 255, 0.6)";
    status.textContent = "Connecting to system...";

    setTimeout(() => {
        if (user === 'Lumi' && pass === 'stars') {
            status.style.color = "#ffffff";
            status.textContent = "Welcome, Lumi. Loading desktop...";
            
            // Wipe out old system boot markers to guarantee the initialization countdown triggers freshly
            localStorage.removeItem('solace_os_booted');
            
            setTimeout(() => {
                window.location.href = 'desktop.html';
            }, 1200);
        } else {
            status.textContent = "Incorrect username or password.";
            status.style.color = "#ff6b6b";
        }
    }, 800); 
});