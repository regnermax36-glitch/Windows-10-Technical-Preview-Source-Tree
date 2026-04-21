document.addEventListener('DOMContentLoaded', () => {
    const edgeHandle = document.getElementById('edge-handle');
    const edgeSidebar = document.getElementById('edge-sidebar');
    const julesTrigger = document.getElementById('jules-trigger');
    const julesOverlay = document.getElementById('jules-overlay');
    const smartThingsBtn = document.getElementById('smart-things-btn');
    const julesResponse = document.getElementById('jules-response');
    const spenLayer = document.getElementById('spen-selection');
    const selectionBox = document.getElementById('selection-box');

    let sidebarOpen = false;

    // Toggle Edge Sidebar
    edgeHandle.addEventListener('click', () => {
        sidebarOpen = !sidebarOpen;
        edgeSidebar.style.right = sidebarOpen ? '0px' : '-100px';
        edgeHandle.style.right = sidebarOpen ? '80px' : '0px';
    });

    // Toggle Jules Overlay
    julesTrigger.addEventListener('click', () => {
        const isOpen = julesOverlay.style.bottom === '0px';
        julesOverlay.style.bottom = isOpen ? '-100%' : '0px';

        // Hide response when closing
        if (isOpen) {
            julesResponse.classList.add('hidden');
        }
    });

    // Simulate SmartThings Integration
    smartThingsBtn.addEventListener('click', () => {
        julesResponse.classList.remove('hidden');
    });

    // Simulate S-Pen "Smart Select"
    window.addEventListener('keydown', (e) => {
        if (e.key === 's') { // Simulate S-Pen button or shortcut
            spenLayer.classList.remove('hidden');
            selectionBox.style.width = '200px';
            selectionBox.style.height = '150px';
            selectionBox.style.top = '100px';
            selectionBox.style.left = '50px';

            setTimeout(() => {
                spenLayer.classList.add('hidden');
                // Open Jules after selection
                julesOverlay.style.bottom = '0px';
            }, 1500);
        }
    });
});
