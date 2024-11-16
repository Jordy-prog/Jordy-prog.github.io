let lockedHearts = {};
let healthContainers = document.querySelectorAll('.healthContainer');

healthContainers.forEach(healthContainer => {
    let containerId = healthContainer.getAttribute('id');
    lockedHearts[containerId] = [];

    let heartContainers = Array.from(healthContainer.children);

    healthContainer.addEventListener('mouseout', () => {
        emptyHearts(heartContainers, containerId);
    });

    heartContainers.forEach(heartContainer => {
        heartContainer.addEventListener('mouseover', () => {
            fillHearts(heartContainers, heartContainer);
        })

        heartContainer.addEventListener('click', () => {
            lockHearts(heartContainers, heartContainer, containerId);
        })
    });
});

function emptyHearts(hearts, id) {
    hearts.forEach(heart => {
        if (!lockedHearts[id].includes(heart)) {
            heart.style.backgroundImage = "url('/static/images/heartBroken.png')";
        }
    });
}

function fillHearts(hearts, heart) {
    let max = hearts.findIndex(x => x === heart);

    for (let index = 0; index <= max; index++) {
        let element = hearts[index];
        element.style.backgroundImage = "url('/static/images/heartFull.png')";
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