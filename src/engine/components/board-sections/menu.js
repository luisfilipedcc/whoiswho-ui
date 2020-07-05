import * as PIXI from "pixi.js";
import { PlayerCard, OpponentCard } from "../card";
import { Logo } from "./menu-components/logo";
import { Button, PlayButton } from "../button";
import { Requests } from "../../../communication/requests";
import { StatusFeedback } from "./menu-components/status-feedback";

export class Menu extends PIXI.Container {
  constructor(board, gameManager, playerCharacter) {
    super();
    board.addChild(this);
    this.gameManager = gameManager;
    this.playManager = gameManager.playManager;
    this.soundManager = gameManager.soundManager;

    this.board = board;
    this.style = board.style;
    this.height = this.style.menu.height;
    this.width = this.style.menu.width;
    this.position.set(this.style.menu.position.x, this.style.menu.position.y);

    PIXI.Loader.shared.load((loader, resources) => {
      const background = new PIXI.Sprite(
        resources["menuBg-" + this.board.orientation].texture
      );
      background.width = this._width;
      background.height = this._height;
      background.pivot.set(0, 0);
      background.position.set(0, 0);
      this.addChild(background);
    });

    this.playerCard = new PlayerCard(
      this,
      this.style.match.cards.player,
      playerCharacter
    );
    this.logo = new Logo(this, this.style.logo);
    const matchNameStyle = this.style.match.labels.name;
    const matchName = gameManager.store.gameData.match.name;
    this.matchNameLabel = new PIXI.Text(
      "Match name:",
      matchNameStyle.label.font
    );
    this.matchNameLabel.position.x = matchNameStyle.label.position.x;
    this.matchNameLabel.position.y = matchNameStyle.label.position.y;
    this.addChild(this.matchNameLabel);
    this.matchNameText = new PIXI.Text(matchName, matchNameStyle.text.font);
    this.matchNameText.position.x =
      this.matchNameLabel.position.x + this.matchNameLabel.width + 5;
    this.matchNameText.position.y = this.matchNameLabel.position.y;
    this.addChild(this.matchNameText);
    const matchOpponentStyle = this.style.match.labels.opponent.name;
    this.matchOpponentLabel = new PIXI.Text(
      "Playing against:",
      matchOpponentStyle.label.font
    );
    this.matchOpponentLabel.position.x = matchOpponentStyle.label.position.x;
    this.matchOpponentLabel.position.y = matchOpponentStyle.label.position.y;
    this.matchOpponentLabel.visible = false;
    this.addChild(this.matchOpponentLabel);
    this.matchOpponentText = new PIXI.Text("", matchOpponentStyle.text.font);
    this.matchOpponentText.position.x =
      this.matchOpponentLabel.position.x + this.matchOpponentLabel.width + 5;
    this.matchOpponentText.position.y = this.matchOpponentLabel.position.y;
    this.matchOpponentText.visible = false;
    this.addChild(this.matchOpponentText);
    const matchOpponentCardsStyle = this.style.match.labels.opponent
      .missingCards;
    this.matchOpponentCardsLabel = new PIXI.Text(
      "Opponent cards left:",
      matchOpponentCardsStyle.label.font
    );
    this.matchOpponentCardsLabel.position.x =
      matchOpponentCardsStyle.label.position.x;
    this.matchOpponentCardsLabel.position.y =
      matchOpponentCardsStyle.label.position.y;
    this.matchOpponentCardsLabel.visible = false;
    this.addChild(this.matchOpponentCardsLabel);
    this.matchOpponentCardsText = new PIXI.Text(
      "",
      matchOpponentCardsStyle.text.font
    );
    this.matchOpponentCardsText.position.x =
      this.matchOpponentCardsLabel.position.x +
      this.matchOpponentCardsLabel.width +
      5;
    this.matchOpponentCardsText.position.y = this.matchOpponentCardsLabel.position.y;
    this.matchOpponentText.visible = false;
    this.addChild(this.matchOpponentCardsText);
    const matchOpponentCardStyle = this.style.match.labels.opponent.card;
    this.matchOpponentCardLabel = new PIXI.Text(
      "Opponent card:",
      matchOpponentCardStyle.label.font
    );
    this.matchOpponentCardLabel.position.x =
      matchOpponentCardStyle.label.position.x;
    this.matchOpponentCardLabel.position.y =
      matchOpponentCardStyle.label.position.y;
    this.matchOpponentCardLabel.anchor.set(
      matchOpponentCardStyle.label.anchor.x,
      matchOpponentCardStyle.label.anchor.y
    );
    this.matchOpponentCardLabel.visible = false;
    this.addChild(this.matchOpponentCardLabel);
    this.playButton = new PlayButton(
      this,
      this.style.buttons.play,
      false,
      true,
      this.playClickCallback
    );
    this.exitButton = new Button(
      this,
      this.style.buttons.exit,
      true,
      true,
      this.leaveMatchCallback
    );
    this.soundButton = new Button(
      this,
      this.style.buttons.sound,
      true,
      true,
      this.muteSoundCallback
    );
    this.musicButton = new Button(
      this,
      this.style.buttons.music,
      true,
      false,
      this.muteMusicCallback
    );
    this.statusFeedback = new StatusFeedback(this, this.style.match.status);
    this.addChild(this.statusFeedback);

    this.playManager.eventEmitter.on("exitState", (state) => {
      if (state === "matching") {
        this.matchOpponentLabel.visible = true;
        this.matchOpponentText.visible = true;
        this.matchOpponentCardsLabel.visible = true;
        this.matchOpponentCardsText.visible = true;
        this.matchOpponentText.text = this.gameManager.store.opponent.name;
        this.matchOpponentCardsText.text = this.gameManager.store.gameStatus.opponent_pieces;
      }
    });

    this.gameManager.playManager.eventEmitter.on("statusTick", (data) => {
      if (this.gameManager.store.matched) {
        this.matchOpponentCardsText.text = data.opponent_pieces;
      }
    });

    this.gameManager.playManager.eventEmitter.on("finalResult", (result) => {
      this.opponentCard = this.gameManager.store.gameData.board.characters
        .filter((character) => result.opponentCharacter === character.id)
        .map((character) => {
          return new OpponentCard(
            this,
            this.style.match.cards.opponent,
            character
          );
        });
      this.matchOpponentCardLabel.visible = true;
    });
  }

