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

// Observe sections/cards without overriding service-card hover transforms.
document.querySelectorAll('.service-item, .competence-group, .education-card, .contact-card').forEach(card => {
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

function initSkillsSlider() {
    const slider = document.querySelector('.skills-slider');
    if (!slider) return;

    const track = slider.querySelector('.skills-carousel');
    const cards = Array.from(slider.querySelectorAll('.skill-card'));
    const prevBtn = slider.querySelector('.skills-arrow-prev');
    const nextBtn = slider.querySelector('.skills-arrow-next');
    const dotsWrap = slider.querySelector('.skills-dots');
    if (!track || cards.length === 0 || !prevBtn || !nextBtn || !dotsWrap) return;

    let currentIndex = 0;
    let visibleCount = getVisibleCount();

    function getVisibleCount() {
        return window.matchMedia('(max-width: 768px)').matches ? 1 : 3;
    }

    function getMaxIndex() {
        return Math.max(cards.length - visibleCount, 0);
    }

    function getStepSize() {
        if (cards.length < 2) return cards[0].offsetWidth;
        return cards[1].offsetLeft - cards[0].offsetLeft;
    }

    function renderDots() {
        dotsWrap.innerHTML = '';
        const dotCount = getMaxIndex() + 1;
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'skills-dot';
            dot.setAttribute('aria-label', `Afficher la compétence ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsWrap.appendChild(dot);
        }
    }

    function updateSlider() {
        currentIndex = Math.min(Math.max(currentIndex, 0), getMaxIndex());
        track.style.transform = `translateX(-${currentIndex * getStepSize()}px)`;

        dotsWrap.querySelectorAll('.skills-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex <= 0 ? getMaxIndex() : currentIndex - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex >= getMaxIndex() ? 0 : currentIndex + 1;
        updateSlider();
    });

    window.addEventListener('resize', () => {
        const nextVisibleCount = getVisibleCount();
        if (nextVisibleCount !== visibleCount) {
            visibleCount = nextVisibleCount;
            currentIndex = 0;
            renderDots();
        }
        updateSlider();
    });

    renderDots();
    updateSlider();
}

// Proximity zoom: handle project cards.
function initProximityZoom() {
    const groups = [
        { container: document.querySelector('.projects-section') || document.getElementById('projects'), selector: '.project-card', maxDist: 320 }
    ];

    groups.forEach(group => {
        if (!group.container) return;
        const cards = group.container.querySelectorAll(group.selector);
        if (!cards || cards.length === 0) return;

        let mouseX = -9999, mouseY = -9999;
        let rafId = null;

        group.container.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!rafId) rafId = requestAnimationFrame(() => update(cards, mouseX, mouseY, group.maxDist));
        });

        group.container.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.transform = '';
                c.style.zIndex = '';
                c.classList.remove('prox-highlight');
            });
        });

        function update(cardsRef, mx, my, maxDist) {
            cardsRef.forEach(card => {
                const r = card.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const dx = mx - cx;
                const dy = my - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const minScale = 1;
                const maxScale = 1.12;
                let scale = minScale;

                if (dist < maxDist) {
                    const t = 1 - dist / maxDist;
                    scale = minScale + (maxScale - minScale) * Math.pow(t, 1.2);
                }

                card.style.transform = `scale(${scale})`;
                card.style.zIndex = scale > 1.01 ? '5' : '1';
                if (scale > 1.03) card.classList.add('prox-highlight'); else card.classList.remove('prox-highlight');
            });

            rafId = null;
        }
    });
}

document.addEventListener('DOMContentLoaded', initProximityZoom);
document.addEventListener('DOMContentLoaded', initSkillsSlider);
