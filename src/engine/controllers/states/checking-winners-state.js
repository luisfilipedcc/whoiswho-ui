import { State } from "./state";

export class CheckingWinners extends State {
  onEnter = () => {
    console.log("enter checking winners");
    this.playManager.enterState("checking-winners");
    this.gameManager.playManager.eventEmitter.on(
      "statusTick",
      this.statusListener
    );
  };

  onExit = () => {
    console.log("exit cecking winners");
    this.playManager.eventEmitter.removeListener(
      "statusTick",
      this.statusListener
    );
    this.playManager.exitState("checking-winners");
  };

  statusListener = (data) => {
    if (!data.ended) {
      setTimeout(() => {
        this.gameController.fsm.reboot();
      }, 0);
    } else {
      setTimeout(() => {
        this.gameController.fsm.finish();
      }, 0);
    }
  };
}
