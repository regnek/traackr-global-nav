// update these variables to reference shadow root instead of document when needed
const traackrGlobalNavigation = document.getElementById('traackr-global-navigation'),
      menuPanel = document.getElementById('flyoutWrapper'),
      siteHeaderArrow = document.getElementById('siteHeaderArrow'),
      hamburgerMenuTrigger = document.getElementById('hamburger-menu-trigger');

let activeTab;

hamburgerMenuTrigger.addEventListener('click', () => {
    const currentlyOpen = hamburgerMenuTrigger.getAttribute('aria-expanded');
    toggleHamburgerMenu(currentlyOpen);
});

function toggleHamburgerMenu(currentlyOpen) {
    if (currentlyOpen == 'true') {
        hamburgerMenuTrigger.setAttribute('aria-label', 'Open menu');
        hamburgerMenuTrigger.setAttribute('aria-expanded', 'false');
        hamburgerMenuTrigger.querySelector('div').classList.remove('_hamburger-button__icon--state-open_a7ow8_52');
    } else {
        hamburgerMenuTrigger.setAttribute('aria-label', 'Close menu');
        hamburgerMenuTrigger.setAttribute('aria-expanded', 'true');
        hamburgerMenuTrigger.querySelector('div').classList.add('_hamburger-button__icon--state-open_a7ow8_52');
    }
}

traackrGlobalNavigation.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('mouseover', () => {
        activeTab = tab;

        tab.classList.add('--active');

        const distanceFromLeft = tab.getBoundingClientRect().left,
              tabWidth = tab.getBoundingClientRect().width;
        siteHeaderArrow.style.setProperty('--siteHeaderArrowOffset', `${(distanceFromLeft + tabWidth / 2) - 12}px`);
        siteHeaderArrow.classList.add('show-arrow');
        menuPanel.style.setProperty('--translateX-value', distanceFromLeft - 48 + 'px');
        menuPanel.classList.add('state--open');

        traackrGlobalNavigation.querySelectorAll('.global-navigation-tab-panel').forEach(panel => {
            const targetId = tab.getAttribute('aria-controls');
            if (panel.id == targetId) {
                panel.classList.add('global-navigation-open-tab');
            } else {
                panel.classList.remove('global-navigation-open-tab');
            }
        });
    });

    tab.addEventListener('mouseout', e => {
        if (e.toElement != menuPanel && e.toElement != siteHeaderArrow && e.toElement != tab) {
            let a = e.toElement;
            const els = [];
            while (a) {
                els.unshift(a.id);
                a = a.parentNode;
            }
        
            if (!els.includes(tab.id) && !(els.includes(tab.getAttribute('aria-controls')))) {    
                menuPanel.classList.remove('state--open');
                siteHeaderArrow.classList.remove('show-arrow');
                menuPanel.querySelector('.global-navigation-open-tab').classList.remove('global-navigation-open-tab');
                tab.classList.remove('--active');
            }
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



    if (!els.includes('flyoutWrapper') && !els.includes('siteHeaderArrow') && !els.includes(activeTab.getAttribute('aria-controls')) && !els.includes(activeTab.id)) {
        menuPanel.classList.remove('state--open');
        siteHeaderArrow.classList.remove('show-arrow');
        menuPanel.querySelector('.global-navigation-open-tab').classList.remove('global-navigation-open-tab');
        activeTab.classList.remove('--active');
    }
});