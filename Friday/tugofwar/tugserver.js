const WebSocketServer = require("ws");

const wss = new WebSocketServer.Server({ port: 8080 });

const speed = 0.01;
const max = 1.0;
const midpoint = max / 2.0;
let ropePos = midpoint;

let clients = [];

// let idTracker = 0;

wss.on("connection", (ws) => {
    console.log("new client connected");
    // console.log(clientStatuses);
    // ws.send("{id: '" + idTracker + "'}");
    clients.push(ws);
    console.log(clients);
    // idTracker++;

    // sending message
    ws.on("message", (data) => {
        console.log(`Client has sent us: ${data}`);

        if(data == "move left"){
            ropePos = Math.max(0, ropePos - speed);
        }
        else if(data == "move right"){
            ropePos = Math.min(max, ropePos + speed);
        }
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("a client has disconnected");
        clients.splice(clients.indexOf(ws), 1);
        // delete clientStatuses.ws;
        console.log(clients);
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred");
    };
});

function messageClients(){
    clients.forEach((ws) => {
        ws.send(ropePos);
    })
}

setInterval(messageClients, 33);

console.log("The WebSocket server is running on port 8080");
