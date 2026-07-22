const navLinks = document.querySelectorAll('.site-nav a');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const heroText = document.querySelector('.hero-description');
const sections = document.querySelectorAll('main section[id]');
const topButton = document.createElement('button');

topButton.textContent = '↑';
topButton.className = 'scroll-top';
document.body.appendChild(topButton);

function scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const offset = 90;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
}

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        scrollToSection(targetId);
        siteNav?.classList.remove('open');
    });
});

menuToggle?.addEventListener('click', () => {
    siteNav?.classList.toggle('open');
});

if (heroText) {
    const text = 'I create clean, responsive websites and dependable web apps with HTML, CSS, JavaScript, React, Python, and Django.';
    heroText.textContent = '';
    let index = 0;

    const typeText = () => {
        if (index < text.length) {
            heroText.textContent += text.charAt(index);
            index += 1;
            setTimeout(typeText, 28);
        }
    };

    typeText();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = '#' + section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === current);
    });

    topButton.style.display = window.scrollY > 400 ? 'grid' : 'none';
});

topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
