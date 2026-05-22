document.addEventListener('DOMContentLoaded', () => {

  // Typewriter
  const typedEl = document.getElementById('typed-name');
  const texts = ['David Farid', 'Full-Stack Developer', 'Cybersecurity Analyst', '.NET Engineer'];
  let ti = 0, ci = 0, forward = true;
  function typeLoop() {
    const t = texts[ti];
    if (forward) {
      ci++;
      typedEl.textContent = t.slice(0, ci);
      if (ci === t.length) { forward = false; setTimeout(typeLoop, 1400); return; }
    } else {
      ci--;
      typedEl.textContent = t.slice(0, ci);
      if (ci === 0) { forward = true; ti = (ti + 1) % texts.length; setTimeout(typeLoop, 300); return; }
    }
    setTimeout(typeLoop, 65);
  }
  typeLoop();

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.1 });
  reveals.forEach(r => obs.observe(r));

  // Circular skill animation
  const skills = document.querySelectorAll('.skill-card');
  const skillObs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const percent = Number(card.dataset.percent || 80);
      const svg = card.querySelector('.progress');
      const number = card.querySelector('.circle-number');
      const circumference = 2 * Math.PI * 40;
      svg.style.strokeDasharray = circumference;
      let t0 = performance.now();
      function animate(now) {
        const t = Math.min(1, (now - t0) / 1000);
        const ease = 1 - Math.pow(1 - t, 3);
        const cur = Math.round(ease * percent);
        number.textContent = cur + '%';
        svg.style.strokeDashoffset = circumference * (1 - (ease * percent / 100));
        if (t < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      o.unobserve(card);
    });
  }, { threshold: 0.4 });
  skills.forEach(s => skillObs.observe(s));

  // Mobile nav
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Navbar hide/show on scroll
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.custom-navbar');
window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  if (cur > lastScrollY && cur > 80) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScrollY = cur;
});
