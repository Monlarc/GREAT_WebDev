const WebSocketServer = require("ws");

const wss = new WebSocketServer.Server({ port: 8080 });

let map = {
    asteroidX: [],
    asteroidY: [],
    playerPositions: {},
    king: 0,
    leaderboard: [],
    leaderboardChanged: false
};

let playerVelocities = {};
let playerTimeAlive = {};

const asteroidSpeed = 5;

let clients = {};
let clientID = 0;
const speed = 9;
const playerSize = 30;
const asteroidSize = 15;

const screenWidth = 500;
const screenHeight = 500;

wss.on("connection", (ws) => {
    console.log("client " + clientID + " connected");
    clients[clientID] = ws;
    clients[clientID]._socket._sockname = clientID;
    map.playerPositions[clientID] = Math.round(Math.random() * (screenWidth - playerSize));
    playerVelocities[clientID] = { left: 0, right: 0 };
    playerTimeAlive[clientID] = 0;
    clientID++;
    updateLeaderboard();

    ws.on("message", (data) => {
        let id = ws._socket._sockname;
        // console.log(`Client ${id} has sent us: ${data}`);
        if (data == "left") {
            playerVelocities[id].left = -speed;
        } else if (data == "right") {
            playerVelocities[id].right = speed;
        } else if (data == "stop left") {
            playerVelocities[id].left = 0;
        } else if (data == "stop right") {
            playerVelocities[id].right = 0;
        }
    });

    ws.on("close", () => {
        for (let key in clients) {
            if (clients[key]._socket._sockname == null) {
                delete clients[key];
                delete map.playerPositions[key];
                delete playerVelocities[key];
                delete playerTimeAlive[key];
                console.log(`client ${key} has disconnected`);
            }
        }

        updateLeaderboard();
    });

    ws.onerror = function () {
        console.log("error with client " + ws._socket._sockname);
    };
});

function gameLoop() {
    if (Math.random() > 0.8) {
        map.asteroidX.push(Math.round(Math.random() * screenWidth));
        map.asteroidY.push(0);
    }

    for (let key in clients) {
        playerTimeAlive[key] += 1;
        map.playerPositions[key] =
            map.playerPositions[key] +
            playerVelocities[key].left +
            playerVelocities[key].right;
        if (map.playerPositions[key] < 0) {
            map.playerPositions[key] = 0;
        } else if (map.playerPositions[key] + playerSize > screenWidth) {
            map.playerPositions[key] = screenWidth - playerSize;
        }
    }

    for (let i = 0; i < map.asteroidY.length; i++) {
        map.asteroidY[i] = map.asteroidY[i] + asteroidSpeed;
        if (map.asteroidY[i] > screenHeight) {
            map.asteroidY.splice(i, 1);
            map.asteroidX.splice(i, 1);
        }
    }

    collisionDetection();
    updateKing();
    messageClients();
}

function updateLeaderboard(){
    map.leaderboard = Object.keys(clients).sort((a, b) => {
        return playerTimeAlive[b] - playerTimeAlive[a];
    });
    map.leaderboardChanged = true;
}

function updateKing() {
    let max = 0;
    for (let id in clients) {
        if (playerTimeAlive[id] > playerTimeAlive[max]) {
            max = id;
        }
    }
    map.king = max;
}

function collisionDetection() {
    for (let i = 0; i < map.asteroidY.length; i++) {
        if (map.asteroidY[i] > screenHeight - playerSize - asteroidSize) {
            for (let id in map.playerPositions) {
                if (
                    map.asteroidX[i] + asteroidSize >=
                        map.playerPositions[id] &&
                    map.asteroidX[i] <= map.playerPositions[id] + playerSize
                ) {
                    killPlayer(id);
                }
            }
        }
    }
}

function killPlayer(id) {
    updateLeaderboard();
    clients[id].send("you died");
    playerTimeAlive[id] = 0;
    map.playerPositions[id] = Math.round(Math.random() * screenWidth);
}

function messageClients() {
    const message = JSON.stringify(map);
    for (let key in clients) {
        clients[key].send(message);
    }
    map.leaderboardChanged = false;
}

setInterval(gameLoop, 60);

console.log("The WebSocket server is running on port 8080");