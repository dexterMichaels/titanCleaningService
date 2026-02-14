/* ============================================
   TITAN CLEANING SERVICE — Main JavaScript
   Mobile nav, sticky header, scroll animations,
   FAQ accordions, contact form, lazy map
   ============================================ */

(function () {
  'use strict';

  // --- Sticky Header Shadow ---
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile Navigation ---
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Scroll Animations (IntersectionObserver) ---
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // --- FAQ Accordions ---
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      // Close all FAQ items in the same list
      const faqList = item.closest('.faq-list');
      if (faqList) {
        faqList.querySelectorAll('.faq-item.open').forEach(openItem => {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
      }

      // Toggle clicked item
      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Contact Form (Formspree) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('form-success');
      const errorMsg = document.getElementById('form-error');

      // Hide previous messages
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';

      // Check honeypot
      const hp = contactForm.querySelector('input[name="_gotcha"]');
      if (hp && hp.value) return;

      // Disable button
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.classList.add('success');
          }
          contactForm.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        if (errorMsg) {
          errorMsg.style.display = 'block';
          errorMsg.classList.add('error');
        }
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // --- Lazy Map Loading ---
  const mapPlaceholders = document.querySelectorAll('.map-placeholder');
  if (mapPlaceholders.length > 0 && 'IntersectionObserver' in window) {
    const mapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const placeholder = entry.target;
            const iframe = document.createElement('iframe');
            iframe.src = placeholder.dataset.src;
            iframe.width = '100%';
            iframe.height = placeholder.dataset.height || '400';
            iframe.style.border = '0';
            iframe.loading = 'lazy';
            iframe.referrerPolicy = 'no-referrer-when-downgrade';
            iframe.setAttribute('allowfullscreen', '');
            iframe.title = 'Google Maps - Titan Cleaning Service Area';
            placeholder.replaceWith(iframe);
            mapObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '200px' }
    );

    mapPlaceholders.forEach(el => mapObserver.observe(el));
  }

  // --- Active Navigation Highlight ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath.endsWith('/') && href === currentPath.slice(0, -1))) {
      link.classList.add('active');
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- $50 Off Coupon Popup ---
  (function initCouponPopup() {
    var DELAY_MS = 5000;

    // Build popup HTML
    var overlay = document.createElement('div');
    overlay.className = 'coupon-overlay';
    overlay.innerHTML =
      '<div class="coupon-popup">' +
        '<button class="coupon-close" aria-label="Close coupon">&times;</button>' +
        '<div class="coupon-popup-header">' +
          '<div class="coupon-amount">$50 OFF</div>' +
          '<div class="coupon-label">Your First Cleaning</div>' +
        '</div>' +
        '<div class="coupon-popup-body">' +
          '<p>New customers get <strong>$50 off</strong> any cleaning service. Mention this code when you call or include it in your quote request.</p>' +
          '<div class="coupon-code">TITAN50</div>' +
          '<a href="/pages/contact.html" class="btn btn-primary btn-lg coupon-cta">Claim Your $50 Off</a>' +
          '<p class="coupon-fine">Valid for new customers. One use per household. Cannot be combined with other offers.</p>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    function closeCoupon() {
      overlay.classList.remove('active');
    }

    // Close button
    overlay.querySelector('.coupon-close').addEventListener('click', closeCoupon);

    // Click outside popup
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeCoupon();
    });

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeCoupon();
    });

    // Show after delay
    setTimeout(function () {
      overlay.classList.add('active');
    }, DELAY_MS);
  })();

})();
