// usersettings.js

function toggleSettingsMenu() {
    const settingsMenu = document.getElementById('settings-menu');
    settingsMenu.style.display = settingsMenu.style.display === 'block' ? 'none' : 'block';
}

function logout() {
    alert("Logging out...");
    // Add your logout logic here
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    const darkModeStatus = body.classList.contains('dark-mode');
    alert(darkModeStatus ? "Dark Mode Enabled" : "Dark Mode Disabled");
    // You can also save the dark mode status in local storage
    localStorage.setItem('darkMode', darkModeStatus);
}

// Load dark mode status from local storage
document.addEventListener('DOMContentLoaded', () => {
    const darkModeStatus = localStorage.getItem('darkMode') === 'true';
    if (darkModeStatus) {
        document.body.classList.add('dark-mode');
    }
});
