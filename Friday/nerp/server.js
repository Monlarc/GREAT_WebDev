const WebSocketServer = require("ws");

const wss = new WebSocketServer.Server({ port: 8080 });

let redPos = 0;
let bluePos = 0;

const speed = 10;
const finishLine = 470;
let running = false;

let clients = [];
let messageClientsID;

wss.on("connection", (ws) => {
    console.log("new client connected");
    clients.push(ws);
    // console.log(clients);
    // sending message
    ws.on("message", (data) => {
        console.log(`Client has sent us: ${data}`);
        if (running) {
            if (data == "move blue") {
                bluePos += speed;
            } else if (data == "move red") {
                redPos += speed;
            }
            detectWin();
        } else if (data == "start") {
            countdown(3);
        }
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("a client has disconnected");
        clients.splice(clients.indexOf(this), 1);
        // console.log(clients);
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred");
    };
});

function detectWin() {
    if (bluePos > finishLine || redPos > finishLine) {
        end();
    }
}

function countdown(timeLeft) {
    running = true;
    if (timeLeft == 0) {
        start();
    } else {
        clients.forEach((ws) => {
            ws.send("countdown " + timeLeft);
        });
        setTimeout(countdown, 1000, timeLeft - 1);
    }
}

function start() {
    clients.forEach((ws) => {
        ws.send("go");
    });

    redPos = 0;
    bluePos = 0;
    running = true;
    messageClientsID = setInterval(messageClients, 33);
}

function end() {
    clearInterval(messageClientsID);
    running = false;
    const message = redPos > finishLine ? "winner red" : "winner blue";
    clients.forEach((ws) => {
        ws.send(message);
    });
}

function messageClients() {
    clients.forEach((ws) => {
        ws.send("pos " + redPos.toString() + " " + bluePos.toString());
    });
}

console.log("The WebSocket server is running on port 8080");
