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
        const header = section.querySelector('h2');
        if (header) {
            header.addEventListener('click', () => {
                section.classList.toggle('expanded');
            });
        }
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
  
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDetailedDescription = document.getElementById('modal-detailed-description');
    const modalPrice = document.getElementById('modal-price');
    const modalOrderButton = document.getElementById('modal-order-button');
    const items = document.querySelectorAll('.item__book');
    const quantityElement = document.getElementById('quantity');
    const decreaseQuantityButton = document.getElementById('decrease-quantity');
    const increaseQuantityButton = document.getElementById('increase-quantity');
    let currentQuantity = 1;
    let currentPrice = 0;

    let startY = 0;
    let endY = 0;

    items.forEach(item => {
        item.addEventListener('click', function() {
            modalImage.src = item.querySelector('img').src;
            modalTitle.textContent = item.querySelector('.stat-value.stat-market-v').textContent;
            modalDescription.textContent = item.querySelector('.stat-label.stat-market-l').textContent;
            modalDetailedDescription.textContent = item.querySelector('.stat-value.stat-market-d').textContent;
            currentPrice = parseInt(item.querySelector('.btn.buy').textContent);
            updatePrice();
            modal.classList.add('opening');
            setTimeout(() => {
                modal.style.display = 'block';
                modal.classList.remove('opening');
            }, 10); // Небольшая задержка для корректного применения стилей
        });
    });

    decreaseQuantityButton.addEventListener('click', function() {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityElement.textContent = currentQuantity;
            updatePrice();
        }
    });

    increaseQuantityButton.addEventListener('click', function() {
        currentQuantity++;
        quantityElement.textContent = currentQuantity;
        updatePrice();
    });

    function updatePrice() {
        modalPrice.textContent = `${currentPrice * currentQuantity}Р`;
    }

    modal.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    });

    modal.addEventListener('touchend', function(event) {
        endY = event.changedTouches[0].clientY;
        if (endY > startY && endY - startY > 100) { // 100 - минимальное расстояние для свайпа
            modal.classList.add('closing');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('closing');
            }, 300); // Длительность анимации
        }
    });

    // Добавляем обработчик для закрытия модального окна при клике вне его области
    document.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('closing');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('closing');
            }, 300); // Длительность анимации
        }
    });
});