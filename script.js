// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Skill bars animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

const animateSkills = () => {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos) {
        skillBars.forEach(bar => {
            bar.style.width = bar.style.width;
        });
    }
};

window.addEventListener('scroll', animateSkills);

// Project cards animation on scroll
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

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// Form submission handling with Netlify support (honeypot & fallback)
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // If Netlify handles the form (when deployed), allow native submission
        const isNetlify = contactForm.hasAttribute('data-netlify');
        const honeypot = contactForm.querySelector('input[name="bot-field"]');

        // If honeypot is filled, treat as bot and do nothing
        if (honeypot && honeypot.value) {
            e.preventDefault();
            return;
        }

        if (isNetlify) {
            // Let Netlify handle the submission when deployed.
            // But to support AJAX submission (and to prevent page reload in dev), we'll try to submit via fetch if running locally.
            if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                e.preventDefault();
                const formData = new FormData(contactForm);

                fetch('/', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                }).then(response => {
                    if (response.ok) {
                        alert('Thank you! Your message has been sent.');
                        contactForm.reset();
                    } else {
                        return response.text().then(text => { throw new Error(text); });
                    }
                }).catch(err => {
                    console.error('Form submission error:', err);
                    alert('There was an issue submitting the form. In production this would be handled by Netlify Forms.');
                });
            }
            // In production on Netlify, allow normal form post
        } else {
            // No Netlify: prevent actual submit and show demo message
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Thank you for your message, ${name}! This is a demo form. In a production environment, your message would be sent.`);
            contactForm.reset();
        }
    });
}

// Smooth scroll for anchor links (additional support for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.animation = 'fadeIn 0.5s ease';
    });
});

// Typing effect for hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle.textContent;
let index = 0;

function typeWriter() {
    if (index < originalText.length) {
        heroSubtitle.textContent = originalText.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Uncomment the line below to enable typing effect
// heroSubtitle.textContent = ''; typeWriter();