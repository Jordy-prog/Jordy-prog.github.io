var jsonBlob = null;

window
    .fetch(new Request('/static/CardList.json'))
    .then((response => {
            if (!response.ok) {
                throw new Error('Fetch error! ${response.status}');
            }
            readCardList(response.json());
    })
) 

function readCardList(json) { 
    let fileReader = new FileReader();
    
    fileReader.onload = function(event) {
        translateCardList(JSON.parse(event.target.result));
    }
    
    fileReader.readAsText(json);
}


function translateCardList(cardJson) {
    cardJson.forEach(element => {
        console.log(element);
    });
}

