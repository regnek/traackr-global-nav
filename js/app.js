// set/get dark mode
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function setVDarkMode(mode) {
    console.log(mode);
    let darkMode = getCookie("darkMode");
    if (darkMode != "") {
        console.log(darkMode);
    } else {
      if (mode != "" && mode != null && mode != undefined) {
        setCookie("darkMode", mode, 365);
        console.log(darkMode + 'sup');
      }
    }
  }

// const setVisualMode = () => {
//     const bcl = document.body.classList,
//           currentMode = getCookie('darkMode');
//     if (bcl.contains('dark')) {
//         bcl.remove('dark');
//         document.cookie = 'darkMode=false';
//     } else {
//         bcl.add('dark');
//         document.cookie = 'darkMode=true';
//     }
//     console.log(currentMode);
// }

// update these variables to reference shadow root instead of document when needed
const traackrGlobalNavigation = document.getElementById('traackr-global-navigation'),
      menuPanel = document.getElementById('flyoutWrapper'),
      siteHeaderArrow = document.getElementById('siteHeaderArrow'),
      visualModeToggle = document.getElementById('visual-mode-toggle');

let activeTab;



visualModeToggle.addEventListener('click', () => {
    console.log('hey');
    setDarkMode('true');
});


traackrGlobalNavigation.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('mouseover', () => {
        activeTab = tab;

        tab.classList.add('--active');

        const distanceFromLeft = tab.getBoundingClientRect().left,
              tabWidth = tab.getBoundingClientRect().width;
        siteHeaderArrow.style.setProperty('--siteHeaderArrowOffset', `${(distanceFromLeft + tabWidth / 2) - 12}px`);
        siteHeaderArrow.classList.add('show-arrow');
        menuPanel.style.setProperty('--translateX-value', distanceFromLeft - 80 + 'px');
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