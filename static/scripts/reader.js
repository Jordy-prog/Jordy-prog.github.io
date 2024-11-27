
  
function toggleActive(element) {
    var nav = document.getElementById("formNav")
    var images = nav.querySelectorAll("div")
    images.forEach(img => {
        img.classList.remove("active")
    });
    element.classList.add("active")
}

const classNames = ['ironclad', 'silent', 'defect', 'watcher']

function createPlayerPages() {
    //Create the basic page for each character
    classNames.forEach(element => {

        document.getElementById(element).innerHTML += 
                '<div class="playerContainer">'
                +'    <img class="playerNameBanner" src="/static/images/disabledButton.png">'
                +'    <h2 class="playerNameText" id="' + element + 'Names">A Spooky Ghost!</h2>'
                +'    <img class="playerIcon" src="/static/images/' + element + 'Icon.png">'
                +'</div>'
                +'<!-- Health -->'
                +'<div id="' + element + 'HealthContainer" class="healthContainer">'
                +'</div>'

                +'<!-- Gold -->'
                +'<div id="' + element + 'GoldContainer" class="goldContainer">'
                +'    <div class="goldCoinContainer">'
                +'        <img src="static/images/goldCoinOrb.png" class="goldCoin">'
                +'        <label id="' + element + 'GoldCount" class="goldCounter">0</label>'
                +'    </div>'
                +'</div>'

                +'<!--Item containers -->'
                +'<div id="' + element + 'RelicsContainer" class="relicContainer">'
                +'    <div class="containerHeader">'
                +'        <img class="containerLabelImage relicTag" src="/static/images/panelTag.png">'
                +'        <span class="containerLabel">Relics</span>'
                +'    </div>'
                +'    <div class="containerBody" id="' + element + 'RelicsBody">'

                +'    </div>'
                +'</div>'
                +'<div id="' + element + 'BossRelicsContainer" class="relicContainer">'
                +'    <div class="containerHeader">'
                +'        <img class="containerLabelImage bossRelicTag" src="/static/images/panelTag.png">'
                +'        <span class="containerLabel">Boss Relics</span>'
                +'    </div>'
                +'    <div class="containerBody" id="' + element + 'BossRelicsBody">'

                +'    </div>'
                +'</div>'
                +'<div id="' + element + 'PotionsContainer" class="relicContainer">'
                +'    <div class="containerHeader">'
                +'        <img class="containerLabelImage potionTag" src="/static/images/panelTag.png">'
                +'        <span class="containerLabel">Potions</span>'
                +'    </div>'
                +'    <ul class="containerBody" id="' + element + 'PotionsBody">'

                +'    </ul>'
                +'</div>'

                +'<!--Deck containers-->'
                +'<div id="' + element + 'DeckContainer" class="relicContainer">'
                +'    <div class="containerHeader">'
                +'        <img class="containerLabelImage deckTag" src="/static/images/panelTag.png">'
                +'        <span class="containerLabel">Deck</span>'
                +'    </div>'
                +'    <ul class="containerBody" id="' + element + 'DeckBody">'

                +'    </ul>'
                +'</div>'
                +'<div id="' + element + 'RareContainer" class="relicContainer">'
                +'    <div class="containerHeader">'
                +'        <img class="containerLabelImage rareDeckTag" src="/static/images/panelTag.png">'
                +'        <span class="containerLabel">Rare Cards</span>'
                +'    </div>'
                +'    <ul class="containerBody" id="' + element + 'RareBody">'

                +'    </ul>'
                +'</div>'

                +'<!--Removed cards containers-->'
                +'<div id="' + element + 'RemovedContainer" class="relicContainer">'
                +'    <div class="containerHeader">'
                +'        <img class="containerLabelImage removedTag" src="/static/images/panelTag.png">'
                +'        <span class="containerLabel">Removed Cards</span>'
                +'    </div>'
                +'    <ul class="containerBody" id="' + element + 'RemovedBody">'

                +'    </ul>'
                +'</div>'
                +'<div id="' + element + 'SkippedRareContainer" class="relicContainer">'
                +'    <div class="containerHeader">'
                +'        <img class="containerLabelImage skippedRareTag" src="/static/images/panelTag.png">'
                +'        <span class="containerLabel">Skipped Rares</span>'
                +'    </div>'
                +'    <ul class="containerBody" id="' + element + 'SkippedRareBody">'
                +'        '
                +'    </ul>'
                +'</div>';
    });   
    addHearts();
}

function addHearts() {

    classNames.forEach(element => {
        var healthContainer = document.getElementById(element + "HealthContainer");
        var amount = 9;
        if(element == "ironclad") { amount = 10; }

        //console.log(element);
        //console.log(healthContainer);

        for(let i = 1; i <= amount; i++) {
            healthContainer.innerHTML += '<div class="heartContainer">' 
                                    + '<img src="static/images/heartBroken.png" class="healthHeart">'
                                    + '<label class="heartLabel">' + i + '</label>'
                                    + '</div>'
        }
    });    
}

window.onload = createPlayerPages();
/*     "Ironclad": {
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
    */