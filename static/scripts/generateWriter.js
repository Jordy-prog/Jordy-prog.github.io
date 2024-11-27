import { getImageObject } from "./readImageList.js";
import { setupItems } from "./itemModals.js";
import { setupCards } from "./cardModals.js";

const jsonImageObject = await getImageObject();
generateModals();
setupItems();
setupCards();


function generateModals() {
    generateGeneralModals();
}

function generateGeneralModals() {
    let container = document.getElementById('skippedRelicsModal').querySelector('.modal-body')

    jsonImageObject.relics.forEach(relic => {
        let relicElement = document.createElement('div');
        relicElement.id = "skippedRelicsContainer_" + relic;
        relicElement.classList.add("item");
        relicElement.setAttribute("data-copy-target", "skippedRelicsContainer");
        relicElement.innerHTML = `
            <img class="item-image" src="/static/images/relics/${relic}.png">
            <div class="item-footer">
                <img class="item-checkbox" src="/static/images/tickbox_unticked.png">
                <span class="item-label">${toTitleCase(relic)}</span>
            </div>
        `
        container.appendChild(relicElement);
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