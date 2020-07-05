import config from "./config";

export default {
  desktop: {
    landscape: {
      board: {
        width: config.renderer.desktop.width,
        height: config.renderer.desktop.height,
        position: {
          x: 0,
          y: 0,
        },
      },
      arena: {
        width: (config.renderer.desktop.width * 2) / 3 - 30,
        height: config.renderer.desktop.height - 40,
        position: {
          x: 20,
          y: 20,
        },
      },
      menu: {
        width: config.renderer.desktop.width / 3 - 30,
        height: config.renderer.desktop.height - 40,
        position: {
          x: (config.renderer.desktop.width * 2) / 3 + 10,
          y: 20,
        },
      },
      character: {
        margin: {
          x: 10,
          y: 10,
        },
        font: {
          fill: ["#444", "#333"],
          fillGradientStops: [0.5],
          fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
          fontWeight: 900,
          fontSize: 20,
          lineJoin: "round",
        },
      },
      buttons: {
        loading: {
          images: {
            up: "startButton-landscape",
          },
          width: 200,
          height: 200,
          position: {
            x: 540,
            y: 420,
          },
          id: "startButton",
        },
        play: {
          images: {
            up: "playButton-landscape",
          },
          width: 120,
          height: 120,
          position: {
            x: 138,
            y: 490,
          },
          id: "playButton",
          events: [
            {
              name: "clickablePlay",
              callback: "isClickable",
            },
            {
              name: "enterState",
              callback: "enableVisibility",
            },
            {
              name: "exitState",
              callback: "disableVisibility",
            },
          ],
        },
        exit: {
          images: {
            up: "exitButton-landscape",
          },
          width: 40,
          height: 40,
          position: {
            x: 337,
            y: 20,
          },
          id: "exitButton",
        },
        sound: {
          images: {
            up: "soundButton-landscape",
            down: "soundButtonDown-landscape",
          },
          width: 40,
          height: 40,
          position: {
            x: 287,
            y: 20,
          },
          id: "soundButton",
        },
        music: {
          images: {
            up: "musicButton-landscape",
            down: "musicButtonDown-landscape",
          },
          width: 40,
          height: 40,
          position: {
            x: 237,
            y: 20,
          },
          id: "musicButton",
        },
      },
      logo: {
        width: 180,
        height: 40,
        position: {
          x: 20,
          y: 20,
        },
      },
      match: {
        labels: {
          name: {
            label: {
              position: { x: 20, y: 70 },
              font: {
                fill: ["#444", "#333"],
                fillGradientStops: [0.5],
                fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                fontWeight: 900,
                fontSize: 17,
                lineJoin: "round",
              },
            },
            text: {
              font: {
                fill: ["#6a509b", "#55407c"],
                fillGradientStops: [0.5],
                fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                fontWeight: 900,
                fontSize: 17,
                lineJoin: "round",
              },
            },
          },
          opponent: {
            name: {
              label: {
                position: { x: 20, y: 94 },
                font: {
                  fill: ["#444", "#333"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
              text: {
                font: {
                  fill: ["#81341e", "#692a19"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
            },
            card: {
              label: {
                position: { x: 377, y: 70 },
                anchor: { x: 1, y: 0 },
                font: {
                  fill: ["#444", "#333"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
            },
            missingCards: {
              label: {
                position: { x: 20, y: 118 },
                font: {
                  fill: ["#444", "#333"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
              text: {
                font: {
                  fill: ["#26581c", "#1b3f14"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
            },
          },
        },
        status: {
          position: {
            x: 20,
            y: 170,
          },
          width: 225,
          height: 50,
          font: {
            waiting: {
              fill: ["#615b1a", "#514c15"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 20,
              lineJoin: "round",
            },
            playerTurn: {
              fill: ["#2c6321", "#26561c"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            opponentTurn: {
              fill: ["#5d2414", "#4a1c0f"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            lose: {
              fill: ["#e1e1e1", "#e9e9e9"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            win: {
              fill: ["#5e4f15", "#4c4113"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
          },
        },
        cards: {
          player: {
            position: {
              x: 113,
              y: 248,
            },
            width: 160,
            height: 184,
          },
          opponent: {
            position: {
              x: 257,
              y: 94,
            },
            width: 120,
            height: 138,
          },
        },
      },
    },
  },
  mobile: {
    portrait: {
      board: {
        width: config.renderer.mobile.width,
        height: config.renderer.mobile.height,
        position: {
          x: 0,
          y: 0,
        },
      },
      arena: {
        width: config.renderer.mobile.width - 40,
        height: (config.renderer.mobile.height * 2) / 3 - 30,
        position: {
          x: 20,
          y: 20,
        },
      },
      menu: {
        width: config.renderer.mobile.width - 40,
        height: config.renderer.mobile.height / 3 - 30,
        position: {
          x: 20,
          y: (config.renderer.mobile.height * 2) / 3 + 10,
        },
      },
      character: {
        margin: {
          x: 10,
          y: 10,
        },
        font: {
          fill: ["#444", "#333"],
          fillGradientStops: [0.5],
          fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
          fontWeight: 900,
          fontSize: 20,
          lineJoin: "round",
        },
      },
      buttons: {
        loading: {
          images: {
            up: "startButton-portrait",
          },
          width: 200,
          height: 200,
          position: {
            x: 260,
            y: 820,
          },
          id: "startButton",
        },
        play: {
          images: {
            up: "playButton-portrait",
          },
          width: 120,
          height: 120,
          position: {
            x: 490,
            y: 138,
          },
          id: "playButton",
          events: [
            {
              name: "clickablePlay",
              callback: "isClickable",
            },
            {
              name: "enterState",
              callback: "enableVisibility",
            },
            {
              name: "exitState",
              callback: "disableVisibility",
            },
          ],
        },
        exit: {
          images: {
            up: "exitButton-portrait",
          },
          width: 60,
          height: 60,
          position: {
            x: 600,
            y: 317,
          },
          id: "exitButton",
        },
        sound: {
          images: {
            up: "soundButton-portrait",
            down: "soundButtonDown-portrait",
          },
          width: 60,
          height: 60,
          position: {
            x: 530,
            y: 317,
          },
          id: "soundButton",
        },
        music: {
          images: {
            up: "musicButton-portrait",
            down: "musicButtonDown-portrait",
          },
          width: 60,
          height: 60,
          position: {
            x: 460,
            y: 317,
          },
          id: "musicButton",
        },
      },
      logo: {
        width: 270,
        height: 60,
        position: {
          x: 20,
          y: 20,
        },
      },
      match: {
        labels: {
          name: {
            label: {
              position: { x: 20, y: 90 },
              font: {
                fill: ["#444", "#333"],
                fillGradientStops: [0.5],
                fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                fontWeight: 900,
                fontSize: 17,
                lineJoin: "round",
              },
            },
            text: {
              font: {
                fill: ["#6a509b", "#55407c"],
                fillGradientStops: [0.5],
                fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                fontWeight: 900,
                fontSize: 17,
                lineJoin: "round",
              },
            },
          },
          opponent: {
            name: {
              label: {
                position: { x: 20, y: 114 },
                font: {
                  fill: ["#444", "#333"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
              text: {
                font: {
                  fill: ["#81341e", "#692a19"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
            },
            card: {
              label: {
                position: { x: 20, y: 162 },
                anchor: { x: 0, y: 0 },
                font: {
                  fill: ["#444", "#333"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
              text: {
                font: {
                  fill: ["#26581c", "#1b3f14"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
            },
            missingCards: {
              label: {
                position: { x: 20, y: 138 },
                font: {
                  fill: ["#444", "#333"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
              text: {
                font: {
                  fill: ["#26581c", "#1b3f14"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
            },
          },
        },
        status: {
          position: {
            x: 425,
            y: 20,
          },
          width: 235,
          height: 60,
          font: {
            waiting: {
              fill: ["#615b1a", "#514c15"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            playerTurn: {
              fill: ["#2c6321", "#26561c"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            opponentTurn: {
              fill: ["#5d2414", "#4a1c0f"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            lose: {
              fill: ["#e1e1e1", "#e9e9e9"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            win: {
              fill: ["#5e4f15", "#4c4113"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
          },
        },
        cards: {
          player: {
            position: {
              x: 255,
              y: 106,
            },
            width: 160,
            height: 184,
          },
          opponent: {
            position: {
              x: 20,
              y: 186,
            },
            width: 128,
            height: 147,
          },
        },
      },
    },
    landscape: {
      board: {
        width: config.renderer.desktop.width,
        height: config.renderer.desktop.height,
        position: {
          x: 0,
          y: 0,
        },
      },
      arena: {
        width: (config.renderer.desktop.width * 2) / 3 - 30,
        height: config.renderer.desktop.height - 40,
        position: {
          x: 20,
          y: 20,
        },
      },
      menu: {
        width: config.renderer.desktop.width / 3 - 30,
        height: config.renderer.desktop.height - 40,
        position: {
          x: (config.renderer.desktop.width * 2) / 3 + 10,
          y: 20,
        },
      },
      character: {
        margin: {
          x: 10,
          y: 10,
        },
        font: {
          fill: ["#444", "#333"],
          fillGradientStops: [0.5],
          fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
          fontWeight: 900,
          fontSize: 20,
          lineJoin: "round",
        },
      },
      buttons: {
        loading: {
          images: {
            up: "startButton-portrait",
          },
          width: 200,
          height: 200,
          position: {
            x: 540,
            y: 420,
          },
          id: "startButton",
        },
        play: {
          images: {
            up: "playButton-portrait",
          },
          width: 120,
          height: 120,
          position: {
            x: 138,
            y: 490,
          },
          id: "playButton",
          events: [
            {
              name: "clickablePlay",
              callback: "isClickable",
            },
            {
              name: "enterState",
              callback: "enableVisibility",
            },
            {
              name: "exitState",
              callback: "disableVisibility",
            },
          ],
        },
        exit: {
          images: {
            up: "exitButton-portrait",
          },
          width: 40,
          height: 40,
          position: {
            x: 337,
            y: 20,
          },
          id: "exitButton",
        },
        sound: {
          images: {
            up: "soundButton-portrait",
            down: "soundButtonDown-portrait",
          },
          width: 40,
          height: 40,
          position: {
            x: 287,
            y: 20,
          },
          id: "soundButton",
        },
        music: {
          images: {
            up: "musicButton-portrait",
            down: "musicButtonDown-portrait",
          },
          width: 40,
          height: 40,
          position: {
            x: 237,
            y: 20,
          },
          id: "musicButton",
        },
      },
      logo: {
        width: 180,
        height: 40,
        position: {
          x: 20,
          y: 20,
        },
      },
      match: {
        labels: {
          name: {
            label: {
              position: { x: 20, y: 70 },
              font: {
                fill: ["#444", "#333"],
                fillGradientStops: [0.5],
                fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                fontWeight: 900,
                fontSize: 17,
                lineJoin: "round",
              },
            },
            text: {
              font: {
                fill: ["#6a509b", "#55407c"],
                fillGradientStops: [0.5],
                fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                fontWeight: 900,
                fontSize: 17,
                lineJoin: "round",
              },
            },
          },
          opponent: {
            name: {
              label: {
                position: { x: 20, y: 94 },
                font: {
                  fill: ["#444", "#333"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
              text: {
                font: {
                  fill: ["#81341e", "#692a19"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
            },
            card: {
              label: {
                position: { x: 377, y: 70 },
                anchor: { x: 1, y: 0 },
                font: {
                  fill: ["#444", "#333"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
            },
            missingCards: {
              label: {
                position: { x: 20, y: 118 },
                font: {
                  fill: ["#444", "#333"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
              text: {
                font: {
                  fill: ["#26581c", "#1b3f14"],
                  fillGradientStops: [0.5],
                  fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  lineJoin: "round",
                },
              },
            },
          },
        },
        status: {
          position: {
            x: 20,
            y: 170,
          },
          width: 225,
          height: 50,
          font: {
            waiting: {
              fill: ["#615b1a", "#514c15"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 20,
              lineJoin: "round",
            },
            playerTurn: {
              fill: ["#2c6321", "#26561c"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            opponentTurn: {
              fill: ["#5d2414", "#4a1c0f"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            lose: {
              fill: ["#e1e1e1", "#e9e9e9"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
            win: {
              fill: ["#5e4f15", "#4c4113"],
              fillGradientStops: [0.5],
              fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 17,
              lineJoin: "round",
            },
          },
        },
        cards: {
          player: {
            position: {
              x: 113,
              y: 248,
            },
            width: 160,
            height: 184,
          },
          opponent: {
            position: {
              x: 257,
              y: 94,
            },
            width: 120,
            height: 138,
          },
        },
      },
    },
  },
};
