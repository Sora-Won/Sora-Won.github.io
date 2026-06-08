/* ============================================================
   SORA WON — Portfolio JS
   ============================================================ */

   (() => {
    'use strict';
  
    // ─── CUSTOM CURSOR ───
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
  
    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
  
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    });
  
    function animateCursor() {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.left = curX + 'px';
      cursor.style.top  = curY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  
    // Scale cursor on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .proj-card, .skill-block, .exp-item');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursor.style.borderColor = 'rgba(200,184,138,0.5)';
        cursor.style.background = 'rgba(200,184,138,0.05)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = 'var(--accent)';
        cursor.style.background = 'transparent';
      });
    });
  
    // ─── NAVBAR SCROLL EFFECT ───
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  
    // ─── MOBILE MENU ───
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;
  
    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      const spans = menuBtn.querySelectorAll('span');
      if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.transform = '';
      }
    });
  
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        menuBtn.querySelectorAll('span').forEach(s => s.style.transform = '');
      });
    });
  
    // ─── SCROLL REVEAL ───
    const fadeEls = document.querySelectorAll(
      '.section-label, .about-headline, .about-content, .skill-block, ' +
      '.exp-item, .proj-card, .contact-headline, .contact-details, ' +
      '.section-title, .skills-section, .hero-tag, .hero-role'
    );
  
    fadeEls.forEach(el => el.classList.add('fade-up'));
  
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
  
    fadeEls.forEach(el => observer.observe(el));
  
    // ─── STAGGERED REVEAL FOR GRIDS ───
    function staggerChildren(parent, selector, delay = 100) {
      const children = parent.querySelectorAll(selector);
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * delay}ms`;
      });
    }
  
    staggerChildren(document.querySelector('.skills-grid'), '.skill-block', 80);
    staggerChildren(document.querySelector('.proj-grid'), '.proj-card', 100);
    staggerChildren(document.querySelector('.hero-skills-float'), 'span', 60);
  
    // ─── HERO TEXT ANIMATION ───
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
      heroName.style.opacity = '0';
      heroName.style.transform = 'translateY(20px)';
      setTimeout(() => {
        heroName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroName.style.opacity = '1';
        heroName.style.transform = 'translateY(0)';
      }, 200);
    }
  
    // ─── SMOOTH ANCHOR SCROLLING WITH OFFSET ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = document.getElementById('nav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  
    // ─── ACTIVE NAV LINK ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
  
    function updateActiveNav() {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      });
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + current
          ? 'var(--text)'
          : '';
      });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  
    // ─── YEAR AUTO-UPDATE ───
    const yearEls = document.querySelectorAll('.year');
    const year = new Date().getFullYear();
    yearEls.forEach(el => el.textContent = year);
  
  })();