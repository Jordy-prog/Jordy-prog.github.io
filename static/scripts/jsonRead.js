document.getElementById('jsonInput').addEventListener('change', loadJsonFile);

function loadJsonFile() {
    fileToJSON(document.getElementById('jsonInput'));

    document.getElementById("mainPage").style.visibility = 'visible';
    document.getElementById("jsonGetDiv").style.visibility = 'hidden';
    
}

function fileToJSON(jsonInput) {    
    try {
        var fileReader = new FileReader();

        fileReader.onload = jsonToArray;
        
        fileReader.readAsText(jsonInput.files[0])
    } catch {
        console.log("Error loading file. Are you sure you selected a file?")
        console.log(error);
    }
}

function jsonToArray(event) {
    try {
        let stringFile = event.target.result;
        let jsonFile = JSON.parse(stringFile);

        //console.log(stringFile);

        displayGeneral(jsonFile.General);
        



    } catch {
        console.log("Error parsing file. Are you sure the file is in the right format?")
        console.log(error);
    }
}

function displayGeneral(generalObject) {
    document.getElementById("campaignName").innerHTML = generalObject.CampaignName;
    document.getElementById("campaignDate").innerHTML = generalObject.Date;
    document.getElementById("actDisplay").innerHTML = "Act " + generalObject.Act;
    document.getElementById("ascDisplay").innerHTML = "Ascension " + generalObject.Ascension;


    const keyColors = ["Red", "Blue", "Green"];
    generalObject.Keys.forEach(element => {
        if (keyColors.includes(element)) {
            document.getElementById("key" + element + "Glow").style.visibility = "visible";
        }
    }); 

    //Fill relic lists
    fillItemList("relics", generalObject.SkippedRelics, document.getElementById("skippedRelicsBody"));
    fillItemList("boss_relics", generalObject.SkippedBossRelics, document.getElementById("skippedBossRelicsBody"));

    //Fille potions and cards
    fillItemList("potions", generalObject.SkippedPotions, document.getElementById("skippedPotionsBody"));

    console.log('hey');

}


function fillItemList(listName, itemList, itemContainer) {
    
    if (itemList.length != 0) {
        itemList.forEach(element => {
            var lowerCaseName = element.toLowerCase();
            var convertedName = lowerCaseName.replace(/ /g, "_");
            

            var htmlString = '<div class="item">'
                            + '<img class="item-image" src="/static/images/' + listName + '/' + convertedName + '.png">'
                            + '<div class="item-footer">'
                            + '<span class="item-label">' + element + '</span>'
                            + '</div>'
                            + '</div>';  
        
            itemContainer.innerHTML += htmlString;
            console.log(htmlString);
            console.log('hey');
        });
    } else {
        itemContainer.innerHTML += '<span class="containerPlaceholder">None!</span>';
    }
} 