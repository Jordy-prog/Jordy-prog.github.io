import { getImageObject } from "./readImageList.js";
import { setupItems } from "./itemModals.js";
import { setupCards } from "./cardModals.js";

const jsonImageObject = await getImageObject();
generateModals();
setupItems();
setupCards();

function generateModals() {
    generateGeneralModals();
    generatePlayerModals("ironclad", {
        "strike": 5,
        "defend": 4,
        "bash": 1
    });
    generatePlayerModals("silent", {
        "strike": 5,
        "defend": 5,
        "neutralize": 1,
        "survivor": 1
    });
    generatePlayerModals("defect", {
        "strike": 4,
        "defend": 4,
        "zap": 1,
        "dualcast": 1
    });
    generatePlayerModals("watcher", {
        "strike": 4,
        "defend": 4,
        "eruption": 1,
        "vigilance": 1
    });
}

function generateGeneralModals() {
    addItemsToModal("skippedRelicsModal", jsonImageObject.relics, "relics");
    addItemsToModal("skippedBossRelicsModal",  jsonImageObject.bossRelics, "boss_relics");
    addPotionsToModal("skippedPotionsModal", jsonImageObject.potions);
    addCardsToModal("skippedCursesModal", jsonImageObject.cards.curses, "curse", "curses", false)
    addCardsToModal("skippedColorlessModal", jsonImageObject.cards.colorless, "colorless", "colorless", false)
}

function generatePlayerModals(player, starterAmounts) {
    addItemsToModal(`relicsModal${toTitleCase(player)}`, jsonImageObject.relics, "relics");
    addItemsToModal(`bossRelicsModal${toTitleCase(player)}`,  jsonImageObject.bossRelics, "boss_relics");
    addPotionsToModal(`potionsModal${toTitleCase(player)}`, jsonImageObject.potions);
    // Deck Modal
    addCardsToModal(`deckModal${toTitleCase(player)}`, jsonImageObject.cards[player].starter, "starter", `${player}/starter`, true, starterAmounts);
    addCardsToModal(`deckModal${toTitleCase(player)}`, jsonImageObject.cards[player].common, "common", `${player}/common`, true);
    addCardsToModal(`deckModal${toTitleCase(player)}`, jsonImageObject.cards[player].uncommon, "uncommon", `${player}/uncommon`, true);
    addCardsToModal(`deckModal${toTitleCase(player)}`, jsonImageObject.cards[player].rare, "rare", `${player}/rare`, true);
    addCardsToModal(`deckModal${toTitleCase(player)}`, jsonImageObject.cards.curses, "curse", "curses", false);
    addCardsToModal(`deckModal${toTitleCase(player)}`, jsonImageObject.cards.colorless, "colorless", "colorless", true);
    // Rare Deck Modal
    addCardsToModal(`rareDeckModal${toTitleCase(player)}`, jsonImageObject.cards[player].rare, "rare", `${player}/rare`, true);
    // Removed Cards Modal
    addCardsToModal(`removedCardsModal${toTitleCase(player)}`, jsonImageObject.cards[player].starter, "starter", `${player}/starter`, false, starterAmounts);
    addCardsToModal(`removedCardsModal${toTitleCase(player)}`, jsonImageObject.cards[player].common, "common", `${player}/common`, false);
    addCardsToModal(`removedCardsModal${toTitleCase(player)}`, jsonImageObject.cards[player].uncommon, "uncommon", `${player}/uncommon`, false);
    addCardsToModal(`removedCardsModal${toTitleCase(player)}`, jsonImageObject.cards[player].rare, "rare", `${player}/rare`, false);
    addCardsToModal(`removedCardsModal${toTitleCase(player)}`, jsonImageObject.cards.curses, "curse", "curses", false);
    addCardsToModal(`removedCardsModal${toTitleCase(player)}`, jsonImageObject.cards.colorless, "colorless", "colorless", false);
    // Skipped Rares Modal
    addCardsToModal(`skippedRaresModal${toTitleCase(player)}`, jsonImageObject.cards[player].rare, "rare", `${player}/rare`, false);
}

function addItemsToModal(modalId, items, imagePath) {
    let modal = document.getElementById(modalId).querySelector('.modal-body');

    items.forEach(item => {
        let itemElement = document.createElement('div');
        itemElement.id = `${modalId}_${item}`;
        itemElement.classList.add("item");
        itemElement.setAttribute("data-copy-target", modalId.replace("Modal", "Container"));
        itemElement.innerHTML = `
            <img class="item-image" src="/static/images/${imagePath}/${item}.png">
            <div class="item-footer">
                <img class="item-checkbox" src="/static/images/tickbox_unticked.png">
                <span class="item-label">${toTitleCase(item)}</span>
            </div>
        `
        modal.appendChild(itemElement);
    });
}

function addPotionsToModal(modalId, potions) {
    let modal = document.getElementById(modalId).querySelector('.modal-body');
    let doublePotions = ["block_potion", "energy_potion", "explosive_potion", "fire_potion", "flex_potion", "swift_potion", "vulnerable_potion", "weak_potion"]

    potions.forEach(potion => {
        let count = 1;

        if (doublePotions.includes(potion)) {
            count = 2;
        }

        for (let i = 0; i < count; i++) {
            let potionElement = document.createElement('li');
            potionElement.id = `${modalId}_${potion}`;
            potionElement.classList.add("card-list-item");
            potionElement.setAttribute("data-copy-target", modalId.replace("Modal", "Container"));
            potionElement.innerHTML = `
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
                <span class="card-label">${toTitleCase(potion)}</span>
                <div class="flex-spacer"></div>
                <img class="potion-image" src="/static/images/potions/${potion}.png">
            `
                
            modal.appendChild(potionElement);
        }
    });
}

function addCardsToModal(modalId, cards, rarity, imagePath, upgrade=false, starterAmounts=null) {
    let modal = document.getElementById(modalId).querySelector('.modal-body');
    let curseAmounts = {
        "clumsy": 2,
        "decay": 1,
        "doubt": 1,
        "injury": 2,
        "pain": 1,
        "parasite": 2,
        "regret": 2,
        "shame": 1,
        "writhe": 1,
    }

    cards.forEach(card => {
        let count = 1;

        if (rarity == 'starter') {
            count = starterAmounts[card];
        } else if (rarity == 'curse') {
            count = curseAmounts[card];
        } else if (rarity == 'common') {
            count = 2;
        }

        for (let i = 0; i < count; i++) {
            let cardElement = document.createElement('li');
            cardElement.id = `${modalId}_${card}${i}`;
            cardElement.classList.add("card-list-item", `${rarity}-card`);
            cardElement.setAttribute("data-copy-target", modalId.replace("Modal", "Container"));
            cardElement.innerHTML = `
                <img class="card-checkbox" src="/static/images/tickbox_unticked.png">
            `
            if (upgrade) {
                cardElement.innerHTML += `
                    <img class="card-upgrade" src="/static/images/upgrade.png">
                `
            }
            cardElement.innerHTML += `
                <span class="card-label">${toTitleCase(card)}</span>
                <div class="flex-spacer"></div>
                <img class="card-image" src="/static/images/cards/${imagePath}/${card}.png">
            `
                
            modal.appendChild(cardElement);
        }
    });
}

function toTitleCase(name) {
    return name
        .toLowerCase()
        .split('_')
        .map(word => 
        word
            .split('-')
            .map(subWord => subWord.charAt(0).toUpperCase() + subWord.slice(1))
            .join('-')
        )
        .join(' ');
    }