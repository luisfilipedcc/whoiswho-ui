import { State } from "./state";
import { Requests } from "../../../communication/requests";

export class MatchingState extends State {
  onEnter = () => {
    console.log("enter matching");
    this.gameManager.playManager.enterState("matching");
    Requests.getMatchData(this.store.match.id).then(
      (result) => {
        if (typeof result.error === "undefined") {
          this.store.setData(result);
          this.store.matched = true;
          if (this.store.gameStatus["player_turn"]) {
            this.gameController.fsm.startFirst();
          } else {
            this.gameController.fsm.startSecond();
          }
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {}
    );
  };

  onExit = () => {
    console.log("exit matching");
    this.gameManager.playManager.exitState("matching");
  };
}
