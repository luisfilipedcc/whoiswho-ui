import * as PIXI from "pixi.js";
import { AdjustmentFilter } from "pixi-filters";

class Character extends PIXI.Container {
  constructor(card, character, isPlayerCharacter) {
    super();
    card.addChild(this);
    this.card = card;

    this.margin = card.wrapper.style.character.margin;
    this.font = card.wrapper.style.character.font;

    const resourceName = "character" + character.id.toString();
    const defaultFrame = isPlayerCharacter
      ? "frame5-landscape"
      : "frame2-landscape";

    this.selected = false;
    this.hovered = false;

    this.width = this.card._width - this.margin.x;
    this.height = this.card._height - this.margin.y;

    this.position.set(this.margin.x / 2, this.margin.y / 2);

    this.image = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this.frame = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this.name = new PIXI.Text(character.name, this.font);
    this.addChild(this.name);
    this.name.anchor.set(0.5, 1);

    PIXI.Loader.shared.load((loader, resources) => {
      this.image = new PIXI.Sprite(resources[resourceName].texture);
      this.addChild(this.image);
      this.image.anchor.set(0.5, 0.5);
      this.frame = new PIXI.Sprite(resources[defaultFrame].texture);
      this.addChild(this.frame);
      this.frame.anchor.set(0.5, 0.5);
    });
  }

  scaleCharacter(value) {
    this.frame.width = this._width * value;
    this.frame.height = this._height * value;
    this.image.width = this.frame._width * 0.9;
    this.image.height = this.frame._height * 0.9;
  }
}

export class GuessingCharacter extends Character {
  constructor(card, character) {
    super(card, character, false);
    this.frame.width = this._width * 0.9;
    this.frame.height = this._height * 0.9;
    this.frame.position.set(this._width / 2, (this._height * 0.9) / 2);
    this.image.width = this.frame._width * 0.9;
    this.image.height = this.frame._height * 0.9;
    this.image.position.set(this._width / 2, (this._height * 0.9) / 2);
    this.name.position.set(
      this._width / 2,
      this._height + this.name.height / 4
    );
    const filter = new AdjustmentFilter({
      saturation: 0.85,
      brightness: 0.85,
    });
    this.filters = [filter];
  }

  blockSelection(block) {
    PIXI.Loader.shared.load((loader, resources) => {
      const filter = new AdjustmentFilter({
        saturation: block ? 0.85 : 1,
        brightness: block ? 0.85 : 1,
      });
      this.filters = [filter];
    });
  }

  toggleSelected(selected) {
    this.selected = selected;
    this.scaleCharacter(selected ? 0.8 : 0.9);
    PIXI.Loader.shared.load((loader, resources) => {
      const frameKey = selected
        ? "frame3-landscape"
        : this.hovered
        ? "frame7-landscape"
        : "frame2-landscape";
      this.frame.texture = resources[frameKey].texture;
      if (this.selected) {
        this.name.style.fill = ["#eea200", "#ee9200"];
      } else {
        if (this.hovered) {
          this.name.style.fill = ["#ff5555", "#ff4040"];
        } else {
          this.name.style.fill = ["#444", "#333"];
        }
      }
    });
  }

  mouseOver() {
    this.hovered = true;
    if (!this.selected) {
      PIXI.Loader.shared.load((loader, resources) => {
        this.frame.texture = resources["frame7-landscape"].texture;
      });
      this.name.style.fill = ["#ff5555", "#ff4040"];
    }
    const filter = new AdjustmentFilter({
      brightness: 1.1,
      contrast: 1.05,
    });
    this.filters = [filter];
  }

  mouseOut() {
    this.hovered = false;
    if (!this.selected) {
      PIXI.Loader.shared.load((loader, resources) => {
        this.frame.texture = resources["frame2-landscape"].texture;
      });
      this.name.style.fill = ["#444", "#333"];
    }
    const filter = new AdjustmentFilter({
      brightness: 1,
      constrast: 1,
    });
    this.filters = [filter];
  }

  togglePicked() {
    this.scaleCharacter(0.7);
    PIXI.Loader.shared.load((loader, resources) => {
      this.frame.texture = resources["frame4-landscape"].texture;
      const filter = new AdjustmentFilter({
        saturation: 0.33,
        brightness: 0.5,
      });
      this.filters = [filter];
      this.name.style.fill = ["#fff", "#d1d1d1"];
    });
  }
}

export class PlayerCharacter extends Character {
  constructor(card, character) {
    super(card, character, true);
    this.frame.position.set(this.width / 2, this.height / 2);
    this.image.width = this.frame.width * 0.9;
    this.image.height = this.frame.width * 0.9;
    this.image.position.set(this.frame.position.x, this.frame.position.y);
    this.name.position.set(
      this.frame.position.x,
      this.frame.position.y + this.frame.height / 2 + this.name.height
    );
  }
}
