function runCinematicIntro() {
    const logoWrapper = document.getElementById('intro-shield-wrapper');
    const introTextTitle = document.getElementById('imperium-title');
    const introTextSub = document.getElementById('legacy-text');
    const introOverlay = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const navText = document.getElementById('nav-brand-text');

    if (introTextTitle) introTextTitle.classList.add('fade-out-text');
    if (introTextSub) introTextSub.classList.add('fade-out-text');

    setTimeout(() => {
        if (logoWrapper) logoWrapper.classList.add('fly-to-corner');
        if (introOverlay) introOverlay.style.opacity = '0';
        if (mainContent) mainContent.classList.add('visible');

        setTimeout(() => {
            if (introOverlay) introOverlay.style.display = 'none';
            document.body.classList.remove('intro-active');
        }, 800);
    }, 300);

    setTimeout(() => {
        if (navText) navText.classList.add('show-nav-text');
    }, 1400);
}

function initMobileNav() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!toggle || !mobileMenu) return;

    const closeMenu = () => {
        mobileMenu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        const expanded = (!mobileMenu.classList.contains('hidden')).toString();
        toggle.setAttribute('aria-expanded', expanded);
        toggle.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
    });

    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) closeMenu();
    });
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    reveals.forEach(el => observer.observe(el));
}

window.addEventListener('load', () => {
    document.body.classList.add('intro-active');
    setTimeout(runCinematicIntro, 800);
    initMobileNav();
    initScrollReveal();
});
