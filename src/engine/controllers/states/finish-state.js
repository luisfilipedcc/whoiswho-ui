import { State } from "./state";

export class FinishState extends State {
  onEnter = () => {
    this.playManager.enterState("finish");
    const gameStatus = this.gameManager.store.gameStatus;
    this.playManager.finalResult({
      result: gameStatus.win ? "win" : "lose",
      opponentCharacter: gameStatus["opponent_character"],
    });
  };
}
