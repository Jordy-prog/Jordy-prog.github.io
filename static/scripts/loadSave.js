function getEl(id) {
    return document.getElementById(id);
}

getEl('loadButton').addEventListener('click', () => {
    getEl('jsonInput').click();
})
getEl('jsonInput').addEventListener('change', loadSave);
 
function loadSave() {    
    const jsonInput = getEl('jsonInput');

    try {
        let fileReader = new FileReader();
        fileReader.onload = populateFields;     
        fileReader.readAsText(jsonInput.files[0]);
    } catch {
        console.log("Error loading file. Are you sure you selected a file?");
        console.log(error);
    }
}

function populateFields(event) {
    let jsonFile;

    try {
        const stringFile = event.target.result;
        jsonFile = JSON.parse(stringFile);
    } catch (error) {
        console.log("Error parsing file. Are you sure the file is in the right format?")
        console.log(error);
    }

    populateGeneral(jsonFile.General);
    populatePlayer(jsonFile.Ironclad, "ironclad");
    populatePlayer(jsonFile.Silent, "silent");
    populatePlayer(jsonFile.Defect, "defect");
    populatePlayer(jsonFile.Watcher, "watcher");
}

function populateGeneral(generalObject) {
    getEl('campaignName').value = generalObject.CampaignName;
    getEl(`act${generalObject.Act}`).click();
    getEl("ascensionRange").value = generalObject.Ascension;
    getEl("ascensionValue").innerText = generalObject.Ascension;

    for (key of generalObject.Keys) {
        getEl(`key${key}Container`).click()
    }

    [
        'SkippedRelics',
        'SkippedBossRelics',
        'SkippedPotions',
        'SkippedCurses',
        'SkippedColorless',
    ].forEach((key) => {
        const items = generalObject[key];
        selectModalItems(key, items)
    });
}

function populatePlayer(playerObject, character) {
    const upperChar = character.charAt(0).toUpperCase() + character.slice(1);

    getEl(`players${upperChar}`).value = playerObject.Players;

    // Health
    const heartContainers = [...getEl(`healthContainer${upperChar}`).querySelectorAll('.heartContainer')];
    const heartButton = heartContainers.find((container) => 
        Number(container.querySelector('.heartLabel').textContent) === playerObject.Health
    );
    heartButton.dispatchEvent(new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true
    }));
    heartButton.click();

    // Gold
    const goldIncButton = getEl(`goldContainer${upperChar}`).querySelector('.goldChanger');
    for (let i = 0; i < playerObject.Gold; i++) {
        goldIncButton.click();
    }

    // Modals
    [
        'Relics',
        'BossRelics',
        'Potions',
    ].forEach((key) => {
        const items = playerObject[key];
        selectModalItems(key, items, upperChar);
    });

    [
        'Deck',
        'RareDeck',
        'RemovedCards',
        'SkippedRares',
    ].forEach((key) => {
        const cards = playerObject[key];
        selectModalCards(key, cards, upperChar);
    });
}

function selectModalItems(key, items, player) {
    const lowerKey = key.charAt(0).toLowerCase() + key.slice(1);
    const modalId = lowerKey + 'Modal' + (player ?? '');

    items.forEach((item) => {
        const lowerItem = item.toLowerCase().replaceAll(' ', '_')
        const id = [modalId, lowerItem].join('_');
        getEl(id).click();
    })
}

function selectModalCards(key, cards, player) {
    const lowerKey = key.charAt(0).toLowerCase() + key.slice(1);
    const modalId = lowerKey + 'Modal' + (player ?? '');

    cardCounter = {}

    cards.forEach((card) => {
        let lowerCard = card.toLowerCase().replaceAll(' ', '_')
        let upgrade = false;

        if (lowerCard.endsWith('+')) {
            lowerCard = lowerCard.slice(0, lowerCard.length - 1);
            upgrade = true;
        }

        let id = [modalId, lowerCard].join('_');

        if (cardCounter[id] === undefined) {
            cardCounter[id] = 0;
        } else {
            cardCounter[id]++;
        }

        id = id + String(cardCounter[id]);

        getEl(id).click();

        if (upgrade) {
            getEl(id).querySelector('.card-upgrade').click();
        }
    })
}