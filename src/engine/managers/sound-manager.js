import resourcesPath from "../resources";
import { Howl } from "howler";

export class SoundManager {
  constructor(store) {
    this.store = store;
    this.sounds = {};
  }

  removeHowls = () => {
    this.stop();
    Object.keys(this.sounds).forEach((sound) => {
      this.sounds[sound].howl = null;
    });
  };

  load = (loadedCallback) => {
    this.loadedCallback = loadedCallback;
    resourcesPath.sounds.forEach((sound) => {
      this.sounds[sound.name] = new Sound(sound, this);
    });
  };

  play = (sound) => {
    if (this.store.soundEnabled) {
      this.sounds[sound].howl.play();
    }
  };

  stop = (sound) => {
    if (sound) {
      this.sounds[sound].howl.stop();
    } else {
      Object.keys(this.sounds).forEach((sound) => {
        this.sounds[sound].howl.stop();
      });
    }
  };

  stopAll = (exceptionSounds) => {
    Object.keys(this.sounds).forEach((sound) => {
      if (!exceptionSounds.includes(sound)) {
        this.sounds[sound].howl.stop();
      }
    });
  };

  loaded = () => {
    const loaded = Object.values(this.sounds).reduce((acc, val) => {
      return acc && val.loaded;
    }, true);
    if (loaded) {
      this.loadedCallback();
    }
  };
}

class Sound {
  constructor(sound, soundManager) {
    this.loaded = false;
    this.howl = new Howl(sound);
    /*this.howl = new Howl(sound).once("load", () => {
      console.log("akii");
      this.loaded = true;
      soundManager.loaded();
    });*/
  }
}
