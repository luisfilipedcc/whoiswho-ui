import * as PIXI from "pixi.js";

export class Button extends PIXI.Container {
  constructor(board, clickCallback) {
    super();
    board.addChild(this);
    this.buttonMode = false;
    this.interactive = false;
    this.buildFilling();
    this.position.set(board.width + 40, board.height - this.height);
    this.alpha = 0.2;
    this.on("mousedown", clickCallback).on("touchstart", clickCallback);
  }

  buildFilling() {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0x3e494b);
    graphics.lineStyle(4, 0x0, 0.3);
    graphics.drawRoundedRect(0, 0, 100, 50, 10);
    graphics.endFill();
    this.addChild(graphics);
    var text = new PIXI.Text("PLAY", {
      font: "bold italic 40px Arial",
      fill: "#ffffff",
    });
    text.anchor.set(0.5, 0.5);
    text.position.set(this.width / 2 - 2, this.height / 2 - 2);
    this.addChild(text);
  }

  isClickable = (clickable) => {
    this.buttonMode = clickable;
    this.interactive = clickable;
    this.alpha = clickable ? 1 : 0.2;
  };
}
