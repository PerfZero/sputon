function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    const dropdownOverlay = document.getElementById('dropdownOverlay');
    dropdownContent.classList.toggle('show');
    dropdownOverlay.classList.toggle('show');
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
  }
  
  function closeDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    const dropdownOverlay = document.getElementById('dropdownOverlay');
    dropdownContent.classList.remove('show');
    dropdownOverlay.classList.remove('show');
    
    // Enable scrolling back
    document.body.style.overflow = 'auto';
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.filter')) {
      closeDropdown();
    }
  }