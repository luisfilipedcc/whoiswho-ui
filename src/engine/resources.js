import config from "./config";

export default {
  sounds: [
    {
      name: "music",
      src: `${config.resourcesPath}/assets/sounds/bg-sound.mp3`,
      volume: 0.4,
      loop: true,
    },
    {
      name: "click",
      src: `${config.resourcesPath}/assets/sounds/click.mp3`,
    },
    {
      name: "undo",
      src: `${config.resourcesPath}/assets/sounds/undo.mp3`,
    },
    {
      name: "play",
      src: `${config.resourcesPath}/assets/sounds/play.mp3`,
    },
  ],
  images: {
    desktop: {
      landscape: [
        { name: "loading", url: "/game/assets/images/loading-bg-hd.png" },
        { name: "bg", url: "/game/assets/images/bg-hd.png" },
        {
          name: "frame1",
          url: "/game/assets/images/frames/frame-main-fullhd.png",
        },
        {
          name: "frame2",
          url: "/game/assets/images/frames/frame-regular-hd.png",
        },
        {
          name: "frame3",
          url: "/game/assets/images/frames/frame-selected-hd.png",
        },
        {
          name: "frame4",
          url: "/game/assets/images/frames/frame-unselected-hd.png",
        },
        {
          name: "frame5",
          url: "/game/assets/images/frames/frame-main-hd.png",
        },
        {
          name: "frame6",
          url: "/game/assets/images/frames/frame-regular-hover-hd.png",
        },
        {
          name: "frame7",
          url: "/game/assets/images/frames/frame-regular-hover3-hd.png",
        },
        {
          name: "logo",
          url: "/game/assets/images/logo16.png",
        },
        {
          name: "test",
          url: "/game/assets/images/test.png",
        },
        {
          name: "startButton",
          url: "/game/assets/images/buttons/start.png",
        },
        {
          name: "playButton",
          url: "/game/assets/images/buttons/botao-play.png",
        },
        {
          name: "exitButton",
          url: "/game/assets/images/buttons/close5.png",
        },
        {
          name: "soundButton",
          url: "/game/assets/images/buttons/sound5.png",
        },
        {
          name: "soundButtonDown",
          url: "/game/assets/images/buttons/no-sound5.png",
        },
        {
          name: "musicButton",
          url: "/game/assets/images/buttons/music5.png",
        },
        {
          name: "musicButtonDown",
          url: "/game/assets/images/buttons/no-music5.png",
        },
        {
          name: "menuBg",
          url: "/game/assets/images/menu-bg7.png",
        },
        {
          name: "statusWaiting",
          url: "/game/assets/images/status-waiting2.png",
        },
        {
          name: "statusPlayerTurn",
          url: "/game/assets/images/status-player-turn2.png",
        },
        {
          name: "statusOpponentTurn",
          url: "/game/assets/images/status-opponent-turn3.png",
        },
        {
          name: "statusWin",
          url: "/game/assets/images/status-win2.png",
        },
        {
          name: "statusLose",
          url: "/game/assets/images/status-lose2.png",
        },
      ],
    },
    mobile: {
      portrait: [
        {
          name: "loading",
          url: "/game/assets/images/loading-bg-hd-portrait.png",
        },
        { name: "bg", url: "/game/assets/images/bg-hd-portrait.png" },
        {
          name: "frame1",
          url: "/game/assets/images/frames/frame-main-fullhd.png",
        },
        {
          name: "frame2",
          url: "/game/assets/images/frames/frame-regular-hd.png",
        },
        {
          name: "frame3",
          url: "/game/assets/images/frames/frame-selected-hd.png",
        },
        {
          name: "frame4",
          url: "/game/assets/images/frames/frame-unselected-hd.png",
        },
        {
          name: "frame5",
          url: "/game/assets/images/frames/frame-main-hd.png",
        },
        {
          name: "frame6",
          url: "/game/assets/images/frames/frame-regular-hover-hd.png",
        },
        {
          name: "frame7",
          url: "/game/assets/images/frames/frame-regular-hover3-hd.png",
        },
        {
          name: "logo",
          url: "/game/assets/images/logo16.png",
        },
        {
          name: "test",
          url: "/game/assets/images/test.png",
        },
        {
          name: "startButton",
          url: "/game/assets/images/buttons/start.png",
        },
        {
          name: "playButton",
          url: "/game/assets/images/buttons/botao-play.png",
        },
        {
          name: "exitButton",
          url: "/game/assets/images/buttons/close5.png",
        },
        {
          name: "soundButton",
          url: "/game/assets/images/buttons/sound5.png",
        },
        {
          name: "soundButtonDown",
          url: "/game/assets/images/buttons/no-sound5.png",
        },
        {
          name: "musicButton",
          url: "/game/assets/images/buttons/music5.png",
        },
        {
          name: "musicButtonDown",
          url: "/game/assets/images/buttons/no-music5.png",
        },
        {
          name: "menuBg",
          url: "/game/assets/images/menu-bg-portrait2.png",
        },
        {
          name: "statusWaiting",
          url: "/game/assets/images/status-waiting2.png",
        },
        {
          name: "statusPlayerTurn",
          url: "/game/assets/images/status-player-turn2.png",
        },
        {
          name: "statusOpponentTurn",
          url: "/game/assets/images/status-opponent-turn3.png",
        },
        {
          name: "statusWin",
          url: "/game/assets/images/status-win2.png",
        },
        {
          name: "statusLose",
          url: "/game/assets/images/status-lose2.png",
        },
      ],
      landscape: [
        { name: "loading", url: "/game/assets/images/loading-bg-hd.png" },
        { name: "bg", url: "/game/assets/images/bg-hd.png" },
        {
          name: "frame1",
          url: "/game/assets/images/frames/frame-main-fullhd.png",
        },
        {
          name: "frame2",
          url: "/game/assets/images/frames/frame-regular-hd.png",
        },
        {
          name: "frame3",
          url: "/game/assets/images/frames/frame-selected-hd.png",
        },
        {
          name: "frame4",
          url: "/game/assets/images/frames/frame-unselected-hd.png",
        },
        {
          name: "frame5",
          url: "/game/assets/images/frames/frame-main-hd.png",
        },
        {
          name: "frame6",
          url: "/game/assets/images/frames/frame-regular-hover-hd.png",
        },
        {
          name: "frame7",
          url: "/game/assets/images/frames/frame-regular-hover3-hd.png",
        },
        {
          name: "logo",
          url: "/game/assets/images/logo16.png",
        },
        {
          name: "test",
          url: "/game/assets/images/test.png",
        },
        {
          name: "startButton",
          url: "/game/assets/images/buttons/start.png",
        },
        {
          name: "playButton",
          url: "/game/assets/images/buttons/botao-play.png",
        },
        {
          name: "exitButton",
          url: "/game/assets/images/buttons/close5.png",
        },
        {
          name: "soundButton",
          url: "/game/assets/images/buttons/sound5.png",
        },
        {
          name: "soundButtonDown",
          url: "/game/assets/images/buttons/no-sound5.png",
        },
        {
          name: "musicButton",
          url: "/game/assets/images/buttons/music5.png",
        },
        {
          name: "musicButtonDown",
          url: "/game/assets/images/buttons/no-music5.png",
        },
        {
          name: "menuBg",
          url: "/game/assets/images/menu-bg7.png",
        },
        {
          name: "statusWaiting",
          url: "/game/assets/images/status-waiting2.png",
        },
        {
          name: "statusPlayerTurn",
          url: "/game/assets/images/status-player-turn2.png",
        },
        {
          name: "statusOpponentTurn",
          url: "/game/assets/images/status-opponent-turn3.png",
        },
        {
          name: "statusWin",
          url: "/game/assets/images/status-win2.png",
        },
        {
          name: "statusLose",
          url: "/game/assets/images/status-lose2.png",
        },
      ],
    },
  },
};
