
  
function toggleActive(element) {
    var nav = document.getElementById("formNav")
    var images = nav.querySelectorAll("img")
    images.forEach(img => {
        img.classList.remove("active")
    });
    element.classList.add("active")
}

function addHearts() {
    const classNames = ['ironclad', 'silent', 'defect', 'watcher']

    classNames.forEach(element => {
        var healthContainer = document.getElementById(element + "HealthContainer");
        var amount = 9;
        if(element == "ironclad") { amount = 10; }

        console.log(healthContainer);

        for(let i = 1; i <= amount; i++) {
            healthContainer.innerHTML += '<div class="heartContainer">' 
                                    + '<img src="static/images/heartBroken.png" class="healthHeart">'
                                    + '<label class="heartLabel">' + i + '</label>'
                                    + '</div>'

        }
    });    
}

window.onload = addHearts();
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