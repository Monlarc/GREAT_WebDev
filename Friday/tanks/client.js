// Create WebSocket connection.
let socket;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let direction = "up";
let moving = "false";

function move(event){
    switch(event.key){
        case 'w':
            // socket.send("{\"moving\": \"true\", \"dir\":\"up\"}")
            moving = "true";
            direction = "up";
            break;
        case 'a':
            // socket.send("{\"moving\": \"true\", \"dir\":\"left\"}")
            moving = "true";
            direction = "left";
            break;
        case 's':
            // socket.send("{\"moving\": \"true\", \"dir\":\"down\"}")
            moving = "true";
            direction = "down";
            break;
        case 'd':
            // socket.send("{\"moving\": \"true\", \"dir\":\"right\"}")
            moving = "true";
            direction = "right";
            break;
    }
}

document.addEventListener('keydown', move);



function drawMap(event){
    // console.log(event.data)
    const map = JSON.parse(event.data);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "white";
    for(const element of map){
        ctx.fillRect(element[0], element[1], 10, 10);
    }
    // console.log(map);


}

function openConnection() {
    socket = new WebSocket("ws://10.17.250.208:8080");
    // Connection opened
    socket.addEventListener("open", function (event) {
        console.log("connected to server");
    });

    // Listen for messages
    socket.addEventListener("message", drawMap);
}

function pingServer(){
    socket.send("{\"moving\": \"" + moving + "\", \"dir\": \"" + direction + "\"}");
    moving = "false";
}

setInterval(pingServer, 33);