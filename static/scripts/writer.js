function toggleActiveChar(element) {
    var nav = document.getElementById("formNav")
    var images = nav.querySelectorAll("img")
    images.forEach(img => {
        img.classList.remove("active")
    });
    element.classList.add("active")
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
    let checkbox = clonedItem.querySelector('.item-checkbox');
    clonedItem.querySelector('.item-footer').removeChild(checkbox);
    container.appendChild(clonedItem);
}

function removeItem(item, container) {
    const itemLabel = item.querySelector('.item-label').textContent;
    const selectedItem = Array.from(container.children).find(
        el => el.querySelector('.item-label').textContent === itemLabel
    );

    if (selectedItem) {
        container.removeChild(selectedItem);
    }
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
    
            const card = upgradeButton.parentElement;
            const label = card.querySelector('.card-label');
            
            if (label.textContent.includes('+')) {
                demoteCard(card);
            } else {
                upgradeCard(card);
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

const upgradeButtons = document.querySelectorAll('.card-upgrade');

upgradeButtons.forEach(upgradeButton => {
    upgradeButton.addEventListener('click', (event) => {
        event.stopPropagation();

        const card = upgradeButton.parentElement;
        const label = card.querySelector('.card-label');
        
        if (label.textContent.includes('+')) {
            demoteCard(card);
        } else {
            upgradeCard(card);
        }
    })
})

function upgradeCard(card) {
    let label = card.querySelector('.card-label');
    label.textContent = label.textContent + '+';
    label.style.color = '#7cf901';

    let img = card.querySelector('.card-upgrade');
    img.style.filter = 'hue-rotate(220deg)';
    img.style.transform = 'scaleX(-1)';
}

function demoteCard(card) {
    let label = card.querySelector('.card-label');
    label.textContent = label.textContent.slice(0, -1);
    label.style.color = 'wheat';

    let img = card.querySelector('.card-upgrade');
    img.style.filter = 'none';
    img.style.transform = 'scaleX(1)';
}