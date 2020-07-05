import * as PIXI from "pixi.js";

export class Logo extends PIXI.Container {
  constructor(menu, style) {
    super();
    menu.addChild(this);
    this.width = style.width;
    this.height = style.height;
    this.position.set(style.position.x, style.position.y);
    PIXI.Loader.shared.load((loader, resources) => {
      this.image = new PIXI.Sprite(
        resources[`logo-${menu.board.orientation}`].texture
      );
      this.addChild(this.image);
      this.image.width = style.width;
      this.image.height = style.height;
    });
  }
}
