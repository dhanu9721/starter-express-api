import { Room, Client } from "colyseus";
import { GameState } from "./GameState";
import { PlayerManager } from "./Managers/PlayerManager";
import { matchMaker } from "colyseus";

export class Public_Room extends Room<GameState> {
  onCreate(options: any) {
    this.registerMessageEvents();
    this.setState(new GameState());
    this.maxClients = 1;
    this.state.GameState = "LOBBY";
    // this.state._playerManager
  }

  registerMessageEvents() {
    this.onMessage("MY_POSITION", this.setPlayerPosition.bind(this));
  }

  onAuth(client: Client, options: any) {
    return true;
  }

  setPlayerPosition(client: Client, options: any) {
    console.log("setPlayerPosition	:", options);
    PlayerManager.getInstance()
      .getPlayerBySessionId(client.sessionId)
      .setMyPosition(options);
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!", options);
    PlayerManager.getInstance().addPlayer(client, options);
    client.send("joined", { name: "Dhananjay" });
    if (PlayerManager.getInstance().getAllPlayers().size >= this.maxClients) {
      this.lock();
      this.state.GameState = "GAME_START";
      console.log("Game started");
      // Game start from here automatically
    }
  }

  onLeave(client: Client, consented: boolean) {
    PlayerManager.getInstance().removePlayer(client);
    if (PlayerManager.getInstance().getAllPlayers().size < this.maxClients)
      this.unlock();
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
