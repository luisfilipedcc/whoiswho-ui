import { GameScene, LoadingScene } from "../components/scene";

export class ScenesController {
  scenes = [];
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.gameManager.playManager.eventEmitter.on(
      "setOrientation",
      (orientation) => {
        this.scenes.forEach((scene) => {
          scene.visible = scene.orientation === orientation;
        });
        this.gameManager.screenManager.adjustedResize();
      }
    );
  }

  addLoadingScenes = (scenesContext) => {
    const screenOrientation = this.gameManager.screenManager.getOrientation();
    this.scenes = scenesContext.map((sceneContext, index) => {
      const contextOrientation = index === 0 ? "landscape" : "portrait";
      return new LoadingScene(
        this.gameManager,
        sceneContext,
        contextOrientation,
        screenOrientation === contextOrientation
      );
    });
    for (const scene in this.scenes) {
      this.gameManager.app.stage.addChild(this.scenes[scene]);
    }
    this.gameManager.screenManager.adjustedResize();
  };

  addGameScenes = (scenesContext) => {
    const screenOrientation = this.gameManager.screenManager.getOrientation();
    this.scenes.forEach((scene) => (scene.visible = false));
    const newScenes = scenesContext.map((sceneContext, index) => {
      console.log(sceneContext);
      const contextOrientation = index === 0 ? "landscape" : "portrait";
      return new GameScene(
        this.gameManager,
        sceneContext,
        contextOrientation,
        screenOrientation === contextOrientation
      );
    });
    this.scenes = this.scenes.concat(newScenes);
    for (const scene in newScenes) {
      this.gameManager.app.stage.addChild(newScenes[scene]);
    }
    this.gameManager.screenManager.adjustedResize();
  };
}
