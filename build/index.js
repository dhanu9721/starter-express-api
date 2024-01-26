"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Import Colyseus config
// import app from "./app.config";
const colyseus_1 = require("colyseus");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const ws_transport_1 = require("@colyseus/ws-transport");
const MyRoom_1 = require("./rooms/MyRoom");
// // Create and listen on 2567 (or PORT environment variable.)
// listen(app);
console.info("colyseus server starting");
// return;
const portString = process.env.PORT || "2567";
const port = parseInt(portString, 10);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/matchmake/joinOrCreate", (req, res) => {
    // Your logic for handling the GET request goes here
    res.status(200).send("Handling GET request for /matchmake/joinOrCreate");
});
app.get("/matchmake/joinOrCreate/", (req, res) => {
    // Your logic for handling the GET request goes here
    res.status(200).send("Handling GET request for /matchmake/joinOrCreate/");
});
// Use regular HTTP in development
const server = (0, http_1.createServer)(app);
let gameServer = new colyseus_1.Server({
    transport: new ws_transport_1.WebSocketTransport({
        server,
        verifyClient: (info, next) => {
            next(true);
        },
    }),
});
gameServer.define('GameRoom', MyRoom_1.MyRoom);
gameServer.listen(port).then(() => {
    console.info("Game started and listening on port", port);
})
    .catch((err) => {
    console.error("Failed to listen on port" + err);
});
console.info(`Server running on port ${port}`);
