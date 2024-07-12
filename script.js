document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const navbarInitialTop = navbar.offsetTop;

    // Добавляем класс expanded всем секциям при загрузке страницы
    sections.forEach(section => {
        section.classList.add('expanded');
    });

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
            if (pageYOffset >= sectionTop - sectionHeight / 30) {
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

    // Обработчик события click для переключения класса expanded
    sections.forEach(section => {
        section.addEventListener('click', () => {
            section.classList.toggle('expanded');
        });
    });
});


  // Определение операционной системы (iOS или Android)
  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    if (/android/i.test(userAgent)) {
        return "Android";
    }
  
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
  
    return "unknown";
  }
  
  // Применение соответствующего паддинга в зависимости от операционной системы
  document.addEventListener("DOMContentLoaded", function() {
    var footer = document.querySelector(".footer");
    var os = getMobileOperatingSystem();
  
    if (os === "iOS") {
        footer.style.padding = "20px 0"; // паддинг для iOS
    } else {
        footer.style.padding = "10px 0"; // паддинг для Android
    }
  });
  
  