import asyncio
import random
import websockets
import json

playerCount = 0
map_size = 500


positions = []

async def send_map(websocket, id):
    message = json.dumps(positions)
    # print(message)
    await websocket.send(message)

async def receive_move(websocket, id):
    message = await websocket.recv()
    # print(message)
    try:
        dict = json.loads(message)
        if dict["moving"] == "true":
            if dict["dir"] == "up":
                positions[id] = (positions[id][0],  positions[id][1] - 5)
            elif dict["dir"] == "right":
                positions[id] = (positions[id][0] + 5,  positions[id][1])
            elif dict["dir"] == "down":
                positions[id] = (positions[id][0],  positions[id][1] + 5)
            elif dict["dir"] == "left":
                positions[id] = (positions[id][0] - 5,  positions[id][1])
    except:
        print("invalid message from client " + str(id))
        return
    
    

async def handler(websocket):
    global playerCount
    player_id = playerCount
    playerCount += 1
    # await websocket.send("Welcome player " + str(player_id))
    positions.append((random.randint(0, map_size), random.randint(0, map_size)))


    while True:
        await send_map(websocket, player_id)
        await receive_move(websocket, player_id)

async def main():
    async with websockets.serve(handler, "", 8080):
        await asyncio.Future()  # run forever

asyncio.run(main())