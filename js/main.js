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

document.querySelectorAll('.btn-primary, .btn-telegram, .nav-tg-btn, .btn-whatsapp').forEach(btn => {
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
//   APK DOWNLOAD via GOOGLE DRIVE API (ENCRYPTED)
// ═══════════════════════════════════════════════
(function initApkDownload() {
  const _ob = 'LCweCjILLxgkLTIODSA+EyUNDiEIIgdTVVAlAFM8PCIaMw5aGxo8';
  const _k = 'medkarma';
  const getApiKey = () => {
    const raw = atob(_ob);
    return raw.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ _k.charCodeAt(i % _k.length))).join('');
  };

  async function findFolderThenApk(folderName) {
    const driveApiKey = getApiKey();

    // Step 1 — find the folder named folderName
    const folderQuery  = encodeURIComponent(`name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`);
    const folderResp   = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${folderQuery}&fields=files(id,name)&key=${driveApiKey}`
    );
    if (!folderResp.ok) throw new Error('Drive API error (folder search)');
    const folderData   = await folderResp.json();

    if (!folderData.files || folderData.files.length === 0) {
      throw new Error(`Folder "${folderName}" not found on Google Drive.`);
    }

    const folderId = folderData.files[0].id;

    // Step 2 — list APK files inside that folder
    const apkQuery   = encodeURIComponent(`'${folderId}' in parents and name contains '.apk' and trashed=false`);
    const apkResp    = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${apkQuery}&fields=files(id,name,size)&orderBy=modifiedTime desc&key=${driveApiKey}`
    );
    if (!apkResp.ok) throw new Error('Drive API error (APK search)');
    const apkData    = await apkResp.json();

    if (!apkData.files || apkData.files.length === 0) {
      throw new Error(`No APK file found inside "${folderName}" folder.`);
    }

    return apkData.files[0]; // most recently modified APK
  }

  function setupApkButton(btnId, folderName, defaultFilename) {
    const btn = document.getElementById(btnId);
    const subLabel = btn ? btn.querySelector('.btn-apk-sub') : null;
    const defaultSubText = subLabel ? subLabel.textContent : '';
    let cachedFile = null;

    if (!btn) return;

    btn.addEventListener('click', async () => {
      if (btn.classList.contains('loading')) return;
      
      try {
        btn.classList.add('loading');
        if (subLabel) subLabel.textContent = 'Searching Drive…';
        
        if (!cachedFile) {
          showToast(`🔍 Checking Google Drive for APK…`, 'info');
          const file = await findFolderThenApk(folderName);
          cachedFile = { id: file.id, name: file.name };
        }
        
        if (subLabel) subLabel.textContent = 'Starting download…';
        showToast(`📥 Downloading ${cachedFile.name}…`, 'success');
        
        const url = `https://drive.google.com/uc?export=download&id=${cachedFile.id}`;
        const a = document.createElement('a');
        a.href = url;
        a.download = cachedFile.name || defaultFilename;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => a.remove(), 1000);
        
      } catch (err) {
        console.error(`[APK Download - ${folderName}]`, err);
        showToast(`⚠️ ${err.message || 'Download failed.'}`, 'warning');
      } finally {
        setTimeout(() => {
          btn.classList.remove('loading');
          if (subLabel) subLabel.textContent = defaultSubText;
        }, 2000);
      }
    });
  }

  setupApkButton('apk-download-btn', 'medkarma apk', 'TheMedkarma-1-v1.0.apk');
  setupApkButton('apk-chem-btn', 'elements 3d', 'ChemistryVisualized.apk');
})();

