window.addEventListener('DOMContentLoaded', initGlobalNav);

function initGlobalNav(e, root) {
    const srcEl = root || document;

    console.log(srcEl);

    const traackrGlobalNavigation = document.getElementById('traackr-global-navigation'),
        menuPanel = document.getElementById('flyoutWrapper');

    traackrGlobalNavigation.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('mouseover', () => {
            traackrGlobalNavigation.querySelectorAll('.global-navigation-tab-panel').forEach(panel => {
                const targetId = tab.getAttribute('aria-controls');
                if (panel.id == targetId) {
                    menuPanel.classList.add('state--open');
                    panel.classList.add('global-navigation-open-tab');
                } else {
                    panel.classList.remove('global-navigation-open-tab');
                }
            });
        });

        tab.addEventListener('mouseout', e => {
            if (e.toElement != menuPanel) {
                menuPanel.classList.remove('state--open');
            }
        });
    });

    menuPanel.addEventListener('mouseout', e => {
        let a = e.toElement;
        const els = [];
        while (a) {
            els.unshift(a.id);
            a = a.parentNode;
        }

        if (!els.includes('flyoutWrapper')) {
            menuPanel.classList.remove('state--open');
        }
    });
}