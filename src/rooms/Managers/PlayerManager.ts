import { MapSchema, Schema, Context, type } from "@colyseus/schema";
import { Player } from "../schema/Player";
import { Client } from "colyseus";

export class PlayerManager {
  private _players: MapSchema<Player> = new MapSchema();
  private static _instance: PlayerManager = null;

  public static getInstance() {
    if (this._instance == null) {
      this._instance = new PlayerManager();
    }
    return this._instance;
  }

  initilizePlayerManager(players: MapSchema<Player>) {
    this._players = players;
  }

  addPlayer(client: Client, playerData: any) {
    playerData["sessionId"] = client.sessionId;
    let player = new Player(playerData);
    this._players.set(player.sessionId, player);
    console.log("new player added", playerData);
    // client.send("addPlayer",)
  }

  getAllPlayers() {
    return this._players;
  }

  getPlayerBySessionId(sessionId: string) {
    return this._players.get(sessionId);
  }

  removePlayer(client: Client) {
    console.log("new player removed", client.sessionId);
    this._players.delete(client.sessionId);
  }
}
