(function(){
  // Standard header markup (keeps classes used by CSS/js)
  const headerHTML = `
  <header class="site-header">
    <div class="header-inner container">
      <a class="brand" href="/index.html" aria-label="Nexlify Tech home">
        <img src="assets/nexlify-logo.jpg" alt="Nexlify Tech logo" class="logo">
        <div class="brand-text"><strong>Nexlify Tech</strong><small>Building smart digital products</small></div>
      </a>

      <div class="header-actions" style="display:flex;align-items:center;gap:8px">
        <div class="header-cta">
          <a class="btn btn-primary" href="/contact.html">Start a project</a>
        </div>
        <button id="navToggle" class="nav-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle navigation">
          <span class="hamburger"></span>
        </button>
      </div>

      <nav id="primary-nav" class="site-nav" aria-label="Main navigation">
        <div class="nav-divider" aria-hidden="true"></div>
        <ul>
          <li><a class="nav-link" href="/index.html"><i class="fa-solid fa-house" aria-hidden="true"></i><span class="nav-title">Home</span><span class="nav-desc">Overview</span></a></li>
          <li><a class="nav-link" href="/about.html"><i class="fa-solid fa-circle-info" aria-hidden="true"></i><span class="nav-title">About</span><span class="nav-desc">Who we are</span></a></li>

          <li class="nav-item has-sub">
            <button class="sub-toggle" aria-expanded="false" aria-controls="sub-projects">Projects <span class="chev" aria-hidden="true">▾</span></button>
            <ul id="sub-projects" class="sub-menu" role="menu" aria-hidden="true">
              <li role="none"><a role="menuitem" href="/projects.html"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i><span class="nav-title">All projects</span><span class="nav-desc">Browse case studies</span></a></li>
              <li role="none"><a role="menuitem" href="/projects.html#nexlify-shop"><i class="fa-solid fa-shop" aria-hidden="true"></i><span class="nav-title">Nexlify Shop</span><span class="nav-desc">AI marketplace</span></a></li>
              <li role="none"><a role="menuitem" href="/projects.html#chopsmo"><i class="fa-solid fa-utensils" aria-hidden="true"></i><span class="nav-title">ChopSmo</span><span class="nav-desc">Kitchen automation</span></a></li>
            </ul>
          </li>

          <li class="nav-item has-sub">
            <button class="sub-toggle" aria-expanded="false" aria-controls="sub-team">Team <span class="chev" aria-hidden="true">▾</span></button>
            <ul id="sub-team" class="sub-menu" role="menu" aria-hidden="true">
              <li role="none"><a role="menuitem" href="/team.html"><i class="fa-solid fa-users" aria-hidden="true"></i><span class="nav-title">Meet the team</span><span class="nav-desc">Engineers & designers</span></a></li>
              <li role="none"><a role="menuitem" href="/team.html#careers"><i class="fa-solid fa-briefcase" aria-hidden="true"></i><span class="nav-title">Join us</span><span class="nav-desc">Open roles</span></a></li>
            </ul>
          </li>

          <li><a class="nav-link" href="/cv.html"><i class="fa-solid fa-file" aria-hidden="true"></i><span class="nav-title">CV</span><span class="nav-desc">View CV</span></a></li>

          <li><a class="nav-link" href="/contact.html"><i class="fa-solid fa-envelope" aria-hidden="true"></i><span class="nav-title">Contact</span><span class="nav-desc">Get in touch</span></a></li>
        </ul>
        <div class="nav-divider" aria-hidden="true"></div>
        <div class="nav-footer">
          <div class="nav-contact">Email us: <a href="mailto:hello@nexlifytech.site">hello@nexlifytech.site</a></div>
          <div class="nav-social">
            <a href="#" aria-label="Twitter" class="social-link"><i class="fa-brands fa-x"></i></a>
            <a href="#" aria-label="LinkedIn" class="social-link"><i class="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  `;

  try{
    const existing = document.querySelector('header');
    if(existing){
      // Only replace if markup is different to avoid flicker
      if(!existing.classList || !existing.classList.contains('site-header') || existing.innerHTML.indexOf('primary-nav')===-1){
        existing.outerHTML = headerHTML;
      }
    } else {
      document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // Ensure nav.js is loaded so the hamburger works on every page.
    // If a nav script tag already exists (it may have run before we injected the header),
    // remove and re-add it so the initialization code runs against the newly-inserted header.
    (function ensureNavScript(){
      const selector = 'script[src="/js/nav.js"], script[src="js/nav.js"]';
      const existing = document.querySelector(selector);
      if (existing){
        try{
          const src = existing.getAttribute('src');
          existing.parentNode.removeChild(existing);
          const s = document.createElement('script');
          s.src = src;
          s.defer = true;
          document.body.appendChild(s);
        }catch(e){
          // fallback: do nothing
          console.warn('could not reload nav.js', e);
        }
      } else {
        const s = document.createElement('script');
        s.src = '/js/nav.js';
        s.defer = true;
        document.body.appendChild(s);
      }
    })();

    // Ensure Font Awesome is available (try to add if missing)
    if(!document.querySelector('link[href*="font-awesome"]') && !document.querySelector('link[href*="fontawesome"]')){
      const f = document.createElement('link');
      f.rel = 'stylesheet';
      f.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
      document.head.appendChild(f);
    }
  }catch(e){console.warn('header-inject failed',e)}
})();
