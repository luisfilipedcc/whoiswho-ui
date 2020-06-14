import * as PIXI from "pixi.js";

export class Card extends PIXI.Container {
  constructor(board, character, placement = null) {
    super();
    board.addChild(this);
    this.id = character.id;
    this.board = board;
    this.placement = placement;
    const resourceName = "character" + character.id.toString();

    PIXI.Loader.shared.load((loader, resources) => {
      this.characterImage = new PIXI.Sprite(resources[resourceName].texture);
      this.addChild(this.characterImage);
      this.characterImage.scale.set(0.7, 0.7);
      this.positionCard();
    });
  }

  positionCard() {
    this.position.set(
      this.board.width / 2 - this.width / 2,
      this.board.height + 20
    );
  }
}

export class PlayingCard extends Card {
  constructor(board, character, placement, selectionCallback) {
    super(board, character, placement);
    this.buttonMode = true;
    this.interactive = true;
    this.selected = false;
    this.selectionCallback = selectionCallback;
    this.on("mousedown", this.onButtonDown).on("touchstart", this.onButtonDown);
    this.addSelectionMark();
  }

  positionCard() {
    this.position.set(
      (this.characterImage.width + 20) * this.placement.column,
      (this.characterImage.height + 20) * this.placement.row
    );
  }

  addSelectionMark() {
    this.overlay = new PIXI.Graphics();
    this.overlay.lineStyle(3, 0xff0000, 1);
    this.overlay.beginFill(0x555555, 0.6);
    this.overlay.drawRect(0, 0, this.width, this.height);
    this.overlay.endFill();
    this.overlay.visible = false;
    this.addChild(this.overlay);
  }

  onButtonDown() {
    this.selected = !this.selected;
    this.overlay.visible = this.selected;
    this.selectionCallback(this.id);
    //this.characterImage.alpha = this.selected ? 0.4 : 1;
  }
}
