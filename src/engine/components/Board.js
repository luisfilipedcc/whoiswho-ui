import * as PIXI from "pixi.js";
import { Card, PlayingCard } from "./Card";
import { Button } from "./Button";

export class Board extends PIXI.Container {
  cards = [];
  ownCard = null;
  isHost = false;
  ownCharacter = null;
  selectedCards = [];
  constructor(scene, service) {
    super();
    scene.addChild(this);
    this.service = service;

    const characters = service.engine.gameData.board.characters;
    if (typeof service.engine.gameData.board.character1 !== "undefined") {
      this.isHost = true;
      this.ownCharacter = service.engine.gameData.board.character1;
    } else {
      this.ownCharacter = service.engine.gameData.board.character2;
    }
    const guessingCharacters = characters.filter(
      (character) => character.id !== this.ownCharacter
    );
    const ownCharacter = characters.filter(
      (character) => character.id === this.ownCharacter
    )[0];

    for (const index in guessingCharacters) {
      const placement = this.playingCardPlacement(index);
      const playingCard = new PlayingCard(
        this,
        guessingCharacters[index],
        placement,
        this.selectedCardCallback
      );
      this.cards.push(playingCard);
    }

    this.position.set(
      (scene.width - this.width) / 4,
      (scene.height - this.height) / 4
    );

    this.ownCard = new Card(this, ownCharacter, null);
    this.playButton = new Button(this, this.playClickCallback);
    setInterval(() => {
      console.log(this.service.engine.gameStatus);
    }, 4000);
  }

  playingCardPlacement = (index) => {
    const column = index % 5;
    const row = parseInt(index / 5);
    return { row: row, column: column };
  };

  selectedCardCallback = (id) => {
    if (!this.selectedCards.includes(id)) {
      this.selectedCards.push(id);
    } else {
      this.selectedCards = this.selectedCards.filter((card) => card !== id);
    }
    this.playButton.isClickable(this.selectedCards.length > 0);
  };

  playClickCallback = () => {
    const requestOptions = {
      method: "POST",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({
        picks: this.selectedCards,
      }),
    };
    fetch(
      "http://localhost:8000/match/match/leave/" +
        this.service.gameData.match.id +
        "/",
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {},
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  };
}
