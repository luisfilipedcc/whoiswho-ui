import * as PIXI from "pixi.js";
import { GuessingCharacter, PlayerCharacter } from "./character";

class Card extends PIXI.Container {
  constructor(wrapper, character) {
    super();
    wrapper.addChild(this);
    this.id = character.id;
    this.wrapper = wrapper;
  }
}

export class GuessingCard extends Card {
  constructor(wrapper, character, placement, closed, selectionCallback) {
    super(wrapper, character);

    const style = wrapper.style;

    this.blocked = false;
    this.placement = placement;
    this.buttonMode = true;
    this.interactive = false;
    this.selected = false;
    this.selectionCallback = selectionCallback;
    this.on("mousedown", this.onButtonDown).on("touchstart", this.onButtonDown);
    this.on("mouseover", this.onMouseOver);
    this.on("mouseout", this.onMouseOut);
    this.width = style.arena.width / wrapper.columnsCount;
    this.height = style.arena.height / wrapper.rowsCount;

    this.character = new GuessingCharacter(this, character, false);

    this.positionCard();

    if (closed) {
      this.pick();
    }
  }

  positionCard() {
    this.position.set(
      this._width * this.placement.column,
      this._height * this.placement.row
    );
  }

  onButtonDown() {
    this.selected = !this.selected;
    this.character.toggleSelected(this.selected);
    this.selectionCallback(this.id);
  }

  onMouseOver() {
    this.character.mouseOver();
  }

  onMouseOut() {
    this.character.mouseOut();
  }

  pick() {
    this.blocked = true;
    this.selected = false;
    this.interactive = false;
    this.character.togglePicked();
  }
}

export class PlayerCard extends Card {
  constructor(wrapper, style, character) {
    super(wrapper, character);
    this.character = new PlayerCharacter(this, character, true);
    this.style = style;
    this.width = style.width;
    this.height = style.height;
    this.positionCard();
  }
  positionCard() {
    this.position.set(this.style.position.x, this.style.position.y);
  }
}

export class OpponentCard extends Card {
  constructor(wrapper, style, character) {
    super(wrapper, character);
    this.character = new PlayerCharacter(this, character, true);
    this.style = style;
    this.positionCard();
    this.width = style.width;
    this.height = style.height;
  }
  positionCard() {
    this.position.set(this.style.position.x, this.style.position.y);
  }
}
