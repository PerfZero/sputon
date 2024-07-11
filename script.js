document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const navbarInitialTop = navbar.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= navbarInitialTop) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    sections.forEach(section => {
        section.addEventListener('click', () => {
            section.classList.toggle('expanded');
        });
    });
});
