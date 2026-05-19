/* ========================================
   AIRSTREAM RV - MAIN JAVASCRIPT
   Version: 1.0.0
   ======================================== */

'use strict';

/* ========================================
   1. THEME TOGGLE
   ======================================== */
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('rv-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    this.apply(theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('rv-theme', theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
      }
    });
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    this.apply(current === 'dark' ? 'light' : 'dark');
  }
};

/* ========================================
   2. RTL TOGGLE
   ======================================== */
const RTLManager = {
  init() {
    const saved = localStorage.getItem('rv-direction');
    if (saved) this.apply(saved);
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  apply(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('rv-direction', dir);
    document.querySelectorAll('[data-rtl-toggle]').forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = dir === 'rtl' ? 'ri-layout-right-2-line' : 'ri-layout-left-2-line';
      }
    });
  },

  toggle() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    this.apply(current === 'rtl' ? 'ltr' : 'rtl');
  }
};

/* ========================================
   3. HEADER / HAMBURGER MENU
   ======================================== */
const HeaderManager = {
  init() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    // Scroll effect
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
      });
    }

    // Hamburger toggle
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
      });

      // Close on link click
      mobileNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    // Active link highlight
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === currentPath || link.getAttribute('href') === currentPath.split('/').pop()) {
        link.classList.add('active');
      }
    });
  }
};

/* ========================================
   4. SCROLL ANIMATIONS
   ======================================== */
const ScrollAnimations = {
  init() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }
};

/* ========================================
   5. COUNTER ANIMATION
   ======================================== */
const CounterAnimation = {
  init() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  },

  animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();

    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
};

/* ========================================
   6. SERVICE COST CALCULATOR
   ======================================== */
const Calculator = {
  init() {
    const calc = document.getElementById('service-calculator');
    if (!calc) return;

    const inputs = calc.querySelectorAll('input[type="range"], select');
    inputs.forEach(input => input.addEventListener('input', () => this.calculate()));
    this.calculate();
  },

  calculate() {
    const rvType = document.getElementById('calc-rv-type');
    const renovationLevel = document.getElementById('calc-level');
    const sqft = document.getElementById('calc-sqft');
    const timeline = document.getElementById('calc-timeline');
    const priceEl = document.getElementById('calc-estimate');

    if (!priceEl) return;

    // Base prices
    const baseprices = { airstream: 15000, travel: 8000, class_a: 25000, class_b: 12000, fifth: 18000 };
    const levelMultipliers = { basic: 1, standard: 1.8, premium: 2.8, luxury: 4.2 };
    const timelineBonus = { standard: 1, rush: 1.35, flexible: 0.95 };

    const base = rvType ? (baseprices[rvType.value] || 15000) : 15000;
    const levelMult = renovationLevel ? (levelMultipliers[renovationLevel.value] || 1.8) : 1.8;
    const sqftValue = sqft ? parseInt(sqft.value) : 200;
    const timelineVal = timeline ? (timelineBonus[timeline.value] || 1) : 1;

    // Update range display
    if (sqft) {
      const sqftDisplay = document.getElementById('sqft-display');
      if (sqftDisplay) sqftDisplay.textContent = sqftValue + ' sq ft';
    }

    const estimate = Math.round((base * levelMult * (sqftValue / 200) * timelineVal) / 100) * 100;
    const min = Math.round(estimate * 0.85 / 100) * 100;
    const max = Math.round(estimate * 1.15 / 100) * 100;

    if (priceEl) {
      priceEl.textContent = '$' + min.toLocaleString() + ' – $' + max.toLocaleString();
    }
  }
};

/* ========================================
   7. FORM VALIDATION
   ======================================== */
const FormValidator = {
  rules: {
    required: (val) => val.trim() !== '' || 'This field is required',
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Please enter a valid email',
    password: (val) => val.length >= 8 || 'Password must be at least 8 characters',
    phone: (val) => /^[\d\s\-\+\(\)]{10,}$/.test(val) || 'Please enter a valid phone number',
  },

  init() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => this.clearError(field));
      });
    });
  },

  validateForm(form) {
    let valid = true;
    form.querySelectorAll('[data-rules]').forEach(field => {
      if (!this.validateField(field)) valid = false;
    });
    return valid;
  },

  validateField(field) {
    const rules = (field.getAttribute('data-rules') || '').split(',');
    for (const rule of rules) {
      const fn = this.rules[rule.trim()];
      if (!fn) continue;
      const result = fn(field.type === 'checkbox' ? (field.checked ? 'checked' : '') : field.value);
      if (result !== true) {
        this.showError(field, result);
        return false;
      }
    }
    this.clearError(field);
    return true;
  },

  showError(field, msg) {
    field.classList.add('error');
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('visible');
    }
  },

  clearError(field) {
    field.classList.remove('error');
    const errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) errorEl.classList.remove('visible');
  }
};

/* ========================================
   8. FILE UPLOAD
   ======================================== */
