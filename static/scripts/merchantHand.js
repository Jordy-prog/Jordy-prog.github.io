const image = document.getElementById('merchantHand');
const supportsMouse = window.matchMedia("(pointer: fine)").matches; // Checks if device has a mouse

if (supportsMouse) {
    // Show the image and move it with the cursor when hovering over the button
    document.body.addEventListener('mousemove', function(event) {
        image.style.display = 'block'; // Make image visible
        image.style.left = `${event.pageX - image.width / 2}px`; // Center the image horizontally
        image.style.top = `${event.pageY - image.height}px`; // Align the bottom of the image to the cursor
    });

    // Hide the image when not hovering
    document.body.addEventListener('mouseleave', function() {
        image.style.display = 'none';
    });
}