var gifOrImgPopup = function(url, duration) {
    var node = document.createElement("img");
    node.src = url;
    // node.height = 200;
    // node.width = 300;
    document.getElementById("bubble-in").appendChild(node);
    removeBubbleContent(duration)
}

var videoPopup = function(url, duration, volume) {
    var node = document.createElement("video");
    node.play();
    node.volume = volume;
    node.innerHTML = `<source src="${url}" type="video/mp4">`
    document.getElementById("bubble-in").appendChild(node);
    removeBubbleContent(duration)
}

var textPopup = function(text, duration) {
    if (text.length <= 200) {
        document.getElementById("bubble-in").innerText = text;
        removeBubbleContent(duration)
    }
}

function removeBubbleContent(time) {
    setTimeout(() => {
        document.getElementById("bubble-in").innerHTML = "";
        queueStarted = false;
        queueStart()
    }, time);
}