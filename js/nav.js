// Accessible mobile nav slide-out
(function(){
  const btn = document.getElementById('navToggle');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;

  // ensure proper ARIA state
  btn.setAttribute('aria-expanded','false');
  nav.setAttribute('aria-hidden','true');
  let _prevFocus = null;
  let _focusables = [];
  let _onNavKeyDown = null;

  function openNav(){
    btn.setAttribute('aria-expanded','true');
    btn.classList.add('open');
    nav.classList.add('open');
    nav.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // send focus to first link
    _prevFocus = document.activeElement;
    _focusables = Array.from(nav.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')).filter(el => el.offsetParent !== null);
    const first = _focusables.length ? _focusables[0] : nav.querySelector('a');
    if(first) first.focus();

    // trap focus inside the nav
    _onNavKeyDown = function(e){
      if (e.key === 'Tab'){
        if (_focusables.length === 0) { e.preventDefault(); return; }
        const idx = _focusables.indexOf(document.activeElement);
        if (e.shiftKey){
          // shift+tab
          if (idx === 0 || document.activeElement === nav){
            e.preventDefault();
            _focusables[_focusables.length-1].focus();
          }
        } else {
          // tab
          if (idx === _focusables.length - 1){
            e.preventDefault();
            _focusables[0].focus();
          }
        }
      } else if (e.key === 'Escape'){
        closeNav();
      }
    };
    nav.addEventListener('keydown', _onNavKeyDown);
  }
  function closeNav(){
    btn.setAttribute('aria-expanded','false');
    btn.classList.remove('open');
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    // remove focus trap
    if (_onNavKeyDown) nav.removeEventListener('keydown', _onNavKeyDown);
    _onNavKeyDown = null;
    _focusables = [];
    // restore focus to the element that opened the nav
    try{ if (_prevFocus && _prevFocus.focus) _prevFocus.focus(); else btn.focus(); }catch(e){ btn.focus(); }
    _prevFocus = null;
  }

  btn.addEventListener('click', (e)=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) closeNav(); else openNav();
  });

  // close on outside click
  document.addEventListener('click', (e)=>{
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || btn.contains(e.target)) return;
    closeNav();
  });

  // close on Escape
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
  });
})();

// Submenu toggles for desktop (accessible)
(function(){
  const subToggles = Array.from(document.querySelectorAll('.sub-toggle'));
  if (!subToggles.length) return;

  function closeAllSubs(except){
    subToggles.forEach(btn => {
      const item = btn.closest('.nav-item');
      if (!item) return;
      if (item === except) return;
      item.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      const menu = document.getElementById(btn.getAttribute('aria-controls'));
      if (menu) menu.setAttribute('aria-hidden','true');
    });
  }

  subToggles.forEach(btn => {
    const item = btn.closest('.nav-item');
    const menuId = btn.getAttribute('aria-controls');
    const menu = document.getElementById(menuId);
    if (!item || !menu) return;

    // click toggles
    btn.addEventListener('click', (e)=>{
      const isOpen = item.classList.contains('open');
      if (isOpen){
        item.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        menu.setAttribute('aria-hidden','true');
      } else {
        closeAllSubs(item);
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        menu.setAttribute('aria-hidden','false');
        // focus first menu item
        const first = menu.querySelector('a');
        if(first) first.focus();
      }
    });

    // keyboard support: ArrowDown opens and focuses
    btn.addEventListener('keydown', (e)=>{
      if (e.key === 'ArrowDown'){
        e.preventDefault();
        if (!item.classList.contains('open')){
          closeAllSubs(item);
          item.classList.add('open');
          btn.setAttribute('aria-expanded','true');
          menu.setAttribute('aria-hidden','false');
        }
        const first = menu.querySelector('a'); if(first) first.focus();
      }
    });
  });

  // Close submenus on outside click
  document.addEventListener('click', (e)=>{
    const withinNav = document.getElementById('primary-nav').contains(e.target) || document.getElementById('navToggle').contains(e.target);
    if (!withinNav) closeAllSubs();
  });

  // Close all on Escape as well
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeAllSubs();
  });
})();
