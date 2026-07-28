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