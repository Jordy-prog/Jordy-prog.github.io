var jsonObject;

window
    .fetch(new Request('/static/CardList.json'))
    .then(response => {
            if (!response.ok) {
                throw new Error('Fetch error! ${response.status}');
            }
            return response.json();
    }).then(promse => {        
        jsonObject = promse;
    }
)

export { jsonCardObject };
