export class Store {
  gameStatus = null;
  gameData = null;
  soundEnabled = true;
  musicEnabled = false;
  matched = false;
  match = {
    id: null,
    name: "",
  };
  opponent = {
    name: "",
  };

  setStatus(gameStatus) {
    this.gameStatus = gameStatus;
  }

  setData(gameData) {
    this.gameData = gameData;
    this.match.name = gameData.match.name;
    if (gameData.players.player2 !== null) {
      if (gameData.board.player_index === 1) {
        this.opponent.name = gameData.players.player2.username;
      } else {
        this.opponent.name = gameData.players.player1.username;
      }
    }
  }
}
