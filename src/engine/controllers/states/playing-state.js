import { State } from "./state";

export class PlayingState extends State {
  onEnter = () => {
    console.log("enter playing");
    this.gameManager.playManager.enterState("player-turn");
  };

  onExit = () => {
    console.log("exit playing");
    this.gameManager.playManager.exitState("player-turn");
  };
}
