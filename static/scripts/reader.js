function toggleActive(element) {
    var nav = document.getElementById("formNav")
    var images = nav.querySelectorAll("img")
    images.forEach(img => {
        img.classList.remove("active")
    });
    element.classList.add("active")
}

function loadJson() {

    var json = JSON.parse()
    
}



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