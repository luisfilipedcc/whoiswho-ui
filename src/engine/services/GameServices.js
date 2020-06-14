import * as PIXI from "pixi.js";
import { ScenesController } from "../controllers/ScenesController";

class GameService {
  constructor(app, engine) {
    this.app = app;
    this.engine = engine;

    const resources = this.engine.gameData.board.characters.map((character) => {
      return {
        name: "character" + character.id.toString(),
        url: "http://localhost:8000/static/characters/" + character.id + ".jpg",
      };
    });
    resources.push({ name: "bg", url: "/game/assets/images/bg.png" });
    PIXI.Loader.shared.add(resources).load(() => console.log("finished"));
  }
}

export class MobileGameService extends GameService {
  constructor(app, engine) {
    super(app, engine);
    PIXI.Loader.shared.load((loader, resources) => {
      this.scenesController = new ScenesController(this, [
        "landscape",
        "portrait",
      ]);
    });
  }
}

export class DesktopGameService extends GameService {
  constructor(app, engine) {
    super(app, engine);
    PIXI.Loader.shared.load((loader, resources) => {
      this.scenesController = new ScenesController(this, ["landscape"]);
    });
  }
}
