function downloadSaveState() {
    const date = new Date()

    var json = {
        "General": {
            "CampaignName": document.getElementById('campaignName').value,
            "Date": date.toLocaleDateString(),
            "Act": getAct(),
            "Ascension": document.getElementById('ascensionRange').value,
            "Keys": getKeys(),
            "SkippedRelics": getItems('skippedRelicsContainer'),
            "SkippedBossRelics": getItems('skippedBossRelicsContainer'),
            "SkippedPotions": getCards('skippedPotionsContainer'),
            "SkippedCurses": getCards('skippedCursesContainer'),
            "SkippedColorless": getCards('skippedColorlessContainer')
        },
        "Ironclad": {
            "Players": document.getElementById('playersIronclad').value,
            "Health": lockedHearts['healthContainerIronclad'].length,
            "Gold": getGold('goldContainerIronclad'),
            "Potions": getCards('potionsContainerIronclad'),
            "Relics": getItems('relicsContainerIronclad'),
            "BossRelics": getItems('bossRelicsContainerIronclad'),
            "SkippedRares": getCards('skippedRaresContainerIronclad'),
            "RemovedCards": getCards('removedCardsContainerIronclad'),
            "Deck": getCards('deckContainerIronclad'),
            "RareDeck": getCards('rareDeckContainerIronclad')
        },
        "Silent": {
            "Players": document.getElementById('playersSilent').value,
            "Health": lockedHearts['healthContainerSilent'].length,
            "Gold": getGold('goldContainerSilent'),
            "Potions": getCards('potionsContainerSilent'),
            "Relics": getItems('relicsContainerSilent'),
            "BossRelics": getItems('bossRelicsContainerSilent'),
            "SkippedRares": getCards('skippedRaresContainerSilent'),
            "RemovedCards": getCards('removedCardsContainerSilent'),
            "Deck": getCards('deckContainerSilent'),
            "RareDeck": getCards('rareDeckContainerSilent')
        },
        "Defect": {
            "Players": document.getElementById('playersDefect').value,
            "Health": lockedHearts['healthContainerDefect'].length,
            "Gold": getGold('goldContainerDefect'),
            "Potions": getCards('potionsContainerDefect'),
            "Relics": getItems('relicsContainerDefect'),
            "BossRelics": getItems('bossRelicsContainerDefect'),
            "SkippedRares": getCards('skippedRaresContainerDefect'),
            "RemovedCards": getCards('removedCardsContainerDefect'),
            "Deck": getCards('deckContainerDefect'),
            "RareDeck": getCards('rareDeckContainerDefect')
        },
        "Watcher": {
            "Players": document.getElementById('playersWatcher').value,
            "Health": lockedHearts['healthContainerWatcher'].length,
            "Gold": getGold('goldContainerWatcher'),
            "Potions": getCards('potionsContainerWatcher'),
            "Relics": getItems('relicsContainerWatcher'),
            "BossRelics": getItems('bossRelicsContainerWatcher'),
            "SkippedRares": getCards('skippedRaresContainerWatcher'),
            "RemovedCards": getCards('removedCardsContainerWatcher'),
            "Deck": getCards('deckContainerWatcher'),
            "RareDeck": getCards('rareDeckContainerWatcher')
        }
    }

    // Convert JSON object to string
    const jsonString = JSON.stringify(json);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    link.download = date.toLocaleDateString().replace(", ", "_") + '_' + json.General.CampaignName.replaceAll(" ", "_") + '.json';

    // Append the link to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getAct() {
    let actContainer = document.getElementById('actButtonContainer');
    return actContainer.querySelector('.active').value;
}

function getKeys() {
    results = [];
    
    let keyContainer = document.getElementById('keyContainer');
    keyContainer.querySelectorAll('.glow').forEach(key => {
        if (key.style.visibility == 'visible') {
            results.push(key.getAttribute('value'));
        }
    });

    return results;
}

function getGold(containerId) {
    let container = document.getElementById(containerId);
    return Number(container.querySelector('.goldCounter').innerText);
}

function getItems(containerId) {
    let container = document.getElementById(containerId);
    let items = Array.from(container.querySelectorAll('.item-label'));
    return items.map(item => item.innerText).sort();
}

function getCards(containerId) {
    let container = document.getElementById(containerId);
    let items = Array.from(container.querySelectorAll('.card-label'));
    return items.map(item => item.innerText).sort();
}