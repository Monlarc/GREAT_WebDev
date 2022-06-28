const startButton = document.querySelector(".startButton");
const rope = document.querySelector(".rope");

let ws;

function connect() {
    // console.log("hi");
    // startButton.style.visibility = "hidden";
    ws = new WebSocket("ws://155.98.131.0:8080/");
    ws.onopen = () => {
        ws.send("hi, server");
    };

    ws.onmessage = (data) => {
        console.log("received: " + data.data);
        // console.log(screen.width);
        const pos = Math.floor((screen.width-50) * parseFloat(data.data));
        // console.log(pos);
        rope.style.left = pos + "px";
    };

    document.addEventListener('keyup', keydownHandler);
}

function keydownHandler(event){
    if(event.key == 'a'){
        ws.send("move left");
    }
    else if(event.key == 'l'){
        ws.send("move right");
    }
}

startButton.addEventListener("mousedown", connect);