import { MapSchema, Schema, Context, type } from "@colyseus/schema";
import { IPlayer } from "../../Utils/Interfaces";

export class Player extends Schema {
  @type("string") name: string;
  @type("string") sessionId: string;
  @type("string") positionX: string;
  @type("string") positionY: string;
  @type("string") positionZ: string;

  constructor(playerData: IPlayer) {
    super();
    this.name = playerData.name;
    this.sessionId = playerData.sessionId;
  }

  setMyPosition(playerPosition: any) {
    this.positionX = `${playerPosition.positionX}`;
    this.positionY = `${playerPosition.positionY}`;
    this.positionZ = `${playerPosition.positionZ}`;
  }
}
