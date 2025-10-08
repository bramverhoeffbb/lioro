// Lioro main.js
// Effects: reveal-on-scroll, smooth scroll, form handler, year

(function(){
  const root = document.documentElement;

  // Year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Smooth scroll for same-page nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el){
          e.preventDefault();
          const yOffset = -80; // navbar offset
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      }
    });
  });

  // Reveal on scroll (IntersectionObserver)
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries){
      if (entry.isIntersecting){
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal-up, .reveal-fade').forEach((el, i) => {
    // optional stagger via CSS var --reveal-delay
    const delay = el.style.getPropertyValue('--reveal-delay') || '0ms';
    el.style.transitionDelay = delay;
    io.observe(el);
  });

  // Motion preference handling: respect OS, but allow user override via toggle (persisted in localStorage)
  const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReduced = mq ? mq.matches : false;

  // Read override from localStorage: 'reduced-motion' -> 'true'|'false' or null
  const stored = localStorage.getItem('reduced-motion');
  const userReduced = stored === 'true' ? true : (stored === 'false' ? false : null);

  // final decision: user override (if set) takes precedence, otherwise OS preference
  const reducedMotion = userReduced === null ? prefersReduced : userReduced;

  // Apply class to <html> when user explicitly enables reduced motion
  if (reducedMotion) document.documentElement.classList.add('reduced-motion');

  // Motion toggle button wiring (allows user to override OS settings)
  const motionToggle = document.getElementById('motionToggle');
  if (motionToggle){
    // set initial pressed state
    motionToggle.setAttribute('aria-pressed', String(reducedMotion));
    motionToggle.addEventListener('click', ()=>{
      const current = document.documentElement.classList.contains('reduced-motion');
      const next = !current;
      if (next) {
        document.documentElement.classList.add('reduced-motion');
        localStorage.setItem('reduced-motion', 'true');
      } else {
        document.documentElement.classList.remove('reduced-motion');
        localStorage.setItem('reduced-motion', 'false');
      }
      motionToggle.setAttribute('aria-pressed', String(next));
    });
  }

  if (!reducedMotion){
    // --- Typewriter effect for the hero brand (subtle, single run) ---
    (function heroTypewriter(){
      const el = document.getElementById('heroType');
      if (!el) return;
      const text = el.textContent.trim();
      el.textContent = '';
      let i = 0;
      const speed = 70; // ms per character
      function step(){
        if (i <= text.length) {
          el.textContent = text.slice(0, i);
          i++;
          setTimeout(step, speed);
        } else {
          // add a small neon pulse to CTA after typing finishes
          const cta = document.getElementById('ctaPricing');
          if (cta){
            cta.classList.add('pulse-active');
            setTimeout(()=> cta.classList.remove('pulse-active'), 1400);
          }
          // Announce completion for screen readers (polite)
          const ann = document.getElementById('announcer');
          if (ann) ann.textContent = text + ' geladen';
        }
      }
      // start slightly after reveal for better sequencing
      setTimeout(step, 420);
    })();

    // small observer to add a recurring pulse when CTA is in view
    (function ctaPulseObserver(){
      const cta = document.getElementById('ctaPricing');
      if (!cta) return;
      const pio = new IntersectionObserver((entries)=>{
        for (const e of entries){
          if (e.isIntersecting){
            cta.classList.add('pulse-active');
            setTimeout(()=>cta.classList.remove('pulse-active'), 1200);
          }
        }
      }, { threshold: 0.5 });
      pio.observe(cta);
    })();
  }

  // Futuristic effects removed for a simpler modern look

  // Contact form handler
  window.handleContact = function(e){
    e.preventDefault();
    const status = document.getElementById('formStatus');
    if (status){
      status.textContent = 'Versturen…';
      setTimeout(() => {
        status.innerHTML = 'Bedankt! Je bericht is ontvangen. Ik reageer snel.';
      }, 900);
    }
    e.target.reset();
  };

  // Dark-only: no theme logic
})();
