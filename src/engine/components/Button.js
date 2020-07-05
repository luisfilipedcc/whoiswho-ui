import * as PIXI from "pixi.js";
import { AdjustmentFilter } from "pixi-filters";

export class Button extends PIXI.Container {
  hovered = false;
  buttonUp = true;
  constructor(wrapper, style, enabled = false, on = true, clickCallback) {
    super();
    this.wrapper = wrapper;
    this.wrapper.addChild(this);
    this.buttonUp = on;
    this.buttonMode = enabled;
    this.interactive = enabled;
    this.enabled = enabled;
    this.visible = enabled;
    this.alpha = enabled ? 1 : 0.2;
    this.style = style;
    this.clickCallback = clickCallback;
    this.on("click", this.onClick).on("tap", this.onClick);
    this.on("mousedown", this.onMouseDown).on("touchstart", this.onMouseDown);
    this.on("mouseup", this.onMouseUp).on("touchend", this.onMouseUp);
    this.on("mouseupoutside", this.onMouseUp).on(
      "touchendoutside",
      this.onMouseUp
    );
    this.on("mouseover", this.onMouseOver);
    this.on("mouseout", this.onMouseOut);
    this.width = style.width;
    this.height = style.height;
    this.position.set(style.position.x, style.position.y);

    PIXI.Loader.shared.load((loader, resources) => {
      let resource = this.buttonUp ? style.images.up : style.images.down;
      this.image = new PIXI.Sprite(resources[resource].texture);
      this.addChild(this.image);
      this.image.width = style.width;
      this.image.height = style.height;
      this.image.anchor.set(0.5, 0.5);
      this.image.position.set(this.image.width / 2, this.image.height / 2);
    });

    if (typeof style.events !== "undefined") {
      style.events.forEach((event) => {
        wrapper.gameManager.playManager.eventEmitter.on(event.name, (data) => {
          this[event.callback](data);
        });
      });
    }
  }

  onClick() {
    this.buttonUp = !this.buttonUp;
    const hasDownImage = typeof this.style.images.down !== "undefined";
    if (hasDownImage) {
      PIXI.Loader.shared.load((loader, resources) => {
        const resource = this.buttonUp
          ? this.style.images.up
          : this.style.images.down;
        this.image.texture = resources[resource].texture;
      });
    }
    this.clickCallback();
  }

  onMouseDown() {
    const filter = new AdjustmentFilter({
      brightness: 0.7,
      contrast: 1,
    });
    this.filters = [filter];
  }

  onMouseUp() {
    const filter = new AdjustmentFilter({
      brightness: 1,
      contrast: 1,
    });
    this.filters = [filter];
  }

  onMouseOver() {
    this.hovered = true;
    const filter = new AdjustmentFilter({
      brightness: 1.1,
      contrast: 1.05,
    });
    this.filters = [filter];
  }

  onMouseOut() {
    this.hovered = false;
    const filter = new AdjustmentFilter({
      brightness: 1,
      constrast: 1,
    });
    this.filters = [filter];
  }

  isClickable = (clickable) => {
    this.buttonMode = clickable;
    this.interactive = clickable;
    this.alpha = clickable ? 1 : 0.2;
  };
}

export class PlayButton extends Button {
  onClick() {
    this.buttonUp = !this.buttonUp;
    this.iteration = 0;
    this.animate();
  }

  enableVisibility = (state) => {
    if (state === "player-turn") {
      this.visible = true;
    }
  };

  disableVisibility = (state) => {
    if (state === "player-turn") {
      this.visible = false;
    }
  };

  animate = () => {
    this.image.angle += 10;
    this.iteration++;
    this.image.width = this.image.width * Math.pow(0.99, this.iteration / 10);
    this.image.height = this.image.height * Math.pow(0.99, this.iteration / 10);
    if (this.image.angle < 360) {
      requestAnimationFrame(this.animate);
    } else {
      this.image.angle = 0;
      this.iteration = 0;
      this.image.width = this.style.width;
      this.image.height = this.style.height;
      this.clickCallback();
    }
  };
}
