// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ── Scroll Progress Bar ──────────────────────────────────────────
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; width: 0%;
    background: linear-gradient(90deg, #D4AF37, #F5D76E);
    z-index: 9999; transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba(212,175,55,0.7);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight * 100) + '%';
});

// ── Navbar background on scroll ──────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(21, 21, 29, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(212,175,55,0.08)';
    } else {
        navbar.style.background = 'rgba(21, 21, 29, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ── Hero Parallax ────────────────────────────────────────────────
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${window.scrollY * 0.25}px)`;
        heroContent.style.opacity = 1 - window.scrollY / (window.innerHeight * 0.8);
    }
});

// ── Scroll Reveal with directional + stagger ─────────────────────
const revealElements = [
    { selector: '.section-title',   from: 'bottom', delay: 0   },
    { selector: '.about-text p',    from: 'left',   delay: 100 },
    { selector: '.info-item',       from: 'left',   delay: 150 },
    { selector: '.skill-card',      from: 'bottom', delay: 120 },
    { selector: '.cert-item',       from: 'right',  delay: 100 },
    { selector: '.project-card',    from: 'bottom', delay: 0   },
    { selector: '.contact-card',    from: 'bottom', delay: 100 },
];

function getInitialTransform(from) {
    switch (from) {
        case 'left':   return 'translateX(-50px)';
        case 'right':  return 'translateX(50px)';
        default:       return 'translateY(40px)';
    }
}

revealElements.forEach(({ selector, from, delay }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = getInitialTransform(from);
        el.style.transition = `opacity 0.7s ease ${delay * i}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay * i}ms`;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0)';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        obs.observe(el);
    });
});

// ── Active nav link highlight on scroll ──────────────────────────
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
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

// Certificate Modal Functions
document.querySelectorAll('.cert-item.clickable').forEach(item => {
    item.addEventListener('click', function() {
        const certName = this.getAttribute('data-cert');
        openCertificate(certName);
    });
});

function openCertificate(certName) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('certificateImage');

    // Map data-cert keys to actual filenames
    const certMap = {
        'github-copilot':    'github-copilot',
        'nptel-ml':          'nptel-ml',
        'linguaskill':       'linguaskill',
        'social-internship': 'social-internship',
        'automation-anywhere': 'automation-anywhere',
        'devops-cloud':      'DevOps & Cloud Automation Virtual Internship',
        'genai-analytics':   'GenAI Powered Data Analytics Job Simulation',
        'aincat-2026':       'AINCAT 2026 – All India Naukri Campus Aptitude Test',
        'aws-cloud':         'AWS Certified Cloud Practitioner',
    };

    const filename = certMap[certName] || certName;
    const formats = ['png', 'jpg', 'jpeg'];

    const tryLoadImage = (index) => {
        if (index >= formats.length) {
            alert('Certificate image not found. Please add the certificate image to the certificates folder.');
            return;
        }
        const img = new Image();
        img.onload = function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        };
        img.onerror = function() {
            tryLoadImage(index + 1);
        };
        img.src = `certificates/${filename}.${formats[index]}`;
    };

    tryLoadImage(0);
}

function closeModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside the image
document.getElementById('certificateModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
