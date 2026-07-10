// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
        navMenu.style.display = isOpen ? 'flex' : 'none';
    });

    // Initialize nav menu as hidden on mobile
    if (window.innerWidth <= 968) {
        navMenu.style.display = 'none';
    }
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
            navMenu.style.display = 'none';
        }
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar && navbar.classList.add('scrolled');
    } else {
        navbar && navbar.classList.remove('scrolled');
    }
}, { passive: true });

// Flip Text Animation - Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Show sidebar icons after 1.5 seconds
    setTimeout(() => {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (sidebarNav) {
            sidebarNav.classList.add('visible');
        }
    }, 1500);

    const flipTextElement = document.getElementById('flipText');

    if (flipTextElement) {
        const words = [
            'Storyteller',
            'Journalist',
            'Communicator',
            'Strategist',
            'Reporter',
            'Innovator',
        ];

        let currentIndex = 0;

        function flipText() {
            currentIndex = (currentIndex + 1) % words.length;
            flipTextElement.style.animation = 'none';
            
            setTimeout(() => {
                flipTextElement.textContent = words[currentIndex];
                flipTextElement.style.animation = 'flipAnimation 0.6s ease-in-out';
            }, 50);
        }

        // Change word every 2.5 seconds
        setInterval(flipText, 2500);
    } else {
        console.log('flipText element not found!');
    }
});

// Sidebar Navigation
const sidebarIcons = document.querySelectorAll('.sidebar-icon');

sidebarIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const category = icon.getAttribute('data-category');
        const target = icon.getAttribute('data-target');

        if (target === 'about') {
            // Scroll to about section
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
            
            // Remove active from all icons
            sidebarIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
        } else if (category) {
            // Trigger category filter
            const targetTab = document.querySelector(`.tab[data-category="${category}"]`);
            if (targetTab) {
                targetTab.click();
                
                // Scroll to work section
                window.scrollTo({ top: document.querySelector('.work-section').offsetTop - 100, behavior: 'smooth' });
                
                // Update active state
                sidebarIcons.forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
            }
        }
    });
});

// Category Filtering
const tabs = document.querySelectorAll('.tab');
const projects = document.querySelectorAll('.project-card');
const projectsGrid = document.querySelector('.projects-grid'); 

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');

        // Filter projects by category
        projects.forEach(project => {
            if (project.classList.contains(category)) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
    });
});

// Auto-trigger "AI+Research" filter on page load
document.addEventListener('DOMContentLoaded', function() {
    const airesearchTab = document.querySelector('.tab[data-category="ai-research"]');
    if (aiResearchTab) {
        aiResearchTab.click();
    }
});

// "Check Other Work Here" button functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-link')) {
        const category = e.target.getAttribute('data-category');
        const categoryTab = document.querySelector(`.tab[data-category="${category}"]`);
        if (categoryTab) {
            categoryTab.click();
            window.scrollTo({ top: document.querySelector('.work-section').offsetTop - 100, behavior: 'smooth' });
        }
    }
});

// Copy to Clipboard Functionality
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const contactItem = button.closest('.contact-item');
        const textToCopy = contactItem.querySelector('p').textContent;

        navigator.clipboard.writeText(textToCopy).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });
});

// Smooth Scroll with Offset for Fixed Nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
projects.forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'translateY(20px)';
    project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(project);
});

// Mobile Menu Bottom Navigation
const mobileMenuItems = document.querySelectorAll('.menu-item');

mobileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        const target = item.getAttribute('data-target');

        // Update active state
        mobileMenuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        if (target === 'about') {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        } else if (category) {
            const targetTab = document.querySelector(`.tab[data-category="${category}"]`);
            if (targetTab) {
                targetTab.click();
                window.scrollTo({ top: document.querySelector('.work-section').offsetTop - 80, behavior: 'smooth' });
            }
        }
    });
});

