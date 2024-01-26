/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to host your server on Colyseus Cloud
 *
 * If you're self-hosting (without Colyseus Cloud), you can manually
 * instantiate a Colyseus Server as documented here:
 *
 * See: https://docs.colyseus.io/server/api/#constructor-options
 */
// import { listen } from "@colyseus/tools";

// // Import Colyseus config
// import app from "./app.config";
import { Server } from "colyseus";
import express from "express";
import { createServer } from "http";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { MyRoom } from "./rooms/MyRoom";

// // Create and listen on 2567 (or PORT environment variable.)
// listen(app);

console.info("colyseus server starting");
// return;
const portString = process.env.PORT || "2567";
const port = parseInt(portString, 10);
const app = express();
app.use(express.json());

app.get("/matchmake/joinOrCreate", (req, res) => {
    // Your logic for handling the GET request goes here
    res.status(200).send("Handling GET request for /matchmake/joinOrCreate");
});
app.get("/matchmake/joinOrCreate/", (req, res) => {
    // Your logic for handling the GET request goes here
    res.status(200).send("Handling GET request for /matchmake/joinOrCreate/");
});

// Use regular HTTP in development
const server = createServer(app);

let gameServer = new Server({
    transport: new WebSocketTransport({
        server,
        verifyClient: (info: any, next: any) => {
            next(true);
        },
    }),
});

gameServer.define('GameRoom', MyRoom);
gameServer.listen(port).then(() => {
    console.info("Game started and listening on port", port);
})
    .catch((err: any) => {
        console.error("Failed to listen on port" + err)
    })
console.info(`Server running on port ${port}`);