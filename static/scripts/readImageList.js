async function getImageObject() {
    try {
        const response = await fetch(new Request('/static/ImageList.json'));
    
        if (!response.ok) {
            throw new Error(`Fetch error! ${response.status}`);
        }
    
        const jsonImageObject = await response.json();
        return jsonImageObject;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { getImageObject }