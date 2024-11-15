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

function downloadSaveState() {
    const date = new Date()

    var json = {
        "General": {
            "CampaignName": "The most awesome game",
            "Date": date.toLocaleString(),
            "Act": 1,
            "Ascension": 1,
            "Keys": [],
            "SkippedRelics": ["Mutagen", "Nilry's Codex"],
            "SkippedBossRelics": ["Busted Crown", "Frozen Core"],
            "SkippedPotions": ["Blood Potion", "Distilled Chaos"],
            "SkippedCurses": ["Pain", "Normality"],
            "SkippedColorless": ["Flash of Steel", "Dark Shackles"]
        },
        "Ironclad": {
            "Players": [],
            "Health": 1,
            "Gold": 1,
            "Potions": [],
            "Relics": [],
            "BossRelics": [],
            "SkippedRares": [],
            "RemovedCards": [],
            "Deck": [],
            "RareDeck": []
        },
        "Silent": {
            "Players": [],
            "Health": 1,
            "Gold": 1,
            "Potions": [],
            "Relics": [],
            "BossRelics": [],
            "SkippedRares": [],
            "RemovedCards": [],
            "Deck": [],
            "RareDeck": []
        },
        "Defect": {
            "Players": [],
            "Health": 1,
            "Gold": 1,
            "Potions": [],
            "Relics": [],
            "BossRelics": [],
            "SkippedRares": [],
            "RemovedCards": [],
            "Deck": [],
            "RareDeck": []
        },
        "Watcher": {
            "Players": [],
            "Health": 1,
            "Gold": 1,
            "Potions": [],
            "Relics": [],
            "BossRelics": [],
            "SkippedRares": [],
            "RemovedCards": [],
            "Deck": [],
            "RareDeck": []
        }
    }

    // Convert JSON object to string
    const jsonString = JSON.stringify(json);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    link.download = date.toLocaleString().replace(", ", "_") + '_' + json.General.CampaignName.replaceAll(" ", "_") + '.json';

    // Append the link to the document, click it, and remove it
    document.body.appendChild(link);
    // link.click();
    document.body.removeChild(link);
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

// Health
let healthContainer = document.getElementById('healthContainer');
let hearts = Array.from(healthContainer.children);
let lockedHearts = [];

healthContainer.addEventListener('mouseout', emptyHearts);

hearts.forEach(heart => {
    heart.addEventListener('mouseover', () => {
        fillHearts(heart);
    })

    heart.addEventListener('click', () => {
        lockHearts(heart);
    })
});

function emptyHearts() {
    hearts.forEach(heart => {
        if (!lockedHearts.includes(heart)) {
            heart.src = "static/images/heartBroken.png";
        }
    });
}

function fillHearts(heart) {
    let max = hearts.findIndex(x => x === heart);

    for (let index = 0; index <= max; index++) {
        let element = hearts[index];
        element.src = "static/images/heartFull.png";
    }
}

function lockHearts(heart) {
    lockedHearts = [];
    let max = hearts.findIndex(x => x === heart);

    for (let index = 0; index <= max; index++) {
        let element = hearts[index];
        lockedHearts.push(element);
    }
}

// Gold counter

let counter = 0;
let interval = null;

let incrementButton = document.getElementById('goldIncrementButton');
let decrementButton = document.getElementById('goldDecrementButton');
let counterDisplay = document.getElementById('moneyCounter');

function updateGoldCounter(direction) {
    if (direction == "up") {
        counter++;
        counterDisplay.innerHTML = counter;
    } else if (direction == "down") {
        if(counter > 0) {counter--;}
        counterDisplay.innerHTML = counter;
    }
}

function startIncrementing() {
    if (!interval) {
        interval = setInterval(() => {
            counter++;
            counterDisplay.innerHTML = counter;
        }, 100);
    }
}

function startDecrementing() {
    if (!interval) {
        interval = setInterval(() => {
            if(counter > 0) {counter--;}
            counterDisplay.innerHTML = counter;
        }, 100);
    }
}

function stopInterval() {
    clearInterval(interval);
    interval = null;
}

incrementButton.addEventListener('mousedown', startIncrementing);
incrementButton.addEventListener('mouseup', stopInterval);
incrementButton.addEventListener('mouseleave', stopInterval);

decrementButton.addEventListener('mousedown', startDecrementing);
decrementButton.addEventListener('mouseup', stopInterval);
decrementButton.addEventListener('mouseleave', stopInterval);