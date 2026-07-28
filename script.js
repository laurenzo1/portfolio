const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            card.classList.add('visible');
            const fills = card.querySelectorAll('.fill');
            fills.forEach(fill => {
                const width = fill.getAttribute('data-width');
                if (width) {
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, 150);
                }
            });
        }
    });
}, { threshold: 0.25 });
skillCards.forEach(card => skillObserver.observe(card));
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const delay = parseInt(card.getAttribute('data-delay')) || 0;
            setTimeout(() => {
                card.classList.add('visible');
            }, delay);
        }
    });
}, { threshold: 0.2 });
projectCards.forEach(card => projectObserver.observe(card));
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('input[type="submit"]');
    const original = btn.value;
    btn.value = '✓ Envoyé !';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    setTimeout(() => {
        btn.value = original;
        btn.style.background = '';
        this.reset();
    }, 2500);
});
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.about-card .avatar img').forEach(img => {
    img.addEventListener('click', () => {
      let overlay = document.querySelector('.img-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'img-overlay';
        overlay.innerHTML = `
          <div class="img-frame">
            <img alt="Agrandissement" />
            <button class="img-close" aria-label="Fermer">×</button>
          </div>
        `;
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) closeOverlay();
        });

        overlay.querySelector('.img-close').addEventListener('click', closeOverlay);
      }

      overlay.querySelector('img').src = img.src;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden'; 
      
      function onKey(e) {
        if (e.key === 'Escape') closeOverlay();
      }
      document.addEventListener('keydown', onKey);

      function closeOverlay() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKey);
      }
    });
  });
});
