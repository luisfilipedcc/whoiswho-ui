import { State } from "./state";

export class BootingState extends State {
  onEnter = () => {
    console.log("enter booting");
    this.gameManager.initializeGame(() => {
      this.playManager.gameStatusTick(() => this.gameController.fsm.booted());
    });
  };
}
