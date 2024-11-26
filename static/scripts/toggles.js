function toggleActiveChar(element) {
    var nav = document.getElementById("formNav")
    var divs = nav.querySelectorAll("div")
    divs.forEach(div => {
        if (div.classList.contains('active')) {
            div.classList.remove("active")

            // Hide current content
            const prevId = div.getAttribute('id').replace('Nav', '');
            document.getElementById(prevId).style.display = 'none';
        }
    });
    element.classList.add("active")

    // Show new content
    const newId = element.getAttribute('id').replace('Nav', '');
    document.getElementById(newId).style.display = 'flex';
}

function toggleActiveAct(element) {
    var container = document.getElementById("actButtonContainer");
    var acts = container.querySelectorAll("button")
    acts.forEach(act => {
        act.classList.remove("active")
    });
    element.classList.add("active")
}

function toggleFancyGlowButton(el, src) {
    let img = el.querySelectorAll("img")[0]
    img.src = src
}

function toggleKeyGlow(glowId) {
    let glow = document.getElementById(glowId);
    if (glow.style.visibility == 'visible') {
        glow.style.visibility = 'hidden';
    } else {
        glow.style.visibility = 'visible';
    }
}