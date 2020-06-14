import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import GameEngine from "../engine/engine";

const Match = (props) => {
  const matchId = props.match.params.id;
  const gameWrapperRef = useRef();
  let history = useHistory();
  let gameEngine = useRef;

  useEffect(() => {
    gameEngine.current = new GameEngine(gameWrapperRef.current);
    getMatchData(gameEngine, matchId);
    const periodicMatchInfoFetch = setInterval(
      () => getMatchStatus(gameEngine, matchId),
      2000
    );
    return function cleanup() {
      clearInterval(periodicMatchInfoFetch);
    };
  }, [gameEngine, matchId, gameWrapperRef]);

  const getMatchStatus = (gameEngine, matchId) => {
    const requestOptions = {
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    fetch(
      "http://localhost:8000/match/match/status/" + matchId + "/",
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error === undefined) {
            gameEngine.current.updateGameStatus(result);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  };

  const getMatchData = (gameEngine, matchId) => {
    const requestOptions = {
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    fetch("http://localhost:8000/match/match/" + matchId + "/", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error === undefined) {
            gameEngine.current.init(result);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  };

  const leaveMatch = () => {
    const requestOptions = {
      method: "POST",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    fetch(
      "http://localhost:8000/match/match/leave/" + matchId + "/",
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error === undefined) {
            history.push("/");
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  };

  return (
    <div>
      <div>
        <Button onClick={leaveMatch} variant="light">
          Abandon Match
        </Button>
      </div>
      <div ref={gameWrapperRef} />
    </div>
  );
};

export default Match;
