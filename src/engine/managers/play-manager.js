import { EventEmitter } from "events";
import { Requests } from "../../communication/requests";

export class PlayManager {
  hasAdversaries = false;
  ownCard = null;
  isHost = false;
  ownCharacter = null;
  selectedCards = [];
  guessingCards = [];
  recursiveTickCall = null;

  constructor(store) {
    this.store = store;
    this.eventEmitter = new EventEmitter();
  }

  setOrientation(orientation) {
    this.eventEmitter.emit("setOrientation", orientation);
  }

  canStart(state) {
    this.eventEmitter.emit("canStart");
  }

  finalResult(result) {
    this.eventEmitter.emit("finalResult", result);
  }

  enterState(state) {
    this.eventEmitter.emit("enterState", state);
  }

  exitState(state) {
    this.eventEmitter.emit("exitState", state);
  }

  clickablePlay(enable) {
    this.eventEmitter.emit("clickablePlay", enable);
  }

  gameStatusTick = (callback) => {
    Requests.getMatchStatus(this.store.match.id).then(
      (result) => {
        if (result.error === undefined) {
          this.store.setStatus(result);
          this.eventEmitter.emit("statusTick", result);
          if (typeof callback === "function") {
            callback();
          }
        }
        this.recursiveTickCall = setTimeout(() => this.gameStatusTick(), 2000);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.recursiveTickCall = setTimeout(() => this.gameStatusTick(), 2000);
      }
    );
  };
}
