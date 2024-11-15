let counters = {};
let intervals = {};
let timeouts = {};

let goldContainers = document.querySelectorAll('.goldContainer');
goldContainers.forEach(goldContainer => {
    let containerId = goldContainer.getAttribute('id');
    counters[containerId] = 0;
    intervals[containerId] = null;
    timeouts[containerId] = null;

    let [incrementButton, decrementButton] = [...goldContainer.querySelectorAll('.goldChanger')];
    let counterDisplay = goldContainer.querySelector('.goldCounter');

    incrementButton.addEventListener('click', () => updateGoldCounter(1, counterDisplay, containerId));
    incrementButton.addEventListener('mousedown', () => startUpdating(1, counterDisplay, containerId));
    incrementButton.addEventListener('mouseup', () => stopInterval(containerId));
    incrementButton.addEventListener('mouseleave', () => stopInterval(containerId));

    decrementButton.addEventListener('click', () => updateGoldCounter(-1, counterDisplay, containerId));
    decrementButton.addEventListener('mousedown', () => startUpdating(-1, counterDisplay, containerId));
    decrementButton.addEventListener('mouseup', () => stopInterval(containerId));
    decrementButton.addEventListener('mouseleave', () => stopInterval(containerId));
});

function updateGoldCounter(amount, display, id) {
    let result = counters[id] + amount;
    if (result < 0 ) return;

    counters[id] += amount;
    display.innerHTML = counters[id];
}

function startUpdating(amount, display, id) {
    if (timeouts[id] !== null) return;

    if (!intervals[id]) {
        timeouts[id] = setTimeout(() => {
            intervals[id] = setInterval(() => {
                updateGoldCounter(amount, display, id);
            }, 100);
        }, 100);
    }
}

function stopInterval(id) {
    clearInterval(intervals[id]);
    intervals[id] = null;

    clearTimeout(timeouts[id]);
    timeouts[id] = null;
}