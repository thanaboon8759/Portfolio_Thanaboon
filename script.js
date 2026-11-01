const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initActiveNav();
    initTypingAnimation();
    initPortfolioFilters();
    initScrollAnimations();
    initModals();
});

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('nav-links');

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', open);
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        links.classList.toggle('open', open);
    }

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    links.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', e => {
        if (!toggle.contains(e.target) && !links.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && links.classList.contains('open')) {
            setOpen(false);
            toggle.focus();
        }
    });
}

// Highlight the nav link of the section in view
function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// Typing animation for hero subtitle
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement || reduceMotion) return;

    const texts = [
        'Computer Science Student',
        'Data & AI Student',
        'Cybersecurity Student',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = texts[0].length;
    let isDeleting = true;

    function typeText() {
        const currentText = texts[textIndex];
        charIndex += isDeleting ? -1 : 1;
        typingElement.textContent = currentText.substring(0, charIndex);

        let delay = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            delay = 500;
        }
        setTimeout(typeText, delay);
    }

    // The first phrase is already in the HTML; hold it before deleting
    setTimeout(typeText, 2000);
}

// Portfolio filter functionality
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.setAttribute('aria-pressed', b === this));
            const filter = this.dataset.filter;
            portfolioItems.forEach(item => {
                item.hidden = filter !== 'all' && item.dataset.category !== filter;
            });
        });
    });
}

// Fade sections in as they scroll into view
function initScrollAnimations() {
    if (reduceMotion) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section-header, .about-content, .journey-content, .card, .skills-column, .contact-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Certificate and document dialogs
function initModals() {
    const certModal = document.getElementById('certificateModal');
    const docModal = document.getElementById('documentModal');
    const docFrame = document.getElementById('documentFrame');

    document.querySelectorAll('.open-cert').forEach(btn => {
        btn.addEventListener('click', () => {
            const image = document.getElementById('modalImage');
            image.src = btn.dataset.src;
            image.alt = btn.dataset.title;
            document.getElementById('modalTitle').textContent = btn.dataset.title;
            document.getElementById('modalDescription').textContent = btn.dataset.description;
            certModal.showModal();
        });
    });

    document.querySelectorAll('.open-doc').forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.dataset.src;
            document.getElementById('documentModalTitle').textContent = btn.dataset.title;
            document.getElementById('documentModalDescription').textContent = btn.dataset.description;
            docFrame.title = btn.dataset.title;
            docFrame.src = src + '#toolbar=0&navpanes=0&scrollbar=1';
            document.getElementById('downloadDocument').href = src;
            document.getElementById('openInNewTab').href = src;
            docModal.showModal();
        });
    });

    [certModal, docModal].forEach(modal => {
        modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
        // Clicks on the backdrop land on the dialog element itself
        modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
    });

    // Stop the PDF loading once the dialog is gone
    docModal.addEventListener('close', () => { docFrame.src = 'about:blank'; });
}
