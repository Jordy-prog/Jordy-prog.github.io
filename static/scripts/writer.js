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
    link.click();
    document.body.removeChild(link);
}