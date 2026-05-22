// Basic interactions: typewriter, reveal on scroll, circular progress, mobile nav, video modal
document.addEventListener('DOMContentLoaded', () => {
  // Typewriter effect (simple)
  const typedEl = document.getElementById('typed-name');
  const texts = ['David Farid', 'Flutter Developer', 'Laravel & API Specialist'];
  let ti = 0 , ci = 0, forward = true;
  function typeLoop() {
    const t = texts[ti];
    if (forward) {
      ci++;
      typedEl.textContent = t.slice(0,ci);
      if (ci === t.length) { forward = false; setTimeout(typeLoop, 1200); return; }
    } else {
      ci--;
      typedEl.textContent = t.slice(0,ci);
      if (ci === 0) { forward = true; ti = (ti+1)%texts.length; setTimeout(typeLoop, 250); return; }
    }
    setTimeout(typeLoop, 60);
  }
  typeLoop();

  // Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, {threshold: 0.12});
  reveals.forEach(r => obs.observe(r));

  // Circular skill animation
  const skills = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const percent = Number(card.dataset.percent || 80);
      const svg = card.querySelector('.progress');
      const number = card.querySelector('.circle-number');
      const radius = 40; // matches CSS r
      const circumference = 2 * Math.PI * radius;
      const offset = circumference * (1 - percent/100);
      svg.style.strokeDasharray = circumference;
      // animate numeric and stroke
      let start = 0;
      const duration = 900;
      const t0 = performance.now();
      function animate(now){
        const t = Math.min(1, (now - t0)/duration);
        const ease = 1 - Math.pow(1 - t, 3);
        const current = Math.round(ease * percent);
        number.textContent = current + '%';
        svg.style.strokeDashoffset = circumference * (1 - (ease * percent / 100));
        if (t < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      o.unobserve(card);
    });
  }, {threshold: 0.4});
  skills.forEach(s => skillObserver.observe(s));

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Video modal (simple)
  const videoBtns = document.querySelectorAll('.video-btn');
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoFrame');
  const modalClose = document.querySelector('.modal-close');
  videoBtns.forEach(b => {
    b.addEventListener('click', () => {
      const src = b.dataset.video;
      iframe.src = src;
      modal.classList.add('show');
    });
  });
  modalClose.addEventListener('click', () => {
    iframe.src = '';
    modal.classList.remove('show');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) { iframe.src=''; modal.classList.remove('show'); }
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.custom-navbar');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.transition = 'transform 0.3s ease';
  } else {
    navbar.style.transform = 'translateY(0)';
  }

  lastScrollY = currentScrollY;
});


document.addEventListener('DOMContentLoaded', () => {
  // ... أكوادك الحالية

  const titles = [
    "David Farid — Portfolio",
    "Mobile & Backend Developer"
  ];
  let index = 0;
  let charIndex = 0;
  let forward = true;

  function animateTitle() {
    let currentTitle = titles[index];
    if (forward) {
      charIndex++;
      document.title = currentTitle.slice(0, charIndex);
      if (charIndex === currentTitle.length) {
        forward = false;
        setTimeout(animateTitle, 1500); 
        return;
      }
    } else {
      charIndex--;
      document.title = currentTitle.slice(0, charIndex);
      if (charIndex === 0) {
        forward = true;
        index = (index + 1) % titles.length;
        setTimeout(animateTitle, 300); 
        return;
      }
    }
    setTimeout(animateTitle, 120);
  }

  animateTitle();
});
