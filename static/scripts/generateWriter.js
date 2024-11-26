fetch(new Request('/static/example.json'))
    .then(response => {
            if (!response.ok) {
                throw new Error(`Fetch error! ${response.status}`);
            }
            return response.json();
    })
    .then(data => {
        generateModals(data);
    })
    .catch(error => {
        console.error(error);
    });

function generateModals(imageObject) {
    generateGeneralModals(imageObject);
}

function generateGeneralModals(imageObject) {
    let container = document.getElementById('skippedRelicsModal').querySelector('.modal-body')

    imageObject.relics.forEach(relic => {
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