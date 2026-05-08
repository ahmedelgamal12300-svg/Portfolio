/* ═══════════════════════════════════════
   AHMED ELGAMAL PORTFOLIO — script.js
═══════════════════════════════════════ */


/* ════════════════════════════════
   CANVAS PARTICLES BACKGROUND
════════════════════════════════ */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.a  = Math.random() * 0.5 + 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 229, 255, ${this.a})`;
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
      this.reset();
    }
  }
}

// Create 80 particles
for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function drawConnectionLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnectionLines();
  requestAnimationFrame(animateCanvas);
}
animateCanvas();


/* ════════════════════════════════
   SCROLL REVEAL ANIMATIONS
════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate skill bars when they become visible
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => {
  revealObserver.observe(el);
});


/* ════════════════════════════════
   MOBILE NAVIGATION MENU
════════════════════════════════ */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
const menuIcon  = document.getElementById('menu-icon');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuIcon.className = navLinks.classList.contains('open')
    ? 'fas fa-times'
    : 'fas fa-bars';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuIcon.className = 'fas fa-bars';
  });
});


/* ════════════════════════════════
   NAVBAR SCROLL EFFECT
════════════════════════════════ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(6, 8, 16, .95)';
  } else {
    navbar.style.background = 'rgba(6, 8, 16, .8)';
  }
});
