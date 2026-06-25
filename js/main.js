/* ============================================
   MEDKARMA - Feature Detected Overhauled JavaScript
   GSAP & ScrollTrigger | Lenis Smooth Scroll
   Custom Cursor trailing | Magnetic Hover Physics
   Interactive 3D Lab (Three.js) & Particle BG
   ============================================ */

'use strict';

// ─── STRICT FEATURE DETECTION ───
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isFinePointer = window.matchMedia('(pointer: fine)').matches;
const isDesktop = isFinePointer && !isTouchDevice;

if (isDesktop) {
  document.body.classList.add('is-desktop');
} else {
  document.body.classList.add('is-mobile');
}

// ─── SPLASH SCREEN & PARTICLE TEXT ANIMATION (Original loading screen) ───
(function initSplashAnimation() {
  const splash = document.getElementById('splash');
  const canvas = document.getElementById('splash-canvas');
  if (!canvas || !splash) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let textPoints = [];
  let currentIndex = 0;
  let animationFrameId = null;
  let isPageLoaded = false;
  let hasDismissed = false;
  let hue = 180;

  class Particle {
    constructor(targetX, targetY, color) {
      this.targetX = targetX;
      this.targetY = targetY;

      // Spawn particles far off-screen in a wide circle
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.max(width, height) * 1.5;
      this.x = width / 2 + Math.cos(angle) * radius;
      this.y = height / 2 + Math.sin(angle) * radius;

      this.color = color;
      this.size = 1.5;
      this.arrived = false;
      this.ease = Math.random() * 0.05 + 0.03;

      // Scattering properties
      this.scattered = false;
      this.vx = 0;
      this.vy = 0;
      this.alpha = 1;
    }

    update() {
      if (this.scattered) {
        this.x += this.vx;
        this.y += this.vy;
        this.size *= 0.97;
        this.alpha = Math.max(0, this.alpha - 0.02);
        return;
      }
      if (!this.arrived) {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
          this.x += dx * this.ease;
          this.y += dy * this.ease;
        } else {
          this.x = this.targetX;
          this.y = this.targetY;
          this.arrived = true;
          this.size = 1.0;
        }
      }
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createTextPoints() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
    offCanvas.width = width;
    offCanvas.height = height;

    const fontSize = Math.min(width / 5, 140);
    offCtx.font = `300 ${fontSize}px sans-serif`;
    offCtx.fillStyle = 'white';
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillText("Medkarma", width / 2, height / 2);

    const data = offCtx.getImageData(0, 0, width, height).data;
    textPoints = [];

    const gap = 3;
    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        if (alpha > 128) {
          textPoints.push({ x: x, y: y });
        }
      }
    }

    textPoints.sort((a, b) => a.x - b.x);

    currentIndex = 0;
    particles = [];
  }

  function startScattering() {
    particles.forEach(p => {
      p.scattered = true;
      const dx = p.x - width / 2;
      const dy = p.y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const speed = Math.random() * 5 + 2.5; // Outward velocity magnitude
      p.vx = (dx / dist) * speed + (Math.random() - 0.5) * 1.5;
      p.vy = (dy / dist) * speed + (Math.random() - 0.5) * 1.5;
    });
  }

  function dismissSplash() {
    if (hasDismissed) return;
    hasDismissed = true;

    // Trigger magical dispersion of particles
    startScattering();

    // Dissolve background of splash screen
    splash.classList.add('fade-bg');

    // Add loaded class to body to trigger staggered hero entrance animations
    document.body.classList.add('loaded');

    // Trigger entrance animations
    triggerEntranceAnimations();

    // Wait for scattering particles to fade completely, then cleanup
    setTimeout(() => {
      splash.classList.add('hidden');
      setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        splash.remove();
      }, 600);
    }, 1200);
  }

  window.addEventListener('resize', () => {
    if (!hasDismissed) {
      createTextPoints();
    }
  });

  createTextPoints();

  function animate() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#030308';
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = 'lighter';

    // Only spawn new particles if splash dismissal has not started
    if (!hasDismissed) {
      const pointsPerFrame = Math.floor(textPoints.length / 80) + 1;
      for (let i = 0; i < pointsPerFrame; i++) {
        if (currentIndex < textPoints.length) {
          const pt = textPoints[currentIndex];
          const pColor = `hsl(${(hue + currentIndex * 0.05) % 360}, 100%, 65%)`;
          particles.push(new Particle(pt.x, pt.y, pColor));
          currentIndex++;
        }
      }
    }

    let allArrived = true;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.update();
      p.draw();
      if (!p.arrived) {
        allArrived = false;
      }
    }

    // Trigger dismissal when particles have arrived and the window load event has fired
    if (!hasDismissed && currentIndex >= textPoints.length && allArrived && isPageLoaded) {
      setTimeout(dismissSplash, 800);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Handle page loading
  window.addEventListener('load', () => {
    isPageLoaded = true;
    // Failsafe timeout to ensure loading screen vanishes within a reasonable timeframe
    setTimeout(dismissSplash, 3500);
  });

  animate();
})();

