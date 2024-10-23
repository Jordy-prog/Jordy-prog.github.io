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
        modal.style.display = 'flex';
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