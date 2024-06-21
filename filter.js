document.addEventListener('DOMContentLoaded', function() {
    var filterItem = document.getElementById('catalog-categories');
    var pageCategory = document.getElementById('page-category');
    var addItemsButton = document.getElementById('add-items');

    console.log('filterItem:', filterItem);
    console.log('pageCategory:', pageCategory);
    console.log('addItemsButton:', addItemsButton);
    
    if (filterItem && pageCategory && addItemsButton) {
        filterItem.addEventListener('click', function() {
            console.log('Catalog categories clicked');
            pageCategory.classList.toggle('active');
        });
    
        addItemsButton.addEventListener('click', function() {
            console.log('Add items clicked');
            pageCategory.classList.remove('active');
        });
    } else {
        console.error('One or more elements not found');
    }
    
});