// ─── LENIS SMOOTH SCROLLER (Desktop Only) ───
let lenis;
if (isDesktop) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Bind ScrollTrigger to update on scroll
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// ─── HERO & INITIAL PAGE ENTRANCE ANIMATIONS (Staggered GSAP) ───
function triggerEntranceAnimations() {
  const tl = gsap.timeline();
  
  tl.fromTo('.navbar', {
    y: -30,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  });

  tl.fromTo('.hero-badge', {
    scale: 0.8,
    opacity: 0,
    y: 10
  }, {
    scale: 1,
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.4');

  tl.fromTo('.hero-title .med', {
    y: 40,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.3');

  tl.fromTo('.hero-title .karma', {
    y: 40,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.5');

  tl.fromTo('.hero-tagline', {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.3');

  tl.fromTo('.hero-sub', {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.4');

  tl.fromTo('.hero-cta .cta-row > *', {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out'
  }, '-=0.4');

  tl.fromTo('.hero-cta .btn-whatsapp, .hero-cta .btn-apk', {
    y: 20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.4');

  tl.fromTo('.hero-logo-wrap', {
    scale: 0.6,
    opacity: 0,
    rotation: -10
  }, {
    scale: 1,
    opacity: 1,
    rotation: 0,
    duration: 1.2,
    ease: 'back.out(1.2)'
  }, '-=1.2');

  // Initialize ScrollTrigger reveals ONLY on Desktop to maintain lightweight mobile speeds
  if (isDesktop) {
    initScrollTriggerReveals();
  }
}

// ─── SCROLLTRIGGER REVEALS (Desktop Only) ───
function initScrollTriggerReveals() {
  // Reveal individual elements
  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Stagger reveal grid columns
  const grids = [
    { container: '.stats-bar', items: '.stat-item' },
    { container: '.exam-grid', items: '.exam-card' },
    { container: '.features-grid', items: '.feature-card' },
    { container: '.materials-grid', items: '.material-item' },
    { container: '.team-grid', items: '.team-card' }
  ];

  grids.forEach((grid) => {
    const parent = document.querySelector(grid.container);
    if (!parent) return;

    gsap.fromTo(parent.querySelectorAll(grid.items), 
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 82%'
        }
      }
    );
  });
}

// ─── CUSTOM CURSOR SYSTEM (Desktop Only) ───
if (isDesktop) {
  (function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mX = 0, mY = 0; // Raw coordinates
    let rX = 0, rY = 0; // Interpolated coordinates

    window.addEventListener('mousemove', (e) => {
      mX = e.clientX;
      mY = e.clientY;
      
      dot.style.left = `${mX}px`;
      dot.style.top = `${mY}px`;
    });

    const drawRing = () => {
      const lerpSpeed = 0.12;
      rX += (mX - rX) * lerpSpeed;
      rY += (mY - rY) * lerpSpeed;

      ring.style.left = `${rX}px`;
      ring.style.top = `${rY}px`;

      requestAnimationFrame(drawRing);
    };
    drawRing();

    // Hover modifiers
    const body = document.body;
    const hoverSelectors = 'a, button, .subject-chip, .exam-card, .material-item, .feature-card, .lab-btn';
    
    document.querySelectorAll(hoverSelectors).forEach((item) => {
      item.addEventListener('mouseenter', () => {
        body.classList.add('cursor-hover');
        if (item.classList.contains('btn-primary') || item.classList.contains('btn-telegram') || item.classList.contains('btn-whatsapp') || item.classList.contains('nav-logo')) {
          body.classList.add('cursor-difference');
        }
      });

      item.addEventListener('mouseleave', () => {
        body.classList.remove('cursor-hover');
        body.classList.remove('cursor-difference');
      });
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = 0;
      ring.style.opacity = 0;
    });

    document.addEventListener('mouseenter', () => {
      dot.style.opacity = 1;
      ring.style.opacity = 1;
    });
  })();
}

// ─── MAGNETIC BUTTON PHYSICS (Desktop Only) ───
if (isDesktop) {
  (function initMagneticElements() {
    const magneticItems = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-telegram, .btn-whatsapp, .nav-tg-btn, .nav-logo, .social-btn');
    
    magneticItems.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        const x = e.clientX - elX;
        const y = e.clientY - elY;
        
        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  })();
}

// ─── INTERACTIVE BACKGROUND CONSTELLATION (Desktop Only) ───
if (isDesktop) {
  (function initInteractiveBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 12;
        this.color = 'rgba(0, 242, 254, 0.4)';
      }

      update() {
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 15;
            }
          }
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 15;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 15;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      let particleCount = Math.min(75, Math.floor((W * H) / 18000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 110) {
            let alpha = (1 - (dist / 110)) * 0.12;
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };
    animate();
    
    window.addEventListener('resize', init);
  })();
}

// ─── 3D GYROSCOPE/TILT HOVERS (Desktop Only) ───
if (isDesktop) {
  (function initTiltEffects() {
    document.querySelectorAll('.exam-card, .team-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-5px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.02)`;
        card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.4), 0 0 25px ${card.dataset.glow || 'rgba(0, 242, 254, 0.1)'}`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  })();
}

// ─── 3D FLIP CARDS ON CLICK ───
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    if (card.classList.contains('flipped')) {
      setTimeout(() => card.classList.remove('flipped'), 3000);
    }
  });
});

// ─── NAVBAR DYNAMIC TRANSPARENCY ───
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ─── SUBJECT CHIPS FILTERING ───
const chips = document.querySelectorAll('.subject-chip');
const materialItems = document.querySelectorAll('.material-item');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    // Tiny micro-animation click visual
    gsap.to(chip, { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });

    const filter = chip.dataset.filter;
    materialItems.forEach(item => {
      if (filter === 'all' || item.dataset.subject === filter) {
        item.style.display = 'flex';
        gsap.fromTo(item, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ─── COUNTER STATS ANIMATION (GSAP) ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const obj = { count: 0 };

  gsap.to(obj, {
    count: target,
    duration: 2.2,
    ease: 'power3.out',
    onUpdate: () => {
      el.textContent = Math.floor(obj.count).toLocaleString('en-IN') + suffix;
    }
  });
}

// IntersectionTrigger to trigger counters
const statsSection = document.querySelector('.stats-bar');
if (statsSection) {
  ScrollTrigger.create({
    trigger: statsSection,
    start: 'top 85%',
    onEnter: () => {
      document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
    },
    once: true
  });
}

// ─── TOAST NOTIFICATION ───
const toast = document.createElement('div');
toast.className = 'toast-notice';
document.body.appendChild(toast);

function showToast(message, isSuccess = false) {
  toast.textContent = message;
  toast.className = 'toast-notice' + (isSuccess ? ' success' : '') + ' show';
  
  gsap.fromTo(toast, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out' });

  setTimeout(() => {
    gsap.to(toast, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        toast.classList.remove('show');
      }
    });
  }, 3000);
}

// Trigger Toast feedback
document.querySelectorAll('.material-item').forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('.material-title')?.textContent || 'Material';
    showToast(`📲 Heading to Telegram to download: ${title}`, true);
  });
});

document.querySelectorAll('.exam-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('.exam-name')?.textContent || 'Exam';
    showToast(`📚 Loading resources for: ${name}`, true);
  });
});

// ─── ANNOUNCEMENT TICKER PLAY/PAUSE ON HOVER ───
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}

// ─── SMOOTH SCROLL ANCHORS ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    
    if (targetEl) {
      if (isDesktop && lenis) {
        lenis.scrollTo(targetEl, {
          offset: -40,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        // Native scroll fallbacks for lightweight mobile experience
        const offset = 40;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetEl.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ─── INTERACTIVE 3D STUDY LAB (THREE.JS VS MOBILE FALLBACKS) ───
(function init3DLab() {
  const container = document.getElementById('3d-canvas-container');
  if (!container) return;

  const switchBtns = document.querySelectorAll('.lab-btn');
  const infoContents = document.querySelectorAll('.info-content');
  let activeModelName = 'dna';

  // Desktop WebGL Route (Three.js)
  if (isDesktop) {
    // Safely wait for THREE dependencies
    if (typeof THREE === 'undefined') {
      setTimeout(init3DLab, 100);
      return;
    }

    let scene, camera, renderer, controls;
    let currentModel = null;
    const models = {};

    const initScene = () => {
      scene = new THREE.Scene();

      const w = container.clientWidth || 320;
      const h = container.clientHeight || 380;

      camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camera.position.set(0, 0, 15);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

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
      controls.maxDistance = 20;
      controls.enablePan = false;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0x00f2fe, 1.5);
      dirLight1.position.set(10, 10, 10);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xff007f, 1.2);
      dirLight2.position.set(-10, -10, 10);
      scene.add(dirLight2);

      const pointLight = new THREE.PointLight(0x7c3aed, 2, 20);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      buildDNA();
      buildChemistry();
      buildPhysics();

      switchModel('dna');
      animate();
    };

    const buildDNA = () => {
      const group = new THREE.Group();
      const sphereGeom = new THREE.SphereGeometry(0.2, 16, 16);
      const cyanMat = new THREE.MeshPhongMaterial({ color: 0x00f2fe, emissive: 0x004c59, shininess: 30 });
      const pinkMat = new THREE.MeshPhongMaterial({ color: 0xff007f, emissive: 0x610039, shininess: 30 });
      const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });

      const points = 26;
      const r = 2.4;
      const h = 8;

      for (let i = 0; i < points; i++) {
        const t = (i / points) * Math.PI * 4;
        const y = (i / points) * h - h / 2;

        const xA = r * Math.cos(t);
        const zA = r * Math.sin(t);
        const nodeA = new THREE.Mesh(sphereGeom, cyanMat);
        nodeA.position.set(xA, y, zA);
        group.add(nodeA);

        const xB = r * Math.cos(t + Math.PI);
        const zB = r * Math.sin(t + Math.PI);
        const nodeB = new THREE.Mesh(sphereGeom, pinkMat);
        nodeB.position.set(xB, y, zB);
        group.add(nodeB);

        const rungPoints = [new THREE.Vector3(xA, y, zA), new THREE.Vector3(xB, y, zB)];
        const rungGeom = new THREE.BufferGeometry().setFromPoints(rungPoints);
        const rung = new THREE.Line(rungGeom, lineMat);
        group.add(rung);
      }

      models.dna = group;
    };

    const buildChemistry = () => {
      const group = new THREE.Group();
      const geom = new THREE.IcosahedronGeometry(2.8, 1);
      
      const atomGeom = new THREE.SphereGeometry(0.16, 16, 16);
      const atomMat = new THREE.MeshPhongMaterial({ color: 0x7c3aed, emissive: 0x2d105e, shininess: 50 });

      const pos = geom.attributes.position;
      const vertices = [];
      const threshold = 0.01;

      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
        let duplicate = false;
        for (const uniqueV of vertices) {
          if (uniqueV.distanceTo(v) < threshold) {
            duplicate = true;
            break;
          }
        }
        if (!duplicate) {
          vertices.push(v);
        }
      }

      vertices.forEach(v => {
        const sphere = new THREE.Mesh(atomGeom, atomMat);
        sphere.position.copy(v);
        group.add(sphere);
      });

      const lineMat = new THREE.LineBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.4 });
      for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
          const d = vertices[i].distanceTo(vertices[j]);
          if (d > 1.2 && d < 2.2) {
            const rungGeom = new THREE.BufferGeometry().setFromPoints([vertices[i], vertices[j]]);
            const bond = new THREE.Line(rungGeom, lineMat);
            group.add(bond);
          }
        }
      }

      models.chem = group;
    };

    const buildPhysics = () => {
      const group = new THREE.Group();
      const nucleusGeom = new THREE.SphereGeometry(0.6, 32, 32);
      const nucleusMat = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x7c3aed, shininess: 100 });
      const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
      group.add(nucleus);

      const orbits = 3;
      const electronGeom = new THREE.SphereGeometry(0.14, 16, 16);
      const electronMat = new THREE.MeshPhongMaterial({ color: 0x00f2fe, emissive: 0x00363f, shininess: 80 });

      const orbitGroups = [];

      for (let i = 0; i < orbits; i++) {
        const orbitRing = new THREE.Group();
        orbitRing.rotation.x = (Math.random() - 0.5) * Math.PI;
        orbitRing.rotation.y = (Math.random() - 0.5) * Math.PI;

        const radius = 2.6 + i * 0.7;
        const ringGeom = new THREE.RingGeometry(radius - 0.015, radius + 0.015, 64);
        ringGeom.rotateX(Math.PI / 2);
        const ring = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.08 }));
        orbitRing.add(ring);

        const electron = new THREE.Mesh(electronGeom, electronMat);
        electron.userData = {
          angle: Math.random() * Math.PI * 2,
          speed: (0.02 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1),
          radius: radius
        };
        orbitRing.add(electron);

        group.add(orbitRing);
        orbitGroups.push(orbitRing);
      }

      group.userData = { orbitGroups };
      models.phys = group;
    };

    const switchModel = (name) => {
      if (currentModel) {
        scene.remove(currentModel);
      }
      currentModel = models[name];
      if (currentModel) {
        currentModel.scale.set(0.01, 0.01, 0.01);
        scene.add(currentModel);
        activeModelName = name;

        gsap.to(currentModel.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (currentModel) {
        if (activeModelName === 'dna') {
          currentModel.rotation.y += 0.007;
        } else if (activeModelName === 'chem') {
          currentModel.rotation.y += 0.004;
          currentModel.rotation.x += 0.002;
        } else if (activeModelName === 'phys') {
          currentModel.rotation.y += 0.002;
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

      if (controls) controls.update();
      renderer.render(scene, camera);
    };

    // Swapping trigger
    switchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetModel = btn.dataset.model;
        if (targetModel === activeModelName) return;

        switchBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        infoContents.forEach(info => info.classList.remove('active'));
        const activeInfo = document.getElementById(`info-${targetModel}`);
        if (activeInfo) activeInfo.classList.add('active');

        switchModel(targetModel);
        
        const label = btn.textContent.trim().split(' ').slice(1).join(' ');
        showToast(`Loaded ${label} blueprint`, true);
      });
    });

    window.addEventListener('resize', () => {
      if (!renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    initScene();

  } else {
    // ─── MOBILE/TABLET CONDITIONAL LIGHTWEIGHT FALLBACKS (NO WebGL) ───
    const loadMobileFallback = (name) => {
      activeModelName = name;
      container.innerHTML = ''; // Empty previous
      
      let htmlMarkup = '';

      if (name === 'dna') {
        htmlMarkup = `
          <div class="mobile-lab-fallback">
            <div class="fallback-visual-container">
              <div class="dna-fallback-spiral">
                ${Array.from({ length: 12 }, (_, i) => `<div class="dna-rung" style="--i: ${i};"></div>`).join('')}
              </div>
            </div>
          </div>
        `;
      } else if (name === 'chem') {
        htmlMarkup = `
          <div class="mobile-lab-fallback">
            <div class="fallback-visual-container">
              <svg viewBox="0 0 130 130" class="chem-fallback-svg">
                <!-- Inner bonds connection lines -->
                <line x1="65" y1="10" x2="20" y2="35" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="65" y1="10" x2="110" y2="35" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="20" y1="35" x2="15" y2="85" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="110" y1="35" x2="115" y2="85" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="15" y1="85" x2="65" y2="115" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="115" y1="85" x2="65" y2="115" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="65" y1="10" x2="65" y2="60" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="20" y1="35" x2="65" y2="60" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="110" y1="35" x2="65" y2="60" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="15" y1="85" x2="65" y2="60" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="115" y1="85" x2="65" y2="60" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                <line x1="65" y1="115" x2="65" y2="60" stroke="rgba(0, 242, 254, 0.25)" stroke-width="1.5" />
                
                <!-- Atom Node Spheres -->
                <circle cx="65" cy="10" r="5" fill="var(--primary-light)" />
                <circle cx="20" cy="35" r="5" fill="var(--accent-cyan)" />
                <circle cx="110" cy="35" r="5" fill="var(--accent-cyan)" />
                <circle cx="15" cy="85" r="5" fill="var(--accent-cyan)" />
                <circle cx="115" cy="85" r="5" fill="var(--accent-cyan)" />
                <circle cx="65" cy="115" r="5" fill="var(--primary-light)" />
                <circle cx="65" cy="60" r="6.5" fill="var(--accent-pink)" />
              </svg>
            </div>
          </div>
        `;
      } else if (name === 'phys') {
        htmlMarkup = `
          <div class="mobile-lab-fallback">
            <div class="fallback-visual-container">
              <div class="phys-fallback-atom">
                <div class="atom-nucleus"></div>
                <div class="atom-orbit atom-orbit-1"><div class="atom-electron"></div></div>
                <div class="atom-orbit atom-orbit-2"><div class="atom-electron"></div></div>
                <div class="atom-orbit atom-orbit-3"><div class="atom-electron"></div></div>
              </div>
            </div>
          </div>
        `;
      }

      container.innerHTML = htmlMarkup;
      
      // Animate fallback wrapper scale using lightweight GSAP tween
      gsap.fromTo(container.querySelector('.fallback-visual-container'), 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
      );
    };

    // Load initial DNA fallback on mobile
    loadMobileFallback('dna');

    // Switcher Click Handlers for Mobile
    switchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetModel = btn.dataset.model;
        if (targetModel === activeModelName) return;

        switchBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        infoContents.forEach(info => info.classList.remove('active'));
        const activeInfo = document.getElementById(`info-${targetModel}`);
        if (activeInfo) activeInfo.classList.add('active');

        loadMobileFallback(targetModel);
        
        const label = btn.textContent.trim().split(' ').slice(1).join(' ');
        showToast(`Swapped to ${label} graphic`, true);
      });
    });

    // Remove drag instruction hint on mobile
    const hint = document.querySelector('.canvas-hint');
    if (hint) {
      hint.textContent = 'Tap switchers to load graphics';
    }
  }
})();

// ─── NEBULA COSMOS BACKGROUND ANIMATION (Desktop Only) ───
(function initNebulaBackground() {
  if (!isDesktop) return;

  const canvas = document.getElementById('nebula-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, animId;
  let t = 0;

  // ── Resize handler ──
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Star field ──
  const STAR_COUNT = 280;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * 2000 - 1000,
    y: Math.random() * 2000 - 1000,
    r: Math.random() * 1.4 + 0.2,
    s: Math.random() * 0.6 + 0.2,      // shimmer speed
    p: Math.random() * Math.PI * 2,    // phase
  }));

  // ── Plasma / Nebula nodes ──
  const NODE_COUNT = 7;
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: 200 + Math.random() * 220,
    hue: [270, 195, 320, 240, 290, 180, 260][i],
    sat: 70 + Math.random() * 30,
    phase: Math.random() * Math.PI * 2,
  }));

  // ── Energy particles (fast tendrils) ──
  const PARTICLE_COUNT = 120;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => spawnParticle());

  function spawnParticle() {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.25 + Math.random() * 0.8;
    return {
      x: Math.random() * 2000 - 500,
      y: Math.random() * 2000 - 500,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: Math.random(),
      maxLife: 0.005 + Math.random() * 0.008,
      size: 0.5 + Math.random() * 1.5,
      hue: 200 + Math.random() * 140,
    };
  }

  // ── Aurora wave bands ──
  function drawAurora(t) {
    const bands = [
      { y: H * 0.15, hue: 270, amp: 60, freq: 0.0008, speed: 0.0003 },
      { y: H * 0.5,  hue: 195, amp: 80, freq: 0.0006, speed: 0.0004 },
      { y: H * 0.82, hue: 310, amp: 50, freq: 0.001,  speed: 0.0002 },
    ];

    bands.forEach(({ y, hue, amp, freq, speed }) => {
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= W; x += 4) {
        const wave = Math.sin(x * freq + t * speed * 2000) * amp
                   + Math.sin(x * freq * 2.3 + t * speed * 1700) * amp * 0.4;
        ctx.lineTo(x, y + wave);
      }
      ctx.lineTo(W, H + 200);
      ctx.lineTo(0, H + 200);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, y - amp - 30, 0, y + amp + 80);
      grad.addColorStop(0,   `hsla(${hue},85%,65%,0)`);
      grad.addColorStop(0.3, `hsla(${hue},85%,60%,0.035)`);
      grad.addColorStop(0.6, `hsla(${hue},75%,55%,0.025)`);
      grad.addColorStop(1,   `hsla(${hue},70%,40%,0)`);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }

  // ── Main render loop ──
  function render(ts) {
    animId = requestAnimationFrame(render);
    t = ts * 0.001;

    // Clear with very slight trail effect for motion blur
    ctx.fillStyle = 'rgba(5,4,14,0.18)';
    ctx.fillRect(0, 0, W, H);

    // 1) Nebula plasma blobs
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -300 || n.x > W + 300) n.vx *= -1;
      if (n.y < -300 || n.y > H + 300) n.vy *= -1;

      const pulse = Math.sin(t * 0.4 + n.phase) * 0.35 + 0.65;
      const r = n.radius * pulse;

      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
      g.addColorStop(0,   `hsla(${n.hue},${n.sat}%,60%,0.12)`);
      g.addColorStop(0.5, `hsla(${n.hue},${n.sat}%,45%,0.06)`);
      g.addColorStop(1,   `hsla(${n.hue},${n.sat}%,30%,0)`);

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // 2) Aurora waves
    drawAurora(t);

    // 3) Stars (shimmer)
    stars.forEach(s => {
      const alpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.s + s.p));
      const sx = ((s.x + W * 0.5 + t * 4) % W + W) % W;
      const sy = ((s.y + H * 0.5) % H + H) % H;
      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${alpha * 0.75})`;
      ctx.fill();
    });

    // 4) Energy particles / tendrils
    particles.forEach((p, i) => {
      p.life += p.maxLife;
      if (p.life >= 1) {
        particles[i] = spawnParticle();
        return;
      }

      // Flow toward nearest nebula node (gravity)
      let fx = 0, fy = 0;
      nodes.forEach(n => {
        const dx = n.x - p.x, dy = n.y - p.y;
        const d2 = dx * dx + dy * dy + 1;
        const f = 0.15 / d2;
        fx += dx * f;
        fy += dy * f;
      });
      p.vx += fx;
      p.vy += fy;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.x += p.vx;
      p.y += p.vy;

      // Life arc: fade in → bright → fade out
      const alpha = Math.sin(p.life * Math.PI) * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},90%,75%,${alpha})`;
      ctx.fill();
    });

    // 5) Subtle centre vignette gradient
    const vignette = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*1.0);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(2,2,10,0.55)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
  }

  // Start after a brief delay so splash screen plays first
  setTimeout(() => {
    canvas.classList.add('ready');
    requestAnimationFrame(render);
  }, 600);

  // Pause when tab is hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      requestAnimationFrame(render);
    }
  });
})();

console.log('%c⭐ Medkarma Conditional Setup Loaded Successfully', 'color:#00f2fe;font-weight:bold;font-size:14px;');
