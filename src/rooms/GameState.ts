import { MapSchema, Schema, Context, type } from "@colyseus/schema";
import { PlayerManager } from "./Managers/PlayerManager";
import { Player } from "./schema/Player";
import { Client } from "colyseus";

export class GameState extends Schema {
  @type({ map: Player })
  players: MapSchema<Player> = new MapSchema<Player>();
  @type("string")
  GameState: string = "HOME";

  constructor() {
    super();
    PlayerManager.getInstance().initilizePlayerManager(this.players);
  }
}
