import { Requests } from "../../../communication/requests";
import { State } from "./state";
import * as PIXI from "pixi.js";
import resourcesPath from "../../resources";
import config from "../../config";

export class LoadingState extends State {
  resources = [];

  constructor(gameController) {
    super(gameController);

    this.resources = this.listResources();
    const loadingResources = this.resources.filter((resource) => {
      return config.loadingAssets.includes(resource.name);
    });
    PIXI.Loader.shared.add(loadingResources).load(() => {
      this.gameManager.initializeLoading(() => {
        Requests.getMatchData(this.store.match.id).then(
          (result) => {
            if (typeof result.error === "undefined") {
              this.store.setData(result);
              this.resources = this.resources.concat(
                this.listExternalResources()
              );
              const gameResources = this.resources.filter((resource) => {
                return !config.loadingAssets.includes(resource.name);
              });
              PIXI.Loader.shared.add(gameResources).load(() => {
                this.gameManager.soundManager.load();
                this.gameManager.playManager.canStart();
              });
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {}
        );
      });
    });
  }

  listResources = () => {
    let resources = [];
    if (PIXI.isMobile.any) {
      Object.keys(resourcesPath.images.mobile).forEach((orientation) => {
        resourcesPath.images.mobile[orientation].forEach((imageResource) =>
          resources.push({
            ...imageResource,
            ...{ name: imageResource.name + "-" + orientation },
          })
        );
      });
    } else {
      Object.keys(resourcesPath.images.desktop).forEach((orientation) => {
        resourcesPath.images.desktop[orientation].forEach((imageResource) =>
          resources.push({
            ...imageResource,
            ...{ name: imageResource.name + "-" + orientation },
          })
        );
      });
    }
    resources = resources.filter((src) => !PIXI.utils.TextureCache[src.name]);
    return resources;
  };

  listExternalResources = () => {
    let resources = this.store.gameData.board.characters.map((character) => {
      return {
        name: "character" + character.id.toString(),
        url: `${Requests.getUrl()}/static/characters/${character.id}.jpg`,
      };
    });
    resources = resources.filter((src) => !PIXI.utils.TextureCache[src.name]);
    return resources;
  };
}
