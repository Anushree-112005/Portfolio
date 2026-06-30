document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       MOBILE MENU NAVIGATION
       ========================================== */
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================
       DARK / LIGHT THEME TOGGLE
       ========================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or system default
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    /* ==========================================
       HEADER SCROLL EFFECT & BACK TO TOP BUTTON
       ========================================== */
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Header shrink
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to Top button visibility
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================
       HERO DYNAMIC TYPING EFFECT
       ========================================== */
    const typingSpan = document.querySelector('.typing-text');
    const roles = [
        'Aspiring Software Engineer', 
        'Full-Stack Developer', 
        'AI & Tracking Enthusiast'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingSpan) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove character
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Add character
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Typing pace
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Full string typed, pause before delete
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, transition to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Small break before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing loop
    setTimeout(typeEffect, 1000);

    /* ==========================================
       PROJECTS FILTERING SYSTEM
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Add transitional scaling/fade effect
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        // Trigger fade in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Initialize all project cards styling for animation transition support
    projectCards.forEach(card => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    /* ==========================================
       SCROLL-TRIGGERED REVEAL ANIMATIONS
       ========================================== */
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once visual is active, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        revealOnScrollObserver.observe(reveal);
    });

    /* ==========================================
       ACTIVE NAV LINK SELECTION ON SCROLL
       ========================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Adjust threshold offset for activation
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       CONTACT FORM SUBMISSION HANDLER
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form fields
            const nameInput = document.getElementById('form-name').value.trim();
            const emailInput = document.getElementById('form-email').value.trim();
            const subjectInput = document.getElementById('form-subject').value.trim();
            const messageInput = document.getElementById('form-message').value.trim();
            
            // Submit feedback visually
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate server-side post latency
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
                
                // Show success status
                formStatus.textContent = `Thank you, ${nameInput}! Your message has been sent successfully. Anushree will respond shortly.`;
                formStatus.className = 'form-message-status success';
                
                // Reset fields
                contactForm.reset();
                
                // Clear success notification after delay
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-message-status';
                }, 6000);
            }, 1500);
        });
    }
});
