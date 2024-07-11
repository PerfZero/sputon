

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".category-section");
    const menuItems = document.querySelectorAll(".navigation .nav-item");
  
    if (sections.length === 0 || menuItems.length === 0) {
      console.error("Sections or menu items not found.");
      return;
    }
  
    window.addEventListener("scroll", () => {
      let currentSection = "";
  
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
          currentSection = section.getAttribute("id");
        }
      });
  
      menuItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href").substring(1) === currentSection) {
          item.classList.add("active");
        }
      });
    });
  });

  