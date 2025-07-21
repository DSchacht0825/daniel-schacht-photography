// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Enhanced smooth scrolling is handled below

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple form validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create mailto link (you can replace this with actual form submission)
            const subject = `Photography Inquiry - ${data.service || 'General'}`;
            const body = `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0AService: ${data.service || 'Not specified'}%0D%0A%0D%0AMessage:%0D%0A${data.message}`;
            const mailtoLink = `mailto:danielschacht@proton.me?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your message! Your email client should open with the message ready to send.');
            this.reset();
        });
    }

    // Enhanced scroll effects are handled below

    // Basic portfolio setup (enhanced hover effects are below)

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animation elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        scrollObserver.observe(el);
    });

    // Enhanced portfolio hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        // Add stagger class for delayed animations
        item.classList.add(`stagger-${(index % 6) + 1}`);
        
        // Enhanced hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Smooth scroll with easing for navigation links
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

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const navbar = document.querySelector('.navbar');
        
        // Parallax effect
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Dynamic navbar background
        if (scrolled > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(5px)';
        }
    });
});

// Utility function to load content from content.json (for easy updates)
async function loadContent() {
    try {
        const response = await fetch('./content.json');
        const content = await response.json();
        updatePageContent(content);
    } catch (error) {
        console.log('Content file not found, using default content');
    }
}

function updatePageContent(content) {
    // Update site title and description
    if (content.site) {
        document.title = content.site.title || document.title;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && content.site.description) {
            metaDescription.setAttribute('content', content.site.description);
        }
    }

    // Update contact information
    if (content.site && content.site.contact) {
        const phoneElements = document.querySelectorAll('[data-phone]');
        const emailElements = document.querySelectorAll('[data-email]');
        
        phoneElements.forEach(el => {
            if (content.site.contact.phone) {
                el.textContent = content.site.contact.phone;
            }
        });
        
        emailElements.forEach(el => {
            if (content.site.contact.email) {
                el.textContent = content.site.contact.email;
            }
        });
    }
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', loadContent);