import { LoadingState } from "./states/loading-state";
import { BootingState } from "./states/booting-state";
import { StandbyState } from "./states/standby-state";
import { WaitingState } from "./states/waiting-state";
import { MatchingState } from "./states/matching-state";
import { PlayingState } from "./states/playing-state";
import { FinishState } from "./states/finish-state";
import { CheckingWinners } from "./states/checking-winners-state";
import StateMachine from "javascript-state-machine";

export class GameController {
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.states = {
      loading: new LoadingState(this),
      booting: new BootingState(this),
      waiting: new WaitingState(this),
      matching: new MatchingState(this),
      standby: new StandbyState(this),
      playing: new PlayingState(this),
      checkingWinners: new CheckingWinners(this),
      finish: new FinishState(this),
    };
    this.fsm = new StateMachine({
      init: "loading",
      transitions: [
        { name: "loaded", from: "loading", to: "booting" },
        { name: "booted", from: "booting", to: "waiting" },
        { name: "waited", from: "waiting", to: "matching" },
        { name: "startFirst", from: "matching", to: "playing" },
        { name: "startSecond", from: "matching", to: "standby" },
        { name: "start", from: "standby", to: "playing" },
        { name: "terminate", from: "standby", to: "finish" },
        { name: "played", from: "playing", to: "checkingWinners" },
        { name: "reboot", from: "checkingWinners", to: "standby" },
        { name: "finish", from: "checkingWinners", to: "finish" },
      ],
      methods: {
        onLoaded: () => {
          this.states.booting.onEnter();
        },
        onBooted: () => {
          this.states.waiting.onEnter();
        },
        onWaited: () => {
          this.states.waiting.onExit();
          this.states.matching.onEnter();
        },
        onStartFirst: () => {
          this.states.matching.onExit();
          this.states.playing.onEnter();
        },
        onStartSecond: () => {
          this.states.matching.onExit();
          this.states.standby.onEnter();
        },
        onStart: () => {
          this.states.standby.onExit();
          this.states.playing.onEnter();
        },
        onPlayed: () => {
          this.states.playing.onExit();
          this.states.checkingWinners.onEnter();
        },
        onReboot: () => {
          this.states.checkingWinners.onExit();
          this.states.standby.onEnter();
        },
        onTerminate: () => {
          this.states.standby.onExit();
          this.states.finish.onEnter();
        },
        onFinish: () => {
          this.states.checkingWinners.onExit();
          this.states.finish.onEnter();
        },
      },
    });
  }
}
