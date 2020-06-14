import * as PIXI from "pixi.js";
import { Board } from "./Board";

export class Scene extends PIXI.Container {
  constructor(service, context, visible) {
    super();
    this.context = context;
    this.visible = visible;
    PIXI.Loader.shared.load((loader, resources) => {
      const background = new PIXI.Sprite(resources["bg"].texture);
      this.addChild(background);
      this.board = new Board(this, service);
    });
  }
}
