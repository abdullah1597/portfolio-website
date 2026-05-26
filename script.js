/* =============================================
   MUHAMMAD ABDULLAH — PORTFOLIO JS
   ============================================= */

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 900);
});

/* ===== SCROLL PROGRESS BAR ===== */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = pct + '%';
});

/* ===== NAVBAR SCROLL + ACTIVE LINKS ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  // Sticky style
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateNav);
updateNav();

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navList.classList.toggle('open');
});

// Close menu on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navList.classList.remove('open');
  });
});

/* ===== TYPED TEXT EFFECT ===== */
const typedWords = [
  'Digital Marketer',
  'Graphic Designer',
  'Computer Operator',
  'E-Commerce Specialist',
  'BSCS Student',
];
let wordIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typed-text');
const typingSpeed   = 80;
const deletingSpeed = 45;
const pauseDelay    = 1600;

function typeEffect() {
  const current = typedWords[wordIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === current.length) {
    delay = pauseDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex  = (wordIndex + 1) % typedWords.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}
setTimeout(typeEffect, 1200);

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = current;
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ===== BACK TO TOP ===== */
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backBtn.classList.add('visible');
  } else {
    backBtn.classList.remove('visible');
  }
});
backBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== CONTACT FORM ===== */
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.querySelector('#f-name').value.trim();
  const email   = form.querySelector('#f-email').value.trim();
  const message = form.querySelector('#f-message').value.trim();

  if (!name || !email || !message) {
    status.textContent = '⚠️ Please fill in all required fields.';
    status.className   = 'form-status error';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    status.textContent = '⚠️ Please enter a valid email address.';
    status.className   = 'form-status error';
    return;
  }

  // Simulate sending (replace with actual backend/emailJS call)
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled   = true;
  btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  setTimeout(() => {
    status.textContent = '✅ Message sent! I\'ll get back to you soon.';
    status.className   = 'form-status success';
    form.reset();
    btn.disabled  = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    setTimeout(() => { status.textContent = ''; }, 5000);
  }, 1400);
});

/* ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ===== TECH ITEM HOVER GLOW ===== */
document.querySelectorAll('.tech-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.setProperty('--hover', '1');
  });
  item.addEventListener('mouseleave', () => {
    item.style.setProperty('--hover', '0');
  });
});

const cursor = document.querySelector('.cursor-dot');

const trails = [];
const trailCount = 8;

for(let i = 0; i < trailCount; i++){

    const trail = document.createElement('div');

    trail.classList.add('cursor-trail');

    document.body.appendChild(trail);

    trails.push({
        element: trail,
        x: 0,
        y: 0
    });
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateTrail(){

    let x = mouseX;
    let y = mouseY;

    trails.forEach((trail, index) => {

        trail.x += (x - trail.x) * 0.3;
        trail.y += (y - trail.y) * 0.3;

        trail.element.style.left = trail.x + 'px';
        trail.element.style.top = trail.y + 'px';

        trail.element.style.transform =
        `translate(-50%, -50%) scale(${(trailCount-index)/trailCount})`;

        x = trail.x;
        y = trail.y;
    });

    requestAnimationFrame(animateTrail);
}

animateTrail();