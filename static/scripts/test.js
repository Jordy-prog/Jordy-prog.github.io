console.log("Start test...");

window
    .fetch(new Request('/static/testList.json'))
    .then((response => {
            if (!response.ok) {
                console.log("ERROR!");
                throw new Error('Fetch error! ${response.status}');
            }
            console.log("Success!");
            console.log(response);
            return response.json();
    }))
    .then((data => {
        console.log(data);
    })
)