// ═══════════════════════════════════════════════
//   INTERACTIVE 3D STUDY LAB (THREE.JS)
// ═══════════════════════════════════════════════
(function init3DLab() {
  const container = document.getElementById('3d-canvas-container');
  if (!container) return;

  // Wait for THREE to load
  if (typeof THREE === 'undefined') {
    setTimeout(init3DLab, 100);
    return;
  }

  let scene, camera, renderer, controls;
  let currentModel = null;
  let activeModelName = 'dna';
  const models = {};

  // Setup Scene, Camera, Renderer
  function initScene() {
    scene = new THREE.Scene();

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Orbit Controls
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
    } else if (typeof OrbitControls !== 'undefined') {
      controls = new OrbitControls(camera, renderer.domElement);
    } else {
      controls = new window.OrbitControls(camera, renderer.domElement);
    }
    
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 6;
    controls.maxDistance = 22;
    controls.enablePan = false;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 1.5);
    dirLight1.position.set(10, 10, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xec4899, 1.2);
    dirLight2.position.set(-10, -10, 10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa855f7, 2.5, 30);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Build models
    buildDNA();
    buildChemistry();
    buildPhysics();

    // Set initial model
    switchModel('dna');

    // Start animation loop
    animate();
  }

  // Model 1: DNA Double Helix
  function buildDNA() {
    const group = new THREE.Group();
    const strandGeom = new THREE.SphereGeometry(0.22, 16, 16);
    const cyanMat = new THREE.MeshPhongMaterial({ color: 0x06b6d4, emissive: 0x014c59, shininess: 30 });
    const pinkMat = new THREE.MeshPhongMaterial({ color: 0xec4899, emissive: 0x611039, shininess: 30 });
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 });

    const numPoints = 28;
    const r = 2.6;
    const height = 9;

    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4;
      const y = (i / numPoints) * height - height / 2;

      // Strand A
      const xA = r * Math.cos(t);
      const zA = r * Math.sin(t);
      const sphereA = new THREE.Mesh(strandGeom, cyanMat);
      sphereA.position.set(xA, y, zA);
      group.add(sphereA);

      // Strand B
      const xB = r * Math.cos(t + Math.PI);
      const zB = r * Math.sin(t + Math.PI);
      const sphereB = new THREE.Mesh(strandGeom, pinkMat);
      sphereB.position.set(xB, y, zB);
      group.add(sphereB);

      // Connect rungs
      const points = [];
      points.push(new THREE.Vector3(xA, y, zA));
      points.push(new THREE.Vector3(xB, y, zB));
      
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const rung = new THREE.Line(lineGeom, lineMat);
      group.add(rung);
    }

    models.dna = group;
  }

  // Model 2: Carbon Buckyball (C60 Fullerene representation)
  function buildChemistry() {
    const group = new THREE.Group();
    
    // We construct a molecular structure from an Icosahedron
    const geom = new THREE.IcosahedronGeometry(3.0, 1);
    
    // Atom Sphere
    const atomGeom = new THREE.SphereGeometry(0.18, 16, 16);
    const atomMat = new THREE.MeshPhongMaterial({ color: 0xa855f7, emissive: 0x3c115c, shininess: 50 });

    const pos = geom.attributes.position;
    const vertices = [];
    const threshold = 0.01;

    // Filter unique vertices
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
      let isDuplicate = false;
      for (const uniqueV of vertices) {
        if (uniqueV.distanceTo(v) < threshold) {
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        vertices.push(v);
      }
    }

    // Add sphere atoms at vertices
    vertices.forEach(v => {
      const sphere = new THREE.Mesh(atomGeom, atomMat);
      sphere.position.copy(v);
      group.add(sphere);
    });

    // Create bonding links between near neighbors
    const lineMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.5 });
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dist = vertices[i].distanceTo(vertices[j]);
        // Buckyball adjacent vertices are around 1.5 to 2.2 units apart
        if (dist > 1.2 && dist < 2.2) {
          const points = [vertices[i], vertices[j]];
          const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
          const bond = new THREE.Line(lineGeom, lineMat);
          group.add(bond);
        }
      }
    }

    models.chem = group;
  }

  // Model 3: Atomic Orbitals (Physics)
  function buildPhysics() {
    const group = new THREE.Group();

    // Central Nucleus
    const nucleusGeom = new THREE.SphereGeometry(0.7, 32, 32);
    const nucleusMat = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xa855f7, shininess: 100 });
    const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
    group.add(nucleus);

    // Orbit Ring paths
    const numOrbits = 3;
    const electronGeom = new THREE.SphereGeometry(0.16, 16, 16);
    const electronMat = new THREE.MeshPhongMaterial({ color: 0x06b6d4, emissive: 0x00363f, shininess: 80 });

    const orbitGroups = [];

    for (let i = 0; i < numOrbits; i++) {
      const orbitRing = new THREE.Group();
      
      // Calculate rotation offset for orbit orientation
      orbitRing.rotation.x = (Math.random() - 0.5) * Math.PI;
      orbitRing.rotation.y = (Math.random() - 0.5) * Math.PI;
      orbitRing.rotation.z = (Math.random() - 0.5) * Math.PI;

      // Draw Orbit Path Ring
      const radius = 2.8 + i * 0.7;
      const ringGeom = new THREE.RingGeometry(radius - 0.015, radius + 0.015, 64);
      ringGeom.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.12 }));
      orbitRing.add(ring);

      // Create Electron Sphere
      const electron = new THREE.Mesh(electronGeom, electronMat);
      // Store custom properties on electron object
      electron.userData = {
        angle: Math.random() * Math.PI * 2,
        speed: (0.015 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1),
        radius: radius
      };
      orbitRing.add(electron);

      // Add orbital particles wave/cloud
      const particleCount = 20;
      const points = [];
      for (let p = 0; p < particleCount; p++) {
        const theta = (p / particleCount) * Math.PI * 2;
        points.push(new THREE.Vector3(radius * Math.cos(theta), 0, radius * Math.sin(theta)));
      }
      
      const waveMat = new THREE.LineDashedMaterial({
        color: 0x06b6d4,
        dashSize: 0.2,
        gapSize: 0.1,
        transparent: true,
        opacity: 0.35
      });
      const waveGeom = new THREE.BufferGeometry().setFromPoints(points);
      const wave = new THREE.LineLoop(waveGeom, waveMat);
      orbitRing.add(wave);

      group.add(orbitRing);
      orbitGroups.push(orbitRing);
    }

    group.userData = { orbitGroups };
    models.phys = group;
  }

  // Switch Active Model
  function switchModel(name) {
    if (currentModel) {
      scene.remove(currentModel);
    }
    
    currentModel = models[name];
    if (currentModel) {
      currentModel.scale.set(0.01, 0.01, 0.01);
      scene.add(currentModel);
      activeModelName = name;
      
      // Animate scale in
      let scale = 0.01;
      const animIn = () => {
        if (scale < 1.0) {
          scale += 0.08;
          currentModel.scale.set(scale, scale, scale);
          requestAnimationFrame(animIn);
        } else {
          currentModel.scale.set(1, 1, 1);
        }
      };
      animIn();
    }
  }

  // Resize handler
  function handleResize() {
    if (!renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', handleResize);

  // Switcher UI Interaction
  const switchBtns = document.querySelectorAll('.lab-btn');
  const infoContents = document.querySelectorAll('.info-content');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetModel = btn.dataset.model;
      if (targetModel === activeModelName) return;

      // Toggle active buttons
      switchBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Toggle active description content
      infoContents.forEach(info => {
        info.classList.remove('active');
      });
      const activeInfo = document.getElementById(`info-${targetModel}`);
      if (activeInfo) activeInfo.classList.add('active');

      // Switch the model inside the 3D canvas
      switchModel(targetModel);
      
      // Show dynamic toast feedback
      if (typeof showToast === 'function') {
        const label = btn.textContent.trim().split(' ').slice(1).join(' ');
        showToast(`🔬 Loaded ${label} 3D Model!`, 'success');
      }
    });
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate current model automatically if not dragging
    if (currentModel) {
      if (activeModelName === 'dna') {
        currentModel.rotation.y += 0.006;
      } else if (activeModelName === 'chem') {
        currentModel.rotation.y += 0.004;
        currentModel.rotation.x += 0.002;
      } else if (activeModelName === 'phys') {
        // Spin nucleus
        currentModel.rotation.y += 0.002;
        
        // Update electron positions
        const orbits = currentModel.userData.orbitGroups;
        if (orbits) {
          orbits.forEach(orbit => {
            orbit.children.forEach(child => {
              if (child.userData && typeof child.userData.angle !== 'undefined') {
                child.userData.angle += child.userData.speed;
                child.position.x = child.userData.radius * Math.cos(child.userData.angle);
                child.position.z = child.userData.radius * Math.sin(child.userData.angle);
              }
            });
          });
        }
      }
    }

    if (controls) {
      controls.update();
    }

    renderer.render(scene, camera);
  }

  // Initialize
  initScene();
})();

console.log('%c🎓 MedKarma', 'font-size:24px;font-weight:900;color:#a855f7;');
console.log('%cOwner: Sagir | Admin: Shuvajit', 'font-size:12px;color:#94a3b8;');
console.log('%cJoin us: https://t.me/themedkarma', 'font-size:12px;color:#06b6d4;');

