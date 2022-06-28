let redPos = 0;
let bluePos = 0;

let redKey = true;
let blueKey = true;

let racing = false;

//SERVER CONNECTION CODE

const ws = new WebSocket("ws://localhost:8080/");

ws.onopen = function () {
    console.log("WebSocket Client Connected");
    ws.send("Hi this is web client.");
};

ws.onmessage = function (e) {
    console.log("Received: '" + e.data + "'");
    let data = e.data.split(" ");
    if (data[0] == "pos") {
        redPos = parseInt(data[1]);
        bluePos = parseInt(data[2]);
    } else if (data[0] == "winner") {
        //see if red or blue win
        win();
        if (data[1] == "blue") {
            console.log("blue won");
            resultsDisplay.innerHTML = "Blue wins!";
        } else if (data[1] == "red") {
            console.log("red won");
            resultsDisplay.innerHTML = "Red wins!";
        }
    } else if (data[0] == "countdown") {
        resultsDisplay.innerHTML = data[1];
    }
    else if(data[0] == "go"){
        startGame();
    }
};

//END SERVER CONNECTION CODE

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resultsDisplay = document.getElementById("results");
document.addEventListener("keydown", keyboardHandler);
document.body.style.backgroundColor = "#b3ccf5";

const redCar = document.getElementById("redcar");
const blueCar = document.getElementById("bluecar");
const btn = document.getElementById("startbutton");

const finishLine = canvas.width - 15;

let drawID = setInterval(draw, 33);

function startGame() {
    btn.style.visibility = "hidden";
    redPos = 0;
    bluePos = 0;
    redKey = true;
    blueKey = true;
    racing = true;
    resultsDisplay.innerHTML = "GO!";
}

function sendStart(){
    ws.send("start");
}

function drawTrack() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ccac39"; // yellow
    for (let i = 0; i < canvas.width; i += 14) {
        ctx.fillRect(i, canvas.height / 2, 7, 2);
    }
    ctx.fillStyle = "black";
    ctx.fillRect(finishLine, 0, 7, canvas.height);
}

function draw() {
    drawTrack();
    ctx.drawImage(redCar, redPos, 7);
    ctx.drawImage(blueCar, bluePos, 46);
}

function win() {
    racing = false;
    btn.innerHTML = "Play again";
    btn.style.visibility = "visible";
}

function keyboardHandler(event) {
    if (event.keyCode == 65) {
        // a
        if (redKey) {
            ws.send("move red");
            //redPos += speed;
            redKey = false;
        }
    } else if (event.keyCode == 83) {
        // s

        if (!redKey) {
            ws.send("move red");
            // redPos += speed;
            redKey = true;
        }
    } else if (event.keyCode == 74) {
        // j
        if (blueKey) {
            //bluePos += speed;
            blueKey = false;
            ws.send("move blue");
        }
    } else if (event.keyCode == 75) {
        // k
        if (!blueKey) {
            //bluePos += speed;
            blueKey = true;
            ws.send("move blue");
        }
    }
}
