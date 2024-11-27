
import { jsonCardObject } from "./readCardList.js";

document.getElementById('jsonInput').addEventListener('change', loadJsonFile);
    
//displays actual reader after uploading file 
//TODO: Only do so on succesful parse!!!
function loadJsonFile() {
    fileToJSON(document.getElementById('jsonInput'));
    
    document.getElementById("mainPage").style.visibility = 'visible';
    document.getElementById("generalNav").classList += 'active';
    document.getElementById("jsonGetDiv").style.display = 'none';
    
}


//Mostly just filereader translation to 
function fileToJSON(jsonInput) {    
    try {
        let fileReader = new FileReader();

        fileReader.onload = jsonParse;     

        fileReader.readAsText(jsonInput.files[0])
    } catch {
        console.log("Error loading file. Are you sure you selected a file?")
        console.log(error);
    }
}
;

function jsonParse(event) {
    try {
        let stringFile = event.target.result;
        let jsonFile = JSON.parse(stringFile);

        displayGeneral(jsonFile.General);
        displayPlayer(jsonFile.Ironclad, "ironclad");
        displayPlayer(jsonFile.Silent, "silent");
        displayPlayer(jsonFile.Defect, "defect");
        displayPlayer(jsonFile.Watcher, "watcher");


    } catch (error) {
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

    //GENERAL
    //Fill relic lists
    fillItemList("relics", generalObject.SkippedRelics, document.getElementById("skippedRelicsBody"));
    fillItemList("boss_relics", generalObject.SkippedBossRelics, document.getElementById("skippedBossRelicsBody"));

    //Fill potions and cards
    fillCardList("potions", generalObject.SkippedPotions, document.getElementById("skippedPotionsBody"));
    fillCardList("curses", generalObject.SkippedCurses, document.getElementById("skippedCursesBody"));
    fillCardList("colorless", generalObject.SkippedColorless, document.getElementById("skippedColorlessBody"));



}

function displayPlayer(playerObject, playerClass) {
    try {
    document.getElementById(playerClass + "Names").innerHTML = playersToString(playerObject.Players);

    setPlayerHealth(document.getElementById(playerClass + "HealthContainer"), playerObject.Health);
    document.getElementById(playerClass + "GoldCount").innerHTML = playerObject.Gold;

    //Fille relic lists
    fillItemList("relics", playerObject.Relics, document.getElementById(playerClass + "RelicsBody"));
    fillItemList("boss_relics", playerObject.BossRelics, document.getElementById(playerClass + "BossRelicsBody"));
    
    //fill potions and cards
    fillCardList("potions", playerObject.Potions, document.getElementById(playerClass + "PotionsBody"));
    fillCardList(playerClass, playerObject.Deck, document.getElementById(playerClass + "DeckBody"));
    fillCardList(playerClass, playerObject.RareDeck, document.getElementById(playerClass + "RareBody"));
    fillCardList(playerClass, playerObject.RemovedCards, document.getElementById(playerClass + "RemovedBody"));
    fillCardList(playerClass, playerObject.SkippedRares, document.getElementById(playerClass + "SkippedRareBody"));

    } catch (error) {
        console.log("Error parsing player! (" + playerClass + ") Are you sure the file is in the right format?");
        console.log(error);
    }
}


function fillItemList(listName, itemList, itemContainer) {
    
    if (itemList.length != 0) {
        itemList.forEach(element => {
            let lowerCaseName = element.toLowerCase();
            let convertedName = lowerCaseName.replace(/ /g, "_");
            

            let htmlString = '<div class="item">'
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

function fillCardList(listName, cardList, cardContainer) {

    if (cardList.length != 0) {
        cardList.forEach(element => {
            let filePath = '/static/images/';
            //convert a written name to the file name
            let lowerCaseName = element.toLowerCase();
            let convertedName = lowerCaseName.replace(/ /g, "_");
            //remove upgrade for file name
            let extraClass = "";
            if(convertedName.endsWith("+")){
                convertedName = convertedName.substring(0, convertedName.length - 1);
                extraClass = "upgraded-card-label";
            }

            //set image class for sizing
            let imageClass = "";
            let itemClass = "";
            if(listName == "potions") {
                filePath += "potions/" + convertedName + ".png";
                imageClass = "potion-image";
            } else {
                let rarity = getCardRarity(listName, convertedName);
                if(rarity == "colorless" || rarity == "curses") {
                    filePath += "cards/" + rarity + "/" + convertedName + ".png";
                } else { 
                    filePath += "cards/" + listName + "/" + rarity + "/" + convertedName + ".png";
                }

                itemClass = rarity + "-card";
                
                imageClass = "card-image";
            }
            //Create html element
            let htmlString = '<li class="card-list-item ' + itemClass + '">'
                            + '<span class="card-label ' + extraClass + '">' + element + '</span>'
                            + '<div class="flex-spacer"></div>'
                            + '<img class="' + imageClass + '" src=' + filePath + '>';
                            + '</li>';                            
        
            cardContainer.innerHTML += htmlString;
            console.log(htmlString);
            console.log('hey');
        });
    } else {
        cardContainer.innerHTML += '<span class="containerPlaceholder">None!</span>';
    }
}

 
function getCardRarity(playerName, cardName) {

    let rarity = "";
    Object.entries(jsonCardObject.cards[playerName]).forEach(([listKey, list]) => {
        //console.log(listKey);
        Object.entries(list).forEach(card => {

            if(card[1] == cardName) {
                rarity = listKey;
            } 
        });
    });
    if(rarity == "") {
        Object.entries(jsonCardObject.cards["curses"]).forEach(card => {
            if(card[1] == cardName) {
                rarity = "curses";
            } 
        });
        Object.entries(jsonCardObject.cards["colorless"]).forEach(card => {
            if(card[1] == cardName) {
                rarity = "colorless";
            } 
        });

    }

    return rarity;
}

function playersToString(playerObject) {
    var stringToReturn = "";

    playerObject.forEach((element, index )=> {
        if(index == 0) {
            stringToReturn += element;
        } else if (index > 0 && index < playerObject.length - 1) {
            stringToReturn += ", " + element;
        } else {
            stringToReturn += " and " + element;
        }

        
    console.log(stringToReturn);
    });


    return stringToReturn;
}

function setPlayerHealth(heartContainer, amount) {
    var hearts = Array.from(heartContainer.children);

    for(let i = 0; i < amount; i++ ) {
        hearts[i].style.backgroundImage = "url('/static/images/heartFull.png')";
    }
        
}
