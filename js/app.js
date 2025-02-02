const traackrGlobalNavigation = document.getElementById('traackr-global-navigation');

traackrGlobalNavigation.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('mouseover', e => {
        traackrGlobalNavigation.querySelectorAll('.global-navigation-tab-panel').forEach(panel => {
            const targetId = tab.getAttribute('aria-controls');
            if (panel.id == targetId) {
                panel.classList.add('global-navigation-open-tab');
            } else {
                panel.classList.remove('global-navigation-open-tab');
            }
        });
    });
});