import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import GameEngine from "../../engine/engine";
import "./Match.css";

const Match = (props) => {
  const matchId = props.match.params.id;
  const gameWrapperRef = useRef();
  let history = useHistory();
  let gameEngine = useRef;

  useEffect(() => {
    const closeGamePage = () => {
      history.push("/");
    };
    gameEngine.current = new GameEngine(gameWrapperRef.current, closeGamePage);
    gameEngine.current.init(matchId);
  }, [gameEngine, matchId, gameWrapperRef, history]);

  return <div className="game-placement" ref={gameWrapperRef} />;
};

export default Match;
