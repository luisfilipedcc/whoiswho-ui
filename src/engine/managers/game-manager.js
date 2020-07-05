import * as PIXI from "pixi.js";
import { ScenesController } from "../controllers/scenes-controller";
import { ScreenManager } from "./screen-manager";
import style from "../style";
import { SoundManager } from "./sound-manager";
import { PlayManager } from "./play-manager";
import { GameController } from "../controllers/game-controller";

export class GameManager {
  constructor(app, engine, contexts) {
    this.app = app;
    this.engine = engine;
    this.store = engine.store;
    this.contexts = contexts;

    this.soundManager = new SoundManager(this.store);
    this.screenManager = new ScreenManager(this.app, this);
    this.playManager = new PlayManager(this.store);

    this.scenesController = new ScenesController(this);
    this.gameController = new GameController(this);
  }

  getStyle(orientation) {
    return PIXI.isMobile.any
      ? style.mobile[orientation]
      : style.desktop[orientation];
  }

  initializeLoading = (callback) => {
    PIXI.Loader.shared.load((loader, resources) => {
      this.scenesController.addLoadingScenes(this.contexts.loading);
      callback();
    });
  };
  initializeGame = (callback) => {
    PIXI.Loader.shared.load((loader, resources) => {
      this.scenesController.addGameScenes(this.contexts.game);
      callback();
    });
  };
}
