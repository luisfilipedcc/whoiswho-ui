import { State } from "./state";

export class StandbyState extends State {
  onEnter = () => {
    console.log("enter standby");
    if (
      this.gameManager.store.gameStatus !== null &&
      this.gameManager.store.gameStatus["player-turn"]
    ) {
      setTimeout(() => {
        this.gameController.fsm.start();
      }, 0);
    } else {
      this.playManager.enterState("opponent-turn");
    }
    this.gameManager.playManager.eventEmitter.on(
      "statusTick",
      this.statusListener
    );
  };

  onExit = () => {
    console.log("exit standby");
    this.playManager.eventEmitter.removeListener(
      "statusTick",
      this.statusListener
    );
    this.playManager.exitState("opponent-turn");
  };

  statusListener = (data) => {
    if (data.ended) {
      this.gameController.fsm.terminate();
    } else if (data.player_turn) {
      this.gameController.fsm.start();
    }
  };
}
