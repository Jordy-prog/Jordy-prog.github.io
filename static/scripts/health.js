let lockedHearts = {};
let healthContainers = document.querySelectorAll('.healthContainer');

healthContainers.forEach(healthContainer => {
    let containerId = healthContainer.getAttribute('id');
    lockedHearts[containerId] = [];

    let heartContainers = Array.from(healthContainer.children);
    let hearts = heartContainers.map(child => child.querySelector('img'));

    healthContainer.addEventListener('mouseout', () => {
        emptyHearts(hearts, containerId);
    });

    heartContainers.forEach(heartContainer => {
        let heart = heartContainer.querySelector('img');

        heartContainer.addEventListener('mouseover', () => {
            fillHearts(hearts, heart);
        })

        heartContainer.addEventListener('click', () => {
            lockHearts(hearts, heart, containerId);
        })
    });
});

function emptyHearts(hearts, id) {
    hearts.forEach(heart => {
        if (!lockedHearts[id].includes(heart)) {
            heart.src = "static/images/heartBroken.png";
        }
    });
}

function fillHearts(hearts, heart) {
    let max = hearts.findIndex(x => x === heart);

    for (let index = 0; index <= max; index++) {
        let element = hearts[index];
        element.src = "static/images/heartFull.png";
    }
}

function lockHearts(hearts, heart, id) {
    lockedHearts[id] = [];
    let max = hearts.findIndex(x => x === heart);

    for (let index = 0; index <= max; index++) {
        let element = hearts[index];
        lockedHearts[id].push(element);
    }

    emptyHearts(hearts, id);
}