// Flip Text Animation
document.addEventListener('DOMContentLoaded', function() {
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

        setInterval(flipText, 2500);
    }

    // Show sidebar icons after 5 seconds
    setTimeout(() => {
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (sidebarNav) {
            sidebarNav.classList.add('visible');
        }
    }, 5000);

    // Auto-trigger "All Projects" filter on page load
    const allProjectsTab = document.querySelector('.tab[data-category="all"]');
    if (allProjectsTab) {
        setTimeout(() => allProjectsTab.click(), 100);
    }
});

// Sidebar Navigation
const sidebarIcons = document.querySelectorAll('.sidebar-icon');

sidebarIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const category = icon.getAttribute('data-category');
        const target = icon.getAttribute('data-target');

        if (target === 'about') {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
            sidebarIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');
        } else if (category) {
            const targetTab = document.querySelector(`.tab[data-category="${category}"]`);
            if (targetTab) {
                targetTab.click();
                window.scrollTo({ top: document.querySelector('.work-section').offsetTop - 100, behavior: 'smooth' });
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
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');

        if (category === 'all') {
            projectsGrid.classList.add('grid-view');
        } else {
            projectsGrid.classList.remove('grid-view');
        }

        projects.forEach(project => {
            if (category === 'all') {
                if (project.classList.contains('featured')) {
                    project.classList.remove('hidden');
                } else {
                    project.classList.add('hidden');
                }
            } else if (project.classList.contains(category)) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
    });
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

// Mobile Menu Navigation
const mobileMenuItems = document.querySelectorAll('.menu-item');

mobileMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        const target = item.getAttribute('data-target');
        
        if (target === 'about') {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        } else if (category) {
            const targetTab = document.querySelector(`.tab[data-category="${category}"]`);
            if (targetTab) {
                targetTab.click();
                window.scrollTo({ top: document.querySelector('.work-section').offsetTop - 100, behavior: 'smooth' });
            }
        }
    });
});

// Copy to Clipboard
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
        });
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Impact Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const impactButtons = document.querySelectorAll('.impact-btn');
    const modals = document.querySelectorAll('.impact-modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    impactButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const modal = document.getElementById(`modal-${projectId}`);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.impact-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });
});

console.log('Portfolio loaded!');