// Update sidebar active state based on scroll position
window.addEventListener('scroll', () => {
    // Sidebar icons are no longer in use (replaced by cat-drawer)
    // This listener is kept as a no-op for compatibility
});

// Add active state to navbar on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Video play button functionality (if videos are embedded)
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', () => {
        // Add your video play logic here
        alert('Video player would open here');
    });
     });

    // Impact Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all impact buttons
    const impactButtons = document.querySelectorAll('.impact-btn');
    const modals = document.querySelectorAll('.impact-modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open modal when button is clicked
    impactButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const modal = document.getElementById(`modal-${projectId}`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal when X is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.impact-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    });

    // Close modal when clicking outside the content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });
});
console.log('Portfolio website loaded successfully!');

// ============================================
// CATEGORY DRAWER (top-left hamburger)
// ============================================
(function () {
    const catToggle   = document.getElementById('catToggle');
    const catDrawer   = document.getElementById('catDrawer');
    const catOverlay  = document.getElementById('catDrawerOverlay');
    const catClose    = catDrawer && catDrawer.querySelector('.cat-drawer-close');
    const catItems    = catDrawer ? catDrawer.querySelectorAll('.cat-drawer-item') : [];

    function openDrawer() {
        if (!catDrawer) return;
        catDrawer.classList.add('open');
        catDrawer.setAttribute('aria-hidden', 'false');
        if (catToggle) {
            catToggle.classList.add('open');
            catToggle.setAttribute('aria-expanded', 'true');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (!catDrawer) return;
        catDrawer.classList.remove('open');
        catDrawer.setAttribute('aria-hidden', 'true');
        if (catToggle) {
            catToggle.classList.remove('open');
            catToggle.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }

    if (catToggle) catToggle.addEventListener('click', openDrawer);
    if (catClose)  catClose.addEventListener('click', closeDrawer);
    if (catOverlay) catOverlay.addEventListener('click', closeDrawer);

    catItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            const target   = item.getAttribute('data-target');

            // Mark active in drawer
            catItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            closeDrawer();

            setTimeout(() => {
                if (target === 'about') {
                    const about = document.querySelector('#about');
                    if (about) about.scrollIntoView({ behavior: 'smooth' });
                } else if (category) {
                    const tab = document.querySelector(`.tab[data-category="${category}"]`);
                    if (tab) {
                        tab.click();
                        const work = document.querySelector('.work-section');
                        if (work) window.scrollTo({ top: work.offsetTop - 80, behavior: 'smooth' });
                    }
                }
            }, 320); // wait for drawer close animation
        });
    });

    // Escape key closes drawer
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && catDrawer && catDrawer.classList.contains('open')) {
            closeDrawer();
        }
    });

    // Keep drawer active state in sync with tab clicks
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const cat = tab.getAttribute('data-category');
            catItems.forEach(item => {
                const itemCat = item.getAttribute('data-category');
                item.classList.toggle('active', itemCat === cat);
            });
        });
    });
})();

// ============================================
// PHOTO CAROUSEL
// ============================================
(function () {
    const carousel = document.getElementById('photoCarousel');
    if (!carousel) return;

    const track  = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsWrap = carousel.querySelector('.carousel-dots');

    const total = slides.length;
    let current = 0;

    // Set data attribute so CSS can hide controls for single slide
    carousel.setAttribute('data-slides', total);

    // Build dots dynamically
    if (dotsWrap && total > 1) {
        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            btn.setAttribute('aria-label', `Photo ${i + 1}`);
            btn.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(btn);
        });
    }

    function goTo(index) {
        current = ((index % total) + total) % total;
        if (track) track.style.transform = `translateX(-${current * 100}%)`;
        if (dotsWrap) {
            dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
                d.classList.toggle('active', i === current);
            });
        }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Touch / swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 45) {
            diff > 0 ? goTo(current + 1) : goTo(current - 1);
        }
    }, { passive: true });
})();