  leaveMatchCallback = () => {
    Requests.leaveMatch(this.gameManager.store.gameData.match.id).then(
      (result) => {
        if (typeof result.error === "undefined") {
          this.gameManager.playManager.eventEmitter.removeAllListeners();
          clearTimeout(this.gameManager.playManager.recursiveTickCall);
          this.gameManager.soundManager.removeHowls();
          this.gameManager.engine.closeGamePageCallback();
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {}
    );
  };

  playClickCallback = () => {
    this.soundManager.play("play");
    const data = JSON.stringify({
      picks: this.playManager.selectedCards.map((id) => id - 1),
    });
    Requests.play(this.gameManager.store.gameData.match.id, data).then(
      (result) => {
        if (typeof result.error === "undefined") {
          this.playManager.selectedCards.forEach((selectedId) => {
            this.playManager.guessingCards
              .filter((card) => card.id === selectedId)
              .forEach((card) => card.pick());
          });
          this.playManager.selectedCards = [];
          this.gameManager.gameController.fsm.played();
          this.playButton.isClickable(false);
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {}
    );
  };

  muteSoundCallback = () => {
    this.gameManager.store.soundEnabled = !this.gameManager.store.soundEnabled;
    if (!this.gameManager.store.soundEnabled && this.musicButton.buttonUp) {
      this.musicButton.onClick();
    }
    if (this.gameManager.store.soundEnabled && !this.musicButton.buttonUp) {
      this.musicButton.onClick();
    }
  };

  muteMusicCallback = () => {
    this.gameManager.store.musicEnabled = !this.gameManager.store.musicEnabled;
    if (this.gameManager.store.musicEnabled) {
      this.soundManager.play("music");
    } else {
      this.soundManager.stop("music");
    }
  };
}
