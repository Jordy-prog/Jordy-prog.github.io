function toggleActiveChar(element) {
    var nav = document.getElementById("formNav")
    var images = nav.querySelectorAll("img")
    images.forEach(img => {
        if (img.classList.contains('active')) {
            img.classList.remove("active")

            // Hide current content
            const prevId = img.getAttribute('id').replace('Nav', '');
            document.getElementById(prevId).style.display = 'none';
        }
    });
    element.classList.add("active")

    // Show new content
    const newId = element.getAttribute('id').replace('Nav', '');
    document.getElementById(newId).style.display = 'flex';
}

function toggleActiveAct(element) {
    var container = document.getElementById("actButtonContainer");
    var acts = container.querySelectorAll("button")
    acts.forEach(act => {
        act.classList.remove("active")
    });
    element.classList.add("active")
}

function toggleButton(el, src) {
    let img = el.querySelectorAll("img")[0]
    img.src = src
}

function toggleKeyGlow(glowId) {
    let glow = document.getElementById(glowId);
    if (glow.style.visibility == 'visible') {
        glow.style.visibility = 'hidden';
    } else {
        glow.style.visibility = 'visible';
    }
}

// Modal functions
const openModalButtons = document.querySelectorAll('.open-modal-btn');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-target');
        let modal = document.getElementById(modalId)
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.classList.add('modal-open');
    });
});

const closeModalButtons = document.querySelectorAll('.close-modal-btn');

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-close');
        let modal = document.getElementById(modalId)
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');

        setTimeout(() => {
            modal.style.display = 'none'; // Set display to none after fade out
        }, 400);
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.classList.remove('modal-open');

        setTimeout(() => {
            e.target.style.display = 'none'; // Set display to none after fade out
        }, 400);
    }
});

// Item Modal & Container Functions
const items = document.querySelectorAll('.item')

items.forEach(item => {
    const container = document.getElementById(item.getAttribute('data-copy-target')).querySelector('.container-body')

    item.addEventListener('click', () => {
        const checkbox = item.querySelector('.item-checkbox')
        const img = item.querySelector('.item-image')
        if (isTicked(checkbox)) {
            checkbox.src = '/static/images/tickbox_unticked.png'
            img.classList.remove('active')
            removeItem(item, container);
        } else {
            checkbox.src = '/static/images/tickbox_ticked.png'
            img.classList.add('active')
            addItem(item, container);
        }
    })
})

function isTicked(el) {
    return el.src.endsWith('_ticked.png');
}

function addItem(item, container) {
    const placeholder = container.querySelector('.container-placeholder')
    if (placeholder) {
        container.removeChild(placeholder);
    }

    const clonedItem = item.cloneNode(true);
    clonedItem.classList.add('preview')

    const itemId = item.getAttribute('id');
    clonedItem.setAttribute('id', itemId + 'container')

    let checkbox = clonedItem.querySelector('.item-checkbox');
    clonedItem.querySelector('.item-footer').removeChild(checkbox);

    container.appendChild(clonedItem);
}

function removeItem(item, container) {
    const containerItemId = item.getAttribute('id') + 'container';
    const selectedItem = document.getElementById(containerItemId);
    container.removeChild(selectedItem);
}

// Card/Potion Modal and Container Functions
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