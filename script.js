/* ===========================
   MOBILE NAV TOGGLE
=========================== */
const toggle   = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', isOpen);

  // Animate hamburger → X
  const spans = toggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

/* ===========================
   SCROLL-TRIGGERED ANIMATIONS
=========================== */
const animItems = document.querySelectorAll('.animate-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animItems.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
} else {
  // Fallback — show everything immediately
  animItems.forEach(el => { el.style.opacity = '1'; });
}
