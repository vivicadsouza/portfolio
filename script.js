// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Only add event listener if hamburger exists
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Flip Text Animation - Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Show sidebar icons after 5 seconds
setTimeout(() => {
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav) {
        sidebarNav.classList.add('visible');
    }
}, 5000);  // 5000 milliseconds = 5 seconds
    const flipTextElement = document.getElementById('flipText');
    
    if (flipTextElement) {
        const words = [
            'Multimedia',
            'Visual',
            'Digital',
            'Reporting',
            'Data-Driven',
            'Dynamic',
            'Solutions',
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

        // Toggle grid view for "All Projects"
        if (category === 'all') {
            projectsGrid.classList.add('grid-view');
        } else {
            projectsGrid.classList.remove('grid-view');
        }

        // Filter projects
        projects.forEach(project => {
            if (category === 'all') {
                // Show only featured projects
                if (project.classList.contains('featured')) {
                    project.classList.remove('hidden');
                } else {
                    project.classList.add('hidden');
                }
            } else if (project.classList.contains(category)) {
                // Show all projects in this category
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
    });
});

// Auto-trigger "All Projects" filter on page load
document.addEventListener('DOMContentLoaded', function() {
    const allProjectsTab = document.querySelector('.tab[data-category="all"]');
    if (allProjectsTab) {
        allProjectsTab.click();
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

mobileMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        const target = item.getAttribute('data-target');
        
        if (target === 'about') {
            // Scroll to about section
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        } else if (category) {
            // Trigger category filter
            const targetTab = document.querySelector(`.tab[data-category="${category}"]`);
            if (targetTab) {
                targetTab.click();
                window.scrollTo({ top: document.querySelector('.work-section').offsetTop - 100, behavior: 'smooth' });
            }
        }
    });
});

// Update sidebar active state based on scroll position
window.addEventListener('scroll', () => {
    const workSection = document.querySelector('.work-section');
    const aboutSection = document.querySelector('#about');
    const scrollY = window.pageYOffset;
    
    const workTop = workSection.offsetTop - 200;
    const aboutTop = aboutSection.offsetTop - 200;
    
    // Check which section is in view and update sidebar accordingly
    sidebarIcons.forEach(icon => {
        icon.classList.remove('active');
    });
    
    if (scrollY >= aboutTop) {
        // About section is visible
        const aboutIcon = document.querySelector('.sidebar-icon[data-target="about"]');
        if (aboutIcon) aboutIcon.classList.add('active');
    } else if (scrollY >= workTop) {
        // Work section is visible - keep the active category highlighted
        // This is handled by the tab click events
    }
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
