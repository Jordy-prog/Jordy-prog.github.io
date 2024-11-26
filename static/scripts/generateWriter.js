fetch(new Request('/static/testList.json'))
    .then(response => {
            if (!response.ok) {
                throw new Error(`Fetch error! ${response.status}`);
            }
            return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });