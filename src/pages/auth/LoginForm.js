import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";

function LoginForm() {
  const setCurrentUser = useSetCurrentUser();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  //destructuring signUpData
  const { username, password } = loginData;

  const [errors, setErrors] = useState({});

  // onchange handler

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  // form submit handler
  const history = useHistory();

  const handleSubmit = async (event) => {
    // to avoid that the page refreshes
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", loginData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2 offset-2" md={8}>
        <Container className={appStyles.Content}>
          <h1 className={styles.Header}>login</h1>
          {/* Add your form here */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>

            {errors.username?.map((message, idx) => (
              <Alert className="text-center" variant="danger" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert className="text-center" variant="danger" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              variant="success"
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Login
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
}

export default LoginForm;