const FileUpload = {
  init() {
    document.querySelectorAll('.file-upload').forEach(dropzone => {
      const input = dropzone.querySelector('input[type="file"]');
      const label = dropzone.querySelector('.file-label');

      dropzone.addEventListener('click', () => input && input.click());
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--color-accent)';
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = '';
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '';
        if (e.dataTransfer.files.length && input) {
          input.files = e.dataTransfer.files;
          this.updateLabel(label, e.dataTransfer.files);
        }
      });

      if (input) {
        input.addEventListener('change', () => this.updateLabel(label, input.files));
      }
    });
  },

  updateLabel(label, files) {
    if (!label || !files.length) return;
    label.textContent = files.length === 1 ? files[0].name : files.length + ' files selected';
  }
};

/* ========================================
   9. COUNTDOWN TIMER
   ======================================== */
const CountdownTimer = {
  init() {
    const el = document.getElementById('countdown');
    if (!el) return;

    const targetDate = new Date(el.getAttribute('data-target') || '2025-12-31T00:00:00');

    const update = () => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) { el.innerHTML = '<p>We\'re Live!</p>'; return; }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      ['days', 'hours', 'mins', 'secs'].forEach((unit, i) => {
        const numEl = el.querySelector(`[data-unit="${unit}"]`);
        if (numEl) numEl.textContent = [days, hours, mins, secs][i].toString().padStart(2, '0');
      });
    };

    update();
    setInterval(update, 1000);
  }
};

/* ========================================
   10. SKELETON LOADER SIMULATION
   ======================================== */
const SkeletonLoader = {
  init() {
    document.querySelectorAll('[data-skeleton]').forEach(container => {
      setTimeout(() => {
        container.querySelectorAll('.skeleton-card').forEach(card => {
          card.style.display = 'none';
        });
        container.querySelectorAll('[data-skeleton-content]').forEach(content => {
          content.style.display = '';
          content.classList.add('animated');
        });
      }, 1500);
    });
  }
};

/* ========================================
   11. SMOOTH SCROLL
   ======================================== */
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      });
    });
  }
};

/* ========================================
   12. NOTIFICATION TOAST
   ======================================== */
const Toast = {
  show(message, type = 'success', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="ri-${type === 'success' ? 'checkbox-circle' : type === 'error' ? 'error-warning' : 'information'}-line"></i>
      <span>${message}</span>
      <button onclick="this.parentElement.remove()"><i class="ri-close-line"></i></button>
    `;

    Object.assign(toast.style, {
      position: 'fixed', bottom: '24px', right: '24px', zIndex: '9999',
      background: type === 'success' ? '#1a7a3c' : type === 'error' ? '#c0392b' : '#2471a3',
      color: 'white', padding: '14px 20px', borderRadius: '10px',
      display: 'flex', alignItems: 'center', gap: '10px',
      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      animation: 'fadeInUp 0.3s ease', maxWidth: '400px'
    });

    document.body.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, duration);
  }
};

/* ========================================
   13. FORM SUBMIT HANDLERS
   ======================================== */
const FormHandlers = {
  init() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Toast.show('Message sent successfully! We\'ll contact you within 24 hours.', 'success');
        contactForm.reset();
      });
    }

    // Newsletter form
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        Toast.show('You\'ve been subscribed to our newsletter!', 'success');
        form.reset();
      });
    });

    // Auth forms
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Toast.show('Login functionality requires backend integration.', 'info');
      });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('reg-password');
        const confirm = document.getElementById('reg-confirm');
        if (password && confirm && password.value !== confirm.value) {
          Toast.show('Passwords do not match.', 'error');
          return;
        }
        const terms = document.getElementById('terms');
        if (terms && !terms.checked) {
          Toast.show('Please accept the terms and conditions.', 'error');
          return;
        }
        Toast.show('Registration requires backend integration.', 'info');
      });
    }

    // Booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Toast.show('Consultation booked! Check your email for confirmation.', 'success');
        bookingForm.reset();
      });
    }
  }
};

/* ========================================
   14. BACK TO TOP BUTTON
   ======================================== */
const BackToTop = {
  init() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    btn.setAttribute('aria-label', 'Back to top');
    Object.assign(btn.style, {
      position: 'fixed', bottom: '80px', right: '24px', zIndex: '999',
      width: '44px', height: '44px', borderRadius: '50%',
      background: 'var(--color-accent)', color: 'white',
      border: 'none', cursor: 'pointer', fontSize: '1.1rem',
      boxShadow: '0 4px 16px rgba(196,122,44,0.4)',
      opacity: '0', pointerEvents: 'none', transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    });

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      const show = window.scrollY > 400;
      btn.style.opacity = show ? '1' : '0';
      btn.style.pointerEvents = show ? 'auto' : 'none';
    });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
};

/* ========================================
   15. ACCORDION
   ======================================== */
const AccordionManager = {
  init() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close other items in the same accordion
        const accordion = item.parentElement;
        accordion.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
        header.setAttribute('aria-expanded', !isActive);
      });
    });
  }
};

/* ========================================
   16. INIT ALL
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  RTLManager.init();
  HeaderManager.init();
  ScrollAnimations.init();
  CounterAnimation.init();
  Calculator.init();
  FormValidator.init();
  FileUpload.init();
  CountdownTimer.init();
  SkeletonLoader.init();
  SmoothScroll.init();
  FormHandlers.init();
  BackToTop.init();
  AccordionManager.init();

  // Page specific inits
});
