import * as PIXI from "pixi.js";
import { Button } from "./button";

export class Loading extends PIXI.Container {
  constructor(scene, gameManager) {
    super();
    scene.addChild(this);
    this.scene = scene;
    this.orientation = scene.orientation;
    this.gameManager = gameManager;
    this.style = gameManager.getStyle(this.orientation);

    this.startButton = new Button(
      this,
      this.style.buttons.loading,
      true,
      true,
      this.startGame
    );
    this.startButton.isClickable(false);
    this.gameManager.playManager.eventEmitter.on("canStart", () => {
      this.startButton.isClickable(true);
    });
  }

  startGame = () => {
    this.gameManager.gameController.fsm.loaded();
  };
}
