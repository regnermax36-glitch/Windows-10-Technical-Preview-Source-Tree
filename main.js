document.addEventListener('DOMContentLoaded', () => {
    // Clock Functionality
    const clockElement = document.getElementById('clock');

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }

    setInterval(updateClock, 1000);
    updateClock();

    // Start Menu Toggle
    const startBtn = document.getElementById('start-btn');
    const startMenu = document.getElementById('start-menu');

    startBtn.addEventListener('click', (e) => {
        startMenu.classList.toggle('hidden');
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!startMenu.contains(e.target) && e.target !== startBtn) {
            startMenu.classList.add('hidden');
        }
    });

    // Mock App Opening
    const appItems = document.querySelectorAll('.app-item, .dock-item');
    appItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.id === 'start-btn') return;
            const appName = item.querySelector('span')?.textContent || item.textContent;
            console.log(`Opening ${appName}...`);
            // In a real concept, we'd open a window here
        });
    });
});
