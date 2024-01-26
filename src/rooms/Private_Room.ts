import { Room, Client } from "colyseus";
import { GameState } from "./GameState";
import { PlayerManager } from "./Managers/PlayerManager";
import { matchMaker } from "colyseus";

export class Private_Room extends Room<GameState> {
  onCreate (options: any) {
    this.setState(new GameState());
    // this.state._playerManager
  }


  


  onAuth(client: Client,options: any) {
    return true;
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!",options);
    PlayerManager.getInstance().addPlayer(client,options);
    client.send("joined", {name:"Dhananjay"});
  }

  onLeave (client: Client, consented: boolean) {
    PlayerManager.getInstance().removePlayer(client)
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
