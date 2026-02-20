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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    }
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

// Observe all sections and cards
document.querySelectorAll('section, .skill-card, .project-card, .contact-card, .cert-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
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
    
    // Try different image formats
    const formats = ['png', 'jpg', 'jpeg'];
    let imageLoaded = false;
    
    // Try to load the image with different extensions
    const tryLoadImage = (index) => {
        if (index >= formats.length) {
            // If no image found, show a message
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
        img.src = `certificates/${certName}.${formats[index]}`;
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
