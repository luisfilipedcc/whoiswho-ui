import { Scene } from "../components/Scene";

export class ScenesController {
  scenes = [];
  constructor(service, scenesContext) {
    this.scenes = scenesContext.map((sceneContext, index) => {
      const visibleScene = index === 0;
      return new Scene(service, sceneContext, visibleScene);
    });
    for (const scene in this.scenes) {
      service.app.stage.addChild(this.scenes[scene]);
    }
  }
}
