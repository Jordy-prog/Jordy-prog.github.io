const cards = document.querySelectorAll('.card-list-item')

cards.forEach(card => {
    const container = document.getElementById(card.getAttribute('data-copy-target')).querySelector('.container-body')

    card.addEventListener('click', () => {
        const checkbox = card.querySelector('.card-checkbox')
        if (isTicked(checkbox)) {
            checkbox.src = '/static/images/tickbox_unticked.png'
            card.classList.remove('active');
            removeCard(card, container);
        } else {
            checkbox.src = '/static/images/tickbox_ticked.png'
            card.classList.add('active');
            addCard(card, container);
        }
    })
})

function addCard(card, container) {
    const placeholder = container.querySelector('.container-placeholder')
    if (placeholder) {
        container.removeChild(placeholder);
    }

    const clonedItem = card.cloneNode(true);
    const cardId = card.getAttribute('id');
    clonedItem.setAttribute('id', cardId + 'container')

    let checkbox = clonedItem.querySelector('.card-checkbox');
    clonedItem.removeChild(checkbox);

    let upgradeButton = clonedItem.querySelector('.card-upgrade');

    if (upgradeButton) {
        upgradeButton.addEventListener('click', (event) => {
            event.stopPropagation();
    
            const containerCard = upgradeButton.parentElement;
            const label = containerCard.querySelector('.card-label');
            
            if (label.textContent.includes('+')) {
                demoteCards([card, containerCard]);
            } else {
                upgradeCards([card, containerCard]);
            }
        })    
    }
    
    clonedItem.style.paddingLeft = '7px';
    clonedItem.classList.remove('active');
    container.appendChild(clonedItem);
}

function removeCard(card, container) {
    const containerCardId = card.getAttribute('id') + 'container';
    const selectedItem = document.getElementById(containerCardId);
    container.removeChild(selectedItem);
}

const modalUpgradeButtons = document.querySelectorAll('.card-upgrade');

modalUpgradeButtons.forEach(upgradeButton => {
    upgradeButton.addEventListener('click', (event) => {
        event.stopPropagation();

        const card = upgradeButton.parentElement;
        const label = card.querySelector('.card-label');
        const containerCard = document.getElementById(card.getAttribute('id') + 'container')
        
        if (label.textContent.includes('+')) {
            demoteCards([card, containerCard]);
        } else {
            upgradeCards([card, containerCard]);
        }
    })
})

function upgradeCards(cards) {
    cards.forEach(card => {
        if (card) {
            let label = card.querySelector('.card-label');
            label.textContent = label.textContent + '+';
        
            card.classList.add('upgraded');
        }
    });
}

function demoteCards(cards) {
    cards.forEach(card => {
        if (card) {
            let label = card.querySelector('.card-label');
            label.textContent = label.textContent.slice(0, -1);
        
            card.classList.remove('upgraded');
        }
    });
}