import * as PIXI from "pixi.js";
import { Arena } from "./board-sections/arena";
import { Menu } from "./board-sections/menu";

export class Board extends PIXI.Container {
  constructor(scene, gameManager) {
    super();
    scene.addChild(this);
    this.scene = scene;
    this.orientation = scene.orientation;
    this.gameManager = gameManager;
    this.style = gameManager.getStyle(this.orientation);

    const boardData = gameManager.store.gameData.board;
    const chars = boardData.characters;

    this.width = this.style.board.width;
    this.height = this.style.board.height;
    this.position.set(this.style.board.position.x, this.style.board.position.y);

    const ownCharacterIndex = boardData[`character${boardData.player_index}`];
    this.isHost = boardData.player_index === 1;

    const guessingChars = chars.filter((c) => c.id !== ownCharacterIndex);
    const playerChar = chars.filter((c) => c.id === ownCharacterIndex).pop();

    this.arena = new Arena(this, gameManager, guessingChars);
    this.menu = new Menu(this, gameManager, playerChar);
  }
}
