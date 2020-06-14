import * as PIXI from "pixi.js";
import { DesktopGameService, MobileGameService } from "./services/GameServices";

export default class GameEngine {
  gameStatus = null;
  gameData = null;

  constructor(wrapperElement) {
    this.wrapperElement = wrapperElement;
  }

  init(data) {
    this.gameData = data;
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
    let app = new PIXI.Application({ antialias: true });
    this.wrapperElement.appendChild(app.view);
    if (PIXI.isMobile.any) {
      new MobileGameService(app, this);
    } else {
      new DesktopGameService(app, this);
    }
  };

  updateGameStatus(data) {
    this.gameStatus = data;
  }
}
