const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.textContent = '☰';
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.textContent = '☰';
        }
    });
}

const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

if (sections.length > 0 && navItems.length > 0) {
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

const skillCards = document.querySelectorAll('.skill-card');

if (skillCards.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.add('visible');

                const fills = card.querySelectorAll('.fill');
                fills.forEach((fill, index) => {
                    const width = fill.getAttribute('data-width');
                    if (width) {
                        setTimeout(() => {
                            fill.style.width = width + '%';
                        }, 150 + (index * 100));
                    }
                });

                skillObserver.unobserve(card);
            }
        });
    }, { 
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px'
    });

    skillCards.forEach(card => skillObserver.observe(card));
}

const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length > 0) {
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const delay = parseInt(card.getAttribute('data-delay')) || 0;

                setTimeout(() => {
                    card.classList.add('visible');
                }, delay);

                projectObserver.unobserve(card);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    projectCards.forEach(card => projectObserver.observe(card));
}

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = this.querySelector('button[type="submit"]') || 
                    this.querySelector('input[type="submit"]');
        
        if (!btn) return;

        const originalText = btn.textContent || btn.value;
        const originalHTML = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        btn.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';

        setTimeout(() => {
            btn.innerHTML = '✓ Message envoyé !';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            this.reset();

            setTimeout(() => {
                btn.innerHTML = originalHTML || originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);

        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const avatarImages = document.querySelectorAll('.about-card .avatar img');

    if (avatarImages.length > 0) {
        let overlay = null;
        let closeHandler = null;
        let keyHandler = null;

        avatarImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation();

                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'img-overlay';
                    overlay.innerHTML = `
                        <div class="img-frame">
                            <img src="" alt="Agrandissement" />
                            <button class="img-close" aria-label="Fermer">✕</button>
                        </div>
                    `;
                    document.body.appendChild(overlay);

                    overlay.addEventListener('click', function(e) {
                        if (e.target === overlay) {
                            closeOverlay();
                        }
                    });

                    const closeBtn = overlay.querySelector('.img-close');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            closeOverlay();
                        });
                    }
                }

                const overlayImg = overlay.querySelector('img');
                if (overlayImg) {
                    overlayImg.src = this.src;
                    overlayImg.alt = this.alt || 'Agrandissement';
                }

                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';

                function closeOverlay() {
                    if (overlay) {
                        overlay.classList.remove('open');
                        document.body.style.overflow = '';
                    }
                    if (keyHandler) {
                        document.removeEventListener('keydown', keyHandler);
                        keyHandler = null;
                    }
                }

                if (keyHandler) {
                    document.removeEventListener('keydown', keyHandler);
                }
                keyHandler = function(e) {
                    if (e.key === 'Escape') {
                        closeOverlay();
                    }
                };
                document.addEventListener('keydown', keyHandler);

                closeHandler = closeOverlay;
            });
        });

        window.addEventListener('beforeunload', function() {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            if (keyHandler) {
                document.removeEventListener('keydown', keyHandler);
            }
        });
    }
});

console.log('✅ DevCrew - Script chargé avec succès !');

if ('IntersectionObserver' in window) {
    console.log('✅ IntersectionObserver supporté');
} else {
    console.warn('⚠️ IntersectionObserver non supporté - fallback activé');
    document.querySelectorAll('.skill-card, .project-card, .reveal').forEach(el => {
        el.classList.add('visible');
    });
        }
