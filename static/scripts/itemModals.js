function setupItems() {
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        const container = document.getElementById(item.getAttribute('data-copy-target')).querySelector('.container-body');
    
        item.addEventListener('click', () => {
            const checkbox = item.querySelector('.item-checkbox');
            const img = item.querySelector('.item-image');
            if (isTicked(checkbox)) {
                checkbox.src = '/static/images/tickbox_unticked.png';
                img.classList.remove('active');
                removeItem(item, container);
            } else {
                checkbox.src = '/static/images/tickbox_ticked.png';
                img.classList.add('active');
                addItem(item, container);
            }
        })
    })
}

function isTicked(el) {
    return el.src.endsWith('_ticked.png');
}

function addItem(item, container) {
    const placeholder = container.querySelector('.container-placeholder');
    if (placeholder) {
        container.removeChild(placeholder);
    }

    const clonedItem = item.cloneNode(true);
    clonedItem.classList.add('preview');

    const itemId = item.getAttribute('id');
    clonedItem.setAttribute('id', itemId + 'container');

    let checkbox = clonedItem.querySelector('.item-checkbox');
    clonedItem.querySelector('.item-footer').removeChild(checkbox);

    container.appendChild(clonedItem);
}

function removeItem(item, container) {
    const containerItemId = item.getAttribute('id') + 'container';
    const selectedItem = document.getElementById(containerItemId);
    container.removeChild(selectedItem);
}

export { setupItems };