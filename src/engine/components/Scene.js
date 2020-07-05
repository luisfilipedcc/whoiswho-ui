import * as PIXI from "pixi.js";
import { Board } from "./board";
import { Loading } from "./loading";

class Scene extends PIXI.Container {
  constructor(gameManager, context, orientation, visible) {
    super();
    this.visible = visible;
    this.gameManager = gameManager;
    this.orientation = orientation;
    this.context = context;
  }
}

export class GameScene extends Scene {
  constructor(gameManager, context, orientation, visible) {
    super(gameManager, context, orientation, visible);
    this.loadScene();
  }
  loadScene = () => {
    PIXI.Loader.shared.load((loader, resources) => {
      const background = new PIXI.Sprite(
        resources["bg-" + this.orientation].texture
      );
      this.addChild(background);
      this.board = new Board(this, this.gameManager);
    });
  };
}

export class LoadingScene extends Scene {
  constructor(gameManager, context, orientation, visible) {
    super(gameManager, context, orientation, visible);
    this.loadScene();
  }
  loadScene = () => {
    PIXI.Loader.shared.load((loader, resources) => {
      const background = new PIXI.Sprite(
        resources["loading-" + this.orientation].texture
      );
      this.addChild(background);
      this.loading = new Loading(this, this.gameManager);
    });
  };
}
