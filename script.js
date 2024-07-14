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
    const modalContent = document.querySelector('.modal-content');
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
    const cartPopup = document.getElementById('cart-popup');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const closeCart = document.querySelector('.close-cart');
    const cartIcon = document.querySelector('.cart');
    const clearCartButton = document.getElementById('clear-cart');
    const totalPriceElement = document.getElementById('total-price');
    const modalSwipeArea = document.querySelector('.modal-swipe-areas'); // Добавлено для свайпа
    const overlay = document.querySelector('.overlay_mod'); // Оверлей для затемнения

    let currentQuantity = 1;
    let currentPrice = 0;
    let cart = [];

    items.forEach(item => {
        item.addEventListener('click', function() {
            modalImage.src = item.querySelector('img').src;
            modalTitle.textContent = item.querySelector('.stat-value.stat-market-v').textContent;
            modalDescription.textContent = item.querySelector('.stat-label.stat-market-l').textContent;
            modalDetailedDescription.textContent = item.querySelector('.stat-value.stat-market-d').textContent;
            currentPrice = parseInt(item.querySelector('.btn.buy').textContent);
            currentQuantity = 1; // Сбросить количество до 1 для нового товара
            quantityElement.textContent = currentQuantity; // Сброс отображаемого количества до 1
            updatePrice();
            modal.classList.add('open');
            overlay.style.display = 'block'; // Показать overlay
            
            setTimeout(function() {
                overlay.style.opacity = '0.5'; // Установить плавное значение opacity
            }, 50); // Небольшая задержка перед применением перехода
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

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    modalSwipeArea.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
        isDragging = true;
        modal.style.transition = 'none'; // Отключить анимацию во время перетаскивания
    });

    overlay.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    });
    
    overlay.addEventListener('touchmove', function(event) {
        let currentY = event.touches[0].clientY;
        let deltaY = currentY - startY;
    
        // Предотвращаем обновление страницы только при свайпе вниз
        if (deltaY > 0) {
            event.preventDefault();
        }
    });

    modalSwipeArea.addEventListener('touchmove', function(event) {
        if (!isDragging) return;
        currentY = event.touches[0].clientY;
        const distance = currentY - startY;
        if (distance > 0) {
            modal.style.transform = `translateY(${distance}px)`;
        }
    });

    modalSwipeArea.addEventListener('touchend', function(event) {
        isDragging = false;
        const distance = currentY - startY;
        modal.style.transition = 'transform 0.3s ease, opacity 0.3s ease'; // Восстановить анимацию

        if (distance > 100) { // Закрытие модального окна при смещении вниз на 100px
            modal.style.transform = `translateY(100%)`; // Полностью скрыть модальное окно вниз
            setTimeout(closeModal, 300); // Закрыть модальное окно после анимации
        } else {
            modal.style.transform = 'translateY(0)'; // Возвращаем на место, если смещение недостаточное
        }
    });

    function closeModal() {
        modal.classList.remove('open');
        modal.style.transform = 'translateY(0)'; // Сбросить позицию модального окна
        overlay.style.display = 'none'; // Скрыть оверлей

    }

    document.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    modalOrderButton.addEventListener('click', function() {
        const product = {
            image: modalImage.src,
            title: modalTitle.textContent,
            description: modalDescription.textContent,
            quantity: currentQuantity,
            price: currentPrice * currentQuantity
        };
        const existingItem = cart.find(item => item.title === product.title);
        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        updateCartUI();
        closeModal();
    });

    function updateCartUI() {
        cartItems.innerHTML = '';
        let totalCount = 0;
        let totalPrice = 0;
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}" width="50">
                <div class="cart-item-details">
                    <div class="cart-item-details__text">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-description">${item.description}</div>
                    </div>
                    <div class="cart-item-quantity-controls">
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(itemDiv);
            totalCount += item.quantity;
            totalPrice += item.price * item.quantity; // Умножить цену на количество
        });
        cartCount.textContent = totalCount;
        totalPriceElement.textContent = `: ${totalPrice}Р`;

        // Добавление обработчиков событий для элементов управления количеством
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    this.nextElementSibling.textContent = cart[index].quantity;
                    updateTotalPrice();
                }
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                cart[index].quantity++;
                this.previousElementSibling.textContent = cart[index].quantity;
                updateTotalPrice();
            });
        });
    }

    function updateTotalPrice() {
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        totalPriceElement.textContent = `: ${totalPrice}Р`;
    }

    cartIcon.addEventListener('click', function() {
        cartPopup.style.display = 'flex';
    });

    closeCart.addEventListener('click', function() {
        cartPopup.style.display = 'none';
    });

    clearCartButton.addEventListener('click', function() {
        cart = [];
        updateCartUI();
    });
});

        // Initialize the Telegram Web App
        window.Telegram.WebApp.ready();

        // Enable close confirmation
        window.Telegram.WebApp.enableClosingConfirmation();

        // Optional: Handle the closing event
        window.Telegram.WebApp.onEvent('closing', function() {
            // You can add any additional logic here if needed
            console.log('User attempted to close the Web App');
        });