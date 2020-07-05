import * as PIXI from "pixi.js";
import config from "../config";

export class ScreenManager {
  constructor(app, gameManager) {
    this.app = app;
    this.gameManager = gameManager;
    window.addEventListener("resize", () => {
      this.gameManager.playManager.setOrientation(this.getOrientation());
    });
  }

  adjustedResize() {
    if (PIXI.isMobile.any) {
      if (this.getOrientation() === "landscape") {
        this.resize(
          config.renderer.desktop.width,
          config.renderer.desktop.height
        );
      } else {
        this.resize(
          config.renderer.mobile.width,
          config.renderer.mobile.height
        );
      }
    } else {
      this.resize(
        config.renderer.desktop.width,
        config.renderer.desktop.height
      );
    }
  }

  getOrientation() {
    return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  }

  resize(width, height) {
    const vpw =
      this.gameManager.engine.wrapperElement.clientWidth > 0
        ? this.gameManager.engine.wrapperElement.clientWidth
        : window.innerWidth; // Width of the viewport
    const vph =
      this.gameManager.engine.wrapperElement.clientHeight > 0
        ? this.gameManager.engine.wrapperElement.clientHeight
        : window.innerHeight; // Height of the viewport
    let nvw; // New game width
    let nvh; // New game height

    // The aspect ratio is the ratio of the screen's sizes in different dimensions.
    // The height-to-width aspect ratio of the game is HEIGHT / WIDTH.

    if (vph / vpw < height / width) {
      // If height-to-width ratio of the viewport is less than the height-to-width ratio
      // of the game, then the height will be equal to the height of the viewport, and
      // the width will be scaled.
      nvh = vph;
      nvw = (nvh * width) / height;
    } else {
      // In the else case, the opposite is happening.
      nvw = vpw;
      nvh = (nvw * height) / width;
    }

    // Set the game screen size to the new values.
    // This command only makes the screen bigger --- it does not scale the contents of the game.
    // There will be a lot of extra room --- or missing room --- if we don't scale the stage.
    this.app.renderer.resize(nvw, nvh);

    // This command scales the stage to fit the new size of the game.
    this.app.stage.scale.set(nvw / width, nvh / height);
  }
}
