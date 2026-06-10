/* ===== SKY FOODS - JavaScript Enhancements ===== */

/* ---- 1. Navbar: scroll shadow + hide/show on scroll ---- */
(function () {
  const header = document.querySelector('.header');
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.style.boxShadow = y > 10
      ? '0 4px 20px rgba(0,0,0,0.12)'
      : '0 2px 10px rgba(0,0,0,0.05)';
    header.style.transform = (y > lastY && y > 80)
      ? 'translateY(-100%)'
      : 'translateY(0)';
    header.style.transition = 'transform 0.35s ease, box-shadow 0.3s ease';
    lastY = y;
  });
})();


/* ---- 2. Smooth scroll for nav anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ---- 3. Scroll-reveal animation (Intersection Observer) ---- */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal-left.visible { opacity: 1; transform: translateX(0); }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.feature-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 80}ms`;
  });

  document.querySelectorAll('.description, .features-title').forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
})();


/* ---- 4. Search: live input glow + Enter key submit ---- */
(function () {
  const input = document.getElementById('search');
  const btn = document.querySelector('.search-section button');
  if (!input || !btn) return;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
  });

  btn.addEventListener('click', () => {
    const query = input.value.trim();
    const loc = document.querySelector('.search-section select')?.value;
    if (!query) {
      input.style.borderColor = '#E23744';
      input.style.animation = 'shake 0.4s ease';
      input.focus();
      setTimeout(() => {
        input.style.borderColor = '';
        input.style.animation = '';
      }, 1000);
      return;
    }
    showToast(`🔍 Searching "${query}"${loc ? ' in ' + loc : ''}…`);
  });

  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%,100%{transform:translateX(0)}
      25%{transform:translateX(-6px)}
      75%{transform:translateX(6px)}
    }
  `;
  document.head.appendChild(shakeStyle);
})();


/* ---- 5. Toast notification system ---- */
function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      display: flex; flex-direction: column; gap: 10px;
    `;
    document.body.appendChild(container);
  }

  const colors = { info: '#E23744', success: '#2ecc71', warning: '#f39c12' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #1c1c1c; color: #fff; padding: 14px 20px;
    border-radius: 12px; font-size: 0.95rem; font-family: inherit;
    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
    border-left: 4px solid ${colors[type] || colors.info};
    opacity: 0; transform: translateX(60px);
    transition: all 0.35s cubic-bezier(.175,.885,.32,1.275);
    max-width: 320px; cursor: pointer;
  `;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(0)';
    });
  });

  const dismiss = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px)';
    setTimeout(() => toast.remove(), 350);
  };

  toast.addEventListener('click', dismiss);
  setTimeout(dismiss, duration);
}
window.showToast = showToast;


/* ---- 6. Feature card icon — pulse on hover ---- */
(function () {
  const pulse = document.createElement('style');
  pulse.textContent = `
    .feature-icon { cursor: default; display: inline-block; transition: transform 0.3s ease; }
    .feature-card:hover .feature-icon { transform: scale(1.2) rotate(-5deg); }
  `;
  document.head.appendChild(pulse);
})();


/* ---- 7. Footer links — ripple click effect ---- */
(function () {
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .footer-section div, .footer-section a {
      position: relative; overflow: hidden; cursor: pointer;
      border-radius: 4px; padding: 2px 4px; margin-left: -4px;
    }
    .ripple-effect {
      position: absolute; border-radius: 50%;
      background: rgba(226,55,68,0.25);
      transform: scale(0); animation: ripple 0.5s linear;
      pointer-events: none;
    }
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('.footer-section div, .footer-section a').forEach(el => {
    el.addEventListener('click', e => {
      const r = document.createElement('span');
      const size = Math.max(el.offsetWidth, el.offsetHeight);
      const rect = el.getBoundingClientRect();
      r.className = 'ripple-effect';
      r.style.cssText = `width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;`;
      el.appendChild(r);
      setTimeout(() => r.remove(), 600);

      if (!el.href || el.href === '#') {
        e.preventDefault();
        showToast(`"${el.textContent.trim()}" — coming soon!`, 'info', 2000);
      }
    });
  });
})();


/* ---- 8. Hero title: animated typewriter subtitle ---- */
(function () {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;

  const phrases = [
    'Discover the best food & drinks near you',
    'Hot meals delivered to your doorstep',
    'Exclusive deals from top restaurants',
    'Order in minutes, eat in joy 🍕',
  ];

  let pIdx = 0, cIdx = 0, deleting = false;
  subtitle.textContent = '';

  function type() {
    const current = phrases[pIdx];
    if (!deleting) {
      subtitle.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      subtitle.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 40 : 70);
  }

  setTimeout(type, 800);

  const cursorStyle = document.createElement('style');
  cursorStyle.textContent = `
    .hero-subtitle::after {
      content: '|'; animation: blink 0.7s infinite;
      color: #E23744; margin-left: 2px;
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  `;
  document.head.appendChild(cursorStyle);
})();


/* ---- 9. Scroll-to-top button ---- */
(function () {
  const btn = document.createElement('button');
  btn.innerHTML = '&#8679;';
  btn.title = 'Back to top';
  btn.style.cssText = `
    position: fixed; bottom: 80px; right: 24px; z-index: 999;
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, #E23744, #FF6B6B);
    color: #fff; border: none; font-size: 1.4rem;
    cursor: pointer; opacity: 0; pointer-events: none;
    transition: opacity 0.3s, transform 0.3s;
    box-shadow: 0 4px 15px rgba(226,55,68,0.4);
  `;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btn.style.opacity = show ? '1' : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1) translateY(-2px)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1) translateY(0)');
})();


/* ---- 10. Active nav link highlight based on scroll section ---- */
(function () {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav a');

  const highlightStyle = document.createElement('style');
  highlightStyle.textContent = `.nav a.active { color: #E23744 !important; }
    .nav a.active::after { width: 100% !important; }`;
  document.head.appendChild(highlightStyle);

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
})();


/* ---- 11. Page load progress bar ---- */
(function () {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; width: 0%;
    background: linear-gradient(90deg, #E23744, #FF6B6B);
    z-index: 99999; transition: width 0.3s ease, opacity 0.5s ease;
  `;
  document.body.prepend(bar);
  bar.style.width = '70%';
  window.addEventListener('load', () => {
    bar.style.width = '100%';
    setTimeout(() => { bar.style.opacity = '0'; }, 400);
  });
})();


/* ---- 12. Counter animation for stats/numbers if any ---- */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString();
    if (start >= target) clearInterval(timer);
  }, 16);
}
window.animateCounter = animateCounter;