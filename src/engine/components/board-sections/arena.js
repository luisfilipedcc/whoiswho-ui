import * as PIXI from "pixi.js";
import { GuessingCard } from "../card";
import config from "../../config";

export class Arena extends PIXI.Container {
  constructor(board, gameManager, guessingCharacters) {
    super();
    board.addChild(this);
    this.style = board.style;
    this.height = this.style.arena.height;
    this.width = this.style.arena.width;
    this.position.set(this.style.arena.position.x, this.style.arena.position.y);
    this.playManager = gameManager.playManager;
    this.soundManager = gameManager.soundManager;

    this.arenaColumns =
      PIXI.isMobile.any && board.orientation === "portrait"
        ? config.arenaColumns.mobile
        : config.arenaColumns.desktop;

    this.columnsCount = this.arenaColumns;
    this.rowsCount = parseInt(guessingCharacters.length / this.arenaColumns);

    for (const index in guessingCharacters) {
      const placement = this.arenaCardPlacement(index);
      const character = guessingCharacters[index];
      const characterClosed = gameManager.store.gameData.board.mask.includes(
        character.id
      );
      const guessingCard = new GuessingCard(
        this,
        character,
        placement,
        characterClosed,
        this.selectCardCallback
      );
      this.playManager.guessingCards.push(guessingCard);
    }
    this.playManager.eventEmitter.on("enterState", (state) => {
      if (state === "player-turn") {
        this.playManager.guessingCards.forEach((card) => {
          if (!card.blocked) {
            card.interactive = true;
            card.character.blockSelection(false);
          }
        });
      }
    });
    this.playManager.eventEmitter.on("exitState", (state) => {
      if (state === "player-turn") {
        this.playManager.guessingCards.forEach((card) => {
          if (!card.blocked) {
            card.interactive = false;
            card.character.blockSelection(true);
          }
        });
      }
    });
  }

  arenaCardPlacement = (index) => {
    const column = index % this.arenaColumns;
    const row = parseInt(index / this.arenaColumns);
    return { row: row, column: column };
  };

  selectCardCallback = (id) => {
    if (!this.playManager.selectedCards.includes(id)) {
      this.playManager.selectedCards.push(id);
      this.soundManager.play("click");
    } else {
      this.playManager.selectedCards = this.playManager.selectedCards.filter(
        (card) => card !== id
      );
      this.soundManager.play("undo");
    }
    this.playManager.clickablePlay(this.playManager.selectedCards.length > 0);
  };
}
