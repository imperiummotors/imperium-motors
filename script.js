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
        if (mainContent) mainContent.style.opacity = '1';

        setTimeout(() => {
            if (introOverlay) introOverlay.style.display = 'none';
        }, 800);
    }, 300);

    setTimeout(() => {
        if (navText) navText.classList.add('show-nav-text');
    }, 1400);
}

window.addEventListener('load', () => {
    setTimeout(runCinematicIntro, 1200);
});
