/*====================================================
  PORTFOLIO JAVASCRIPT LOGIC
  Author: Md. Sagor Hossain (Full-Stack / MERN Developer)
====================================================*/

document.addEventListener('DOMContentLoaded', () => {
  // Select Elements
  const header = document.querySelector('.header');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const sections = document.querySelectorAll('section[id]');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const contactForm = document.getElementById('contact-form');
  const dynamicTextEl = document.querySelector('.hero-dynamic-text');
  const liveClockEl = document.getElementById('live-clock');

  /*===== 1. THEME TOGGLE (DARK / LIGHT MODE) =====*/
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'bx bx-moon';
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      themeIcon.className = 'bx bx-sun';
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  /*===== 2. MOBILE NAVIGATION DRAWER =====*/
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.innerHTML = isOpen ? '<i class="bx bx-x"></i>' : '<i class="bx bx-menu"></i>';
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        if (navToggle) {
          navToggle.innerHTML = '<i class="bx bx-menu"></i>';
        }
      }
    });
  });

  /*===== 3. HEADER SCROLL EFFECT & ACTIVE NAVIGATION SPY =====*/
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header shadow on scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active Section Spy
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  /*===== 4. DYNAMIC TYPING TEXT EFFECT (HERO) =====*/
  if (dynamicTextEl) {
    const roles = [
      'Software Engineer',
      'Actively Looking for New Opportunities',
      'Ex-DevXHub Software Engineer',
      'React.js & TypeScript Specialist',
      'Redux Toolkit & State Architect',
      'Available for Immediate Join'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        dynamicTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        dynamicTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // pause before typing next
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  /*===== 5. PROJECT CATEGORY FILTER =====*/
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /*===== 6. ONE-CLICK EMAIL COPY & TOAST NOTIFICATION =====*/
  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'mdsagorhossain4878@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) {
      toastMessage.textContent = message;
    }
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  /*===== 7. CONTACT FORM HANDLER =====*/
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const subject = document.getElementById('subject')?.value || 'New Project Inquiry';
      const message = document.getElementById('message')?.value || '';

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Generate mailto link for direct reliable dispatch
      const mailtoLink = `mailto:mdsagorhossain4878@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${subject} from ${name}`
      )}&body=${encodeURIComponent(
        `Hi Md. Sagor Hossain,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
      )}`;

      window.location.href = mailtoLink;
      showToast('Opening your email client to send message! Thank you.');
      contactForm.reset();
    });
  }

  /*===== 8. REAL-TIME BANGLADESH & TIMEZONE CLOCK =====*/
  function updateLiveClock() {
    if (!liveClockEl) return;
    try {
      const now = new Date();
      // Format time in Dhaka (GMT+6)
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      liveClockEl.textContent = `${timeString} (GMT+6)`;
    } catch (err) {
      liveClockEl.textContent = 'GMT+6 (Dhaka)';
    }
  }

  updateLiveClock();
  setInterval(updateLiveClock, 1000);
});