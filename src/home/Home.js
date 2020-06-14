import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Home = () => {
  let history = useHistory();
  const [matches, setMatches] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  useEffect(() => {
    listMatches();
    const periodicMatchFetch = setInterval(() => listMatches(), 2000);
    return function cleanup() {
      clearInterval(periodicMatchFetch);
    };
  }, []);

  const listMatches = () => {
    const requestOptions = {
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    fetch("http://localhost:8000/lobby/lobby/", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error === undefined) {
            setMatches(result.matches);
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  };

  const createMatch = () => {
    const requestOptions = {
      method: "POST",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    fetch("http://localhost:8000/match/match/", requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error === undefined) {
            history.push("/match/" + result.match_id + "/");
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  };

  const joinMatch = (matchId) => {
    const requestOptions = {
      method: "POST",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    };
    fetch(
      "http://localhost:8000/match/match/join/" + matchId + "/",
      requestOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error === undefined) {
            if (result.joined) {
              history.push("/match/" + matchId + "/");
            }
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Ongoing matches</h2>
          <ListGroup>
            {matches.map((value, index) => {
              return (
                <ListGroup.Item key={index}>
                  {value.name}
                  <Button
                    variant="success"
                    onClick={() => joinMatch(value.id)}
                    className="float-right"
                  >
                    Join
                  </Button>{" "}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col>
          <Button onClick={logout} variant="light">
            Logout
          </Button>
          <Button onClick={createMatch} variant="info">
            Create Match
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
