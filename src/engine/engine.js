import * as PIXI from "pixi.js";
import { GameManager } from "./managers/game-manager";
import { Store } from "./store/store";

export default class GameEngine {
  gameStatus = null;

  constructor(wrapperElement, closeGamePageCallback) {
    this.wrapperElement = wrapperElement;
    this.closeGamePageCallback = closeGamePageCallback;
    this.store = new Store();
  }

  init(matchId) {
    this.store.match.id = matchId;
    this.pixiStartup();
    this.gameStartup();
  }

  pixiStartup = () => {
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }
    PIXI.utils.sayHello(type);
  };

  gameStartup = () => {
    let app = new PIXI.Application({
      antialias: false,
    });
    this.wrapperElement.appendChild(app.view);
    let contexts;
    if (PIXI.isMobile.any) {
      contexts = {
        loading: ["loadingLandscape", "loadingPortrait"],
        game: ["gameLandscape", "gamePortrait"],
      };
    } else {
      contexts = {
        loading: ["loadingLandscape"],
        game: ["gameLandscape"],
      };
    }
    new GameManager(app, this, contexts);
  };
}
