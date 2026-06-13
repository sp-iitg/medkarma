/* ============================================
   MEDKARMA - Main JavaScript
   3D Animations | Gyroscope | Canvas Particles
   Mobile-First | Touch Optimized
   ============================================ */

'use strict';

// ─── SPLASH SCREEN ───
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('hidden');
      setTimeout(() => splash.remove(), 600);
    }
  }, 1800);
});

// ─── UPDATE YEAR IN FOOTER ───
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ═══════════════════════════════════════════════
//   3D CANVAS PARTICLE SYSTEM
// ═══════════════════════════════════════════════
(function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const colors = [
    'rgba(124,58,237,', 'rgba(168,85,247,', 'rgba(6,182,212,',
    'rgba(236,72,153,', 'rgba(245,158,11,', 'rgba(16,185,129,',
  ];
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x    = Math.random() * W;
      this.y    = init ? Math.random() * H : H + 10;
      this.z    = Math.random() * 0.8 + 0.2;
      this.r    = (Math.random() * 2.5 + 1) * this.z;
      this.vx   = (Math.random() - 0.5) * 0.4;
      this.vy   = -(Math.random() * 0.6 + 0.2) * this.z;
      this.col  = colors[Math.floor(Math.random() * colors.length)];
      this.a    = 0;
      this.aMax = Math.random() * 0.55 + 0.1;
      this.life = 0;
      this.maxL = Math.random() * 250 + 150;
    }
    update() {
      this.life++;
      const fadeT = 30;
      if (this.life < fadeT) this.a = (this.life / fadeT) * this.aMax;
      else if (this.life > this.maxL - fadeT) this.a = ((this.maxL - this.life) / fadeT) * this.aMax;
      else this.a = this.aMax;
      this.x += this.vx;
      this.y += this.vy;
      if (this.life >= this.maxL || this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col + this.a.toFixed(2) + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    const COUNT = Math.min(60, Math.floor((W * H) / 15000));
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize, { passive: true });
  init();
  loop();
})();

// ═══════════════════════════════════════════════
//   GYROSCOPE TILT
// ═══════════════════════════════════════════════
(function initGyro() {
  const root = document.documentElement;
  function applyTilt(beta, gamma) {
    const maxTilt = 12;
    const rx = Math.max(-maxTilt, Math.min(maxTilt, beta  * 0.15));
    const ry = Math.max(-maxTilt, Math.min(maxTilt, gamma * 0.15));
    root.style.setProperty('--gyro-x', rx.toFixed(2) + 'deg');
    root.style.setProperty('--gyro-y', ry.toFixed(2) + 'deg');
  }
  if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      document.body.addEventListener('touchend', async function unlock() {
        try {
          const perm = await DeviceOrientationEvent.requestPermission();
          if (perm === 'granted') {
            window.addEventListener('deviceorientation', e => applyTilt(e.beta, e.gamma), { passive: true });
          }
        } catch (_) {}
        document.body.removeEventListener('touchend', unlock);
      }, { once: true });
    } else {
      window.addEventListener('deviceorientation', e => applyTilt(e.beta, e.gamma), { passive: true });
    }
  }
})();

// ═══════════════════════════════════════════════
//   SCROLL-DRIVEN PARALLAX ORBS
// ═══════════════════════════════════════════════
(function initParallax() {
  const orbA = document.querySelector('.parallax-orb-a');
  const orbB = document.querySelector('.parallax-orb-b');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (orbA) orbA.style.transform = `translateY(${pct * -120}px) translateZ(0)`;
      if (orbB) orbB.style.transform = `translateY(${pct *  90}px) translateZ(0)`;
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ═══════════════════════════════════════════════
//   TOUCH GLOW BURST
// ═══════════════════════════════════════════════
document.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  const glow = document.createElement('div');
  glow.className = 'touch-glow';
  glow.style.left = t.clientX + 'px';
  glow.style.top  = t.clientY + 'px';
  document.body.appendChild(glow);
  setTimeout(() => glow.remove(), 700);
}, { passive: true });

