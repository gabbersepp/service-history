export function newObjFrom(source) {
    const target = {};
    for(const prop in source) {
        target[prop] = source[prop];
    }
    return target;
}

export function applyImageViewer(element) {
        const oldContainer = document.getElementById("img-container");
        if (oldContainer) {
            oldContainer.remove();
        }
        const imgContainer = document.createElement("div");
        imgContainer.id="img-container";
        const img = document.createElement("img");
        img.src=element.src;
        imgContainer.appendChild(img);
        imgContainer.onclick = () => imgContainer.remove();
        document.getElementsByTagName("body")[0].appendChild(imgContainer);
}

export function distinct(listOfStrings) {
    const obj = {};
    listOfStrings.forEach(x => obj[x] = 1);
    return Object.keys(obj);
}