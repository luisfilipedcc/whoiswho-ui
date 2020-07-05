export class State {
  constructor(gameController) {
    this.gameController = gameController;
    this.gameManager = gameController.gameManager;
    this.playManager = gameController.gameManager.playManager;
    this.soundManager = gameController.gameManager.soundManager;
    this.store = gameController.gameManager.store;
  }
}
