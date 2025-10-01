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
