function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    const dropdownOverlay = document.getElementById('dropdownOverlay');
    dropdownContent.classList.toggle('show');
    dropdownOverlay.classList.toggle('show');
    
    document.body.style.overflow = 'hidden';
  }
  
  function closeDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    const dropdownOverlay = document.getElementById('dropdownOverlay');
    dropdownContent.classList.remove('show');
    dropdownOverlay.classList.remove('show');
    
    document.body.style.overflow = 'auto';
  }
  

  window.onclick = function(event) {
    if (!event.target.matches('.filter')) {
      closeDropdown();
    }
  }

  document.querySelectorAll('.custom-select').forEach((selectContainer) => {
    const selected = selectContainer.querySelector('.select-selected');
    const optionsContainer = selectContainer.querySelector('.select-items');
    const options = optionsContainer.querySelectorAll('div');

    selected.addEventListener('click', () => {
      optionsContainer.classList.toggle('select-hide');
      selected.classList.toggle('select-arrow-active');
    });

    options.forEach((option) => {
      option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        optionsContainer.classList.add('select-hide');
        selected.classList.remove('select-arrow-active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!selectContainer.contains(e.target)) {
        optionsContainer.classList.add('select-hide');
        selected.classList.remove('select-arrow-active');
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.icons .image');

    icons.forEach(icon => {
      icon.addEventListener('click', function() {
        if (this.classList.contains('activ_on')) {
          this.classList.remove('activ_on');
          this.classList.add('activ_off');
        } else {
          this.classList.remove('activ_off');
          this.classList.add('activ_on');
        }
      });
    });
  });

  document.documentElement.style.overflow = 'hidden';


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

