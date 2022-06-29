const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const ws = new WebSocket("ws://10.17.160.230:8080/");

let leftID;
let rightID;

const playerColors = ["dodgerblue", "crimson", "yellowgreen", "orange", "purple", "white"];

function move(event) {
    if (event.keyCode == 37) {
        ws.send("left");
    } else if (event.keyCode == 39) {
        ws.send("right");
    }
}

function stopMoving(event) {
    if (event.keyCode == 37) {
        ws.send("stop left");
    } else if (event.keyCode == 39) {
        ws.send("stop right");
    }
}

ws.onopen = () => {
    console.log("Connected to server");
    document.addEventListener("keydown", move);
    document.addEventListener("keyup", stopMoving);
};

ws.onmessage = (event) => {
    // console.log("received: " + event.data);
    if (event.data == "you died") {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        draw(JSON.parse(event.data));
    }
};

function draw(map) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "goldenrod";
    for (let i = 0; i < map["asteroidX"].length; i++) {
        ctx.fillRect(map.asteroidX[i], map.asteroidY[i], 15, 15);
    }

    for (let key in map.playerPositions) {
        ctx.fillStyle = playerColors[parseInt(key) % playerColors.length];
        ctx.fillRect(parseInt(map.playerPositions[key]), canvas.height - 30, 30, 30);
        if (key == map.king) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(map.playerPositions[key], canvas.height - 40, 30, 10);
        }
    }

    if(map.leaderboardChanged){
        drawLeaderboard(map.leaderboard);
    }
}

function drawLeaderboard(leaderboard){
    let i;
    for(i = 0; i < Math.min(5, leaderboard.length); i++){
        document.getElementById(i.toString()).innerHTML = playerColors[leaderboard[i]];
    }
    for(; i < 5; i++){
        document.getElementById(i.toString()).innerHTML = "";
    }
}
