import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { Requests } from "../../communication/requests";
import "./Login.css";

const Login = () => {
  let history = useHistory();
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      setValidated(true);
      loginUser();
    }
  };

  const loginUser = () => {
    Requests.loginUser(username, password).then(
      (result) => {
        if (result.error !== undefined) {
          setValidated(false);
          setErrorMessage(result.message);
        } else {
          setErrorMessage("");
          localStorage.setItem("token", result.token);
          setTimeout(() => {
            history.push("/");
          }, 1000);
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {}
    );
  };

  return (
    <div className="login-card-wrapper">
      <Card style={{ width: "18rem" }}>
        <Card.Header className="text-center">Login</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                minLength="3"
                onChange={handleUsernameChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                minLength="4"
                onChange={handlePasswordChange}
              />
            </Form.Group>
            {errorMessage !== "" && (
              <Alert variant="danger">{errorMessage}</Alert>
            )}
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
            <div className="mt-3 register-link">
              Not registered?{" "}
              <a href={"/registration"}>
                <b>Create an account</b>
              </a>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