// ═══════════════════════════════════════════════
//   3D TILT ON EXAM CARDS (touch + mouse)
// ═══════════════════════════════════════════════
document.querySelectorAll('.exam-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  card.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    const rect = card.getBoundingClientRect();
    const x = (t.clientX - rect.left) / rect.width  - 0.5;
    const y = (t.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.015)`;
    card.style.transition = 'none';
  }, { passive: true });
  card.addEventListener('touchend', () => {
    card.style.transform = '';
    card.style.transition = '';
  }, { passive: true });
});

// ═══════════════════════════════════════════════
//   3D FLIP CARDS ON TAP (feature cards)
// ═══════════════════════════════════════════════
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    if (card.classList.contains('flipped')) {
      setTimeout(() => card.classList.remove('flipped'), 2500);
    }
  });
});

// ═══════════════════════════════════════════════
//   NAVBAR SCROLL EFFECT
// ═══════════════════════════════════════════════
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ═══════════════════════════════════════════════
//   SCROLL REVEAL
// ═══════════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// ═══════════════════════════════════════════════
//   SUBJECT CHIPS FILTER
// ═══════════════════════════════════════════════
const chips = document.querySelectorAll('.subject-chip');
const materialItems = document.querySelectorAll('.material-item');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    chip.style.transform = 'scale(1.1)';
    setTimeout(() => chip.style.transform = '', 200);
    const filter = chip.dataset.filter;
    materialItems.forEach(item => {
      if (filter === 'all' || item.dataset.subject === filter) {
        item.style.display = 'flex';
        item.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ═══════════════════════════════════════════════
//   COUNTER ANIMATION
// ═══════════════════════════════════════════════
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target).toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('en-IN') + suffix;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ═══════════════════════════════════════════════
//   RIPPLE + ANIMATION KEYFRAMES
// ═══════════════════════════════════════════════
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }
  @keyframes fadeInUp   { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
`;
document.head.appendChild(styleEl);

document.querySelectorAll('.btn-primary, .btn-telegram, .nav-tg-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 2;
    const cx = (e.clientX || rect.left + rect.width  / 2) - rect.left - size / 2;
    const cy = (e.clientY || rect.top  + rect.height / 2) - rect.top  - size / 2;
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background:rgba(255,255,255,0.25);
      width:${size}px; height:${size}px;
      left:${cx}px; top:${cy}px;
      transform:scale(0);
      animation:rippleAnim 0.6s ease forwards;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ═══════════════════════════════════════════════
//   SMOOTH SCROLL
// ═══════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ═══════════════════════════════════════════════
//   TICKER PAUSE
// ═══════════════════════════════════════════════
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
  ticker.addEventListener('touchstart', () => ticker.style.animationPlayState = 'paused', { passive: true });
  ticker.addEventListener('touchend',   () => ticker.style.animationPlayState = 'running', { passive: true });
}

// ═══════════════════════════════════════════════
//   SWIPE ON TESTIMONIALS
// ═══════════════════════════════════════════════
(function initSwipe() {
  const scroll = document.querySelector('.testimonial-scroll');
  if (!scroll) return;
  let startX = 0;
  scroll.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  scroll.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) scroll.scrollBy({ left: diff > 0 ? 280 : -280, behavior: 'smooth' });
  }, { passive: true });
})();

// ═══════════════════════════════════════════════
//   TOAST NOTIFICATION
// ═══════════════════════════════════════════════
function showToast(msg, type = 'info') {
  const toast = document.createElement('div');
  const colors = { info: '#7c3aed', success: '#10b981', warning: '#f59e0b' };
  toast.style.cssText = `
    position:fixed; bottom:100px; left:50%;
    transform:translateX(-50%) translateY(20px);
    background:rgba(10,10,26,0.96);
    border:1px solid ${colors[type]};
    color:#f8fafc; padding:12px 20px;
    border-radius:50px; font-size:0.82rem;
    font-weight:600; font-family:'Outfit',sans-serif;
    z-index:9999; backdrop-filter:blur(20px);
    box-shadow:0 4px 24px rgba(0,0,0,0.5);
    opacity:0; transition:all 0.3s ease; white-space:nowrap;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; }, 10);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ─── MATERIAL ITEM CLICK ───
document.querySelectorAll('.material-item').forEach(item => {
  item.addEventListener('click', () => showToast('📲 Join our Telegram to download!', 'info'));
});

// ─── EXAM CARD CLICK ───
document.querySelectorAll('.exam-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('.exam-name')?.textContent || 'Exam';
    showToast(`📚 ${name} materials on Telegram!`, 'success');
  });
});

// ─── CSS PARTICLES (fallback) ───
(function createCSSParticles() {
  const pColors = ['#7c3aed','#a855f7','#06b6d4','#ec4899','#f59e0b','#10b981'];
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${pColors[Math.floor(Math.random() * pColors.length)]};
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 14 + 10}s;
      animation-delay:${Math.random() * 8}s;
      opacity:0;
    `;
    document.body.appendChild(p);
  }
})();

// ─── HERO LOGO 3D HOVER (desktop) ───
const heroLogo = document.querySelector('.hero-logo');
if (heroLogo) {
  const wrap = heroLogo.closest('.hero-logo-wrap');
  if (wrap) {
    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 20;
      heroLogo.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) scale(1.06)`;
    });
    wrap.addEventListener('mouseleave', () => {
      heroLogo.style.transform = 'rotateX(var(--gyro-x)) rotateY(var(--gyro-y))';
    });
  }
}

// ═══════════════════════════════════════════════
//   APK DOWNLOAD — Google Drive Direct Link
//   No API key needed!
// ═══════════════════════════════════════════════
(function initApkDownload() {
  // Direct download link generated from Google Drive file ID: 1GZmZoHO-douUueEWFCXd_7TFCVAJhpDG
  const APK_URL      = 'https://drive.google.com/uc?export=download&id=1GZmZoHO-douUueEWFCXd_7TFCVAJhpDG';
  const APK_FILENAME = 'TheMedkarma-1-v1.0.apk';

  const btn      = document.getElementById('apk-download-btn');
  const subLabel = btn ? btn.querySelector('.btn-apk-sub') : null;
  if (!btn) return;

  btn.addEventListener('click', () => {
    // Animate button
    btn.classList.add('loading');
    if (subLabel) subLabel.textContent = 'Starting download…';
    showToast('📥 Downloading MedKarma APK…', 'success');

    // Create invisible link and click it
    const a = document.createElement('a');
    a.href     = APK_URL;
    a.download = APK_FILENAME;
    a.target   = '_blank';
    a.rel      = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 500);

    // Reset button after 2s
    setTimeout(() => {
      btn.classList.remove('loading');
      if (subLabel) subLabel.textContent = 'Free Android App • APK';
    }, 2000);
  });
})();

console.log('%c🎓 MedKarma', 'font-size:24px;font-weight:900;color:#a855f7;');
console.log('%cOwner: Sagir | Admin: Shuvajit', 'font-size:12px;color:#94a3b8;');
console.log('%cJoin us: https://t.me/themedkarma', 'font-size:12px;color:#06b6d4;');
