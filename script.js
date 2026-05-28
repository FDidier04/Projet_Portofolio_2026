// Smooth scroll for navigation links
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

// Active navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Navbar collapse on link click
document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            toggler.click();
        }
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show success message
    const form = this;
    const originalContent = form.innerHTML;
    
    form.innerHTML = `
        <div class="alert alert-success" role="alert">
            <i class="fas fa-check-circle"></i> Merci pour votre message ! Je vous recontacterai dans les meilleurs délais.
        </div>
    `;
    
    // Reset form after 3 seconds
    setTimeout(() => {
        form.reset();
        form.innerHTML = originalContent;
        
        // Reattach event listener
        document.getElementById('contactForm').addEventListener('submit', arguments.callee);
    }, 3000);
    
    console.log('Message envoyé:', formData);
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.service-card, .competence-group, .education-card, .contact-card').forEach(card => {
    observer.observe(card);
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
        border-bottom: 3px solid var(--primary-color);
    }
`;
document.head.appendChild(style);

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.id = 'scrollTopBtn';
document.body.appendChild(scrollTopBtn);

// Add scroll to top button styles
const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    #scrollTopBtn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #0d6efd, #764ba2);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    #scrollTopBtn:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }
    
    #scrollTopBtn.show {
        display: flex;
    }
`;
document.head.appendChild(scrollTopStyle);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Scroll to top functionality
document.getElementById('scrollTopBtn').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
