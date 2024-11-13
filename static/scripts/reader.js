document.getElementById('jsonInput').addEventListener('change', loadJsonFile);

function loadJsonFile() {
    const jsonInput = document.getElementById('jsonInput');
    console.log(jsonInput.files[0]);
    
    document.getElementById("mainPage").style.visibility = 'visible';
    document.getElementById("jsonGetDiv").style.visibility = 'hidden';
    
}
  
  function toggleActive(element) {
    var nav = document.getElementById("formNav")
    var images = nav.querySelectorAll("img")
    images.forEach(img => {
        img.classList.remove("active")
    });
    element.classList.add("active")
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