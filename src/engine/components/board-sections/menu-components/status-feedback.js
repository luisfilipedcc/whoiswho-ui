import * as PIXI from "pixi.js";

export class StatusFeedback extends PIXI.Container {
  constructor(menu, style) {
    super();
    this.style = style;
    this.menu = menu;
    this.menu.addChild(this);
    this.width = style.width;
    this.height = style.height;
    this.position.set(style.position.x, style.position.y);
    this.background = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this.background.position.set(0, 0);
    this.background.width = style.width;
    this.background.height = style.height;
    this.addChild(this.background);
    this.statusText = new PIXI.Text("", style.font.waiting);
    this.statusText.anchor.set(0.5, 0.5);
    this.statusText.position.x = this.background.x + this.background.width / 2;
    this.statusText.position.y = this.background.y + this.background.height / 2;
    this.addChild(this.statusText);
    this.menu.playManager.eventEmitter.on("enterState", (state) =>
      this.setStatus(state)
    );
    this.menu.playManager.eventEmitter.on("finalResult", (state) =>
      this.setStatus(state.result)
    );
  }

  setStatus(status) {
    this.status = status;
    switch (status) {
      case "waiting":
        PIXI.Loader.shared.load((loader, resources) => {
          this.background.texture =
            resources[`statusWaiting-${this.menu.board.orientation}`].texture;
          this.statusText.text = "Waiting for a rival";
          this.statusText.style = this.style.font.waiting;
          this.animateWaitingText(4);
        });
        break;
      case "opponent-turn":
        PIXI.Loader.shared.load((loader, resources) => {
          this.background.texture =
            resources[
              `statusOpponentTurn-${this.menu.board.orientation}`
            ].texture;
          this.statusText.text = "Opponent's turn";
          this.statusText.style = this.style.font.opponentTurn;
        });
        break;
      case "player-turn":
        PIXI.Loader.shared.load((loader, resources) => {
          this.background.texture =
            resources[
              `statusPlayerTurn-${this.menu.board.orientation}`
            ].texture;
          this.statusText.text = "Your turn";
          this.statusText.style = this.style.font.playerTurn;
        });
        break;
      case "lose":
        PIXI.Loader.shared.load((loader, resources) => {
          this.background.texture =
            resources[`statusLose-${this.menu.board.orientation}`].texture;
          this.statusText.text = "You lost!";
          this.statusText.style = this.style.font.lose;
        });
        break;
      case "win":
        PIXI.Loader.shared.load((loader, resources) => {
          this.background.texture =
            resources[`statusWin-${this.menu.board.orientation}`].texture;
          this.statusText.text = "You won!";
          this.statusText.style = this.style.font.win;
        });
        break;
      default:
        break;
    }
  }

  animateWaitingText = (iteration) => {
    const numberOfDots = iteration % 4;
    let dotsString = "";
    for (let i = 0; i < numberOfDots; i++) {
      dotsString += ".";
    }
    if (this.status === "waiting") {
      this.statusText.text = "Waiting for a rival " + dotsString;
    }
    setTimeout(() => {
      if (this.status === "waiting") {
        this.animateWaitingText(iteration + 1);
      }
    }, 1000);
  };
}
