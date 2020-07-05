import { State } from "./state";

export class WaitingState extends State {
  onEnter = () => {
    console.log("enter ~waiting");
    if (this.gameManager.store.gameStatus.waiting) {
      this.playManager.enterState("waiting");
      this.gameManager.playManager.eventEmitter.on(
        "statusTick",
        this.statusListener
      );
    } else {
      setTimeout(() => {
        this.gameController.fsm.waited();
      }, 0);
    }
  };

  onExit = () => {
    console.log("exit waiting");
    this.gameManager.playManager.eventEmitter.removeListener(
      "statusTick",
      this.statusListener
    );
  };

  statusListener = (data) => {
    if (!data.waiting) {
      this.gameController.fsm.waited();
    }
  };
}
