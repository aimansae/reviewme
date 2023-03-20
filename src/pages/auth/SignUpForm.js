/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/SignInUpForm.module.css';
import { useRedirect } from '../../hooks/useRedirect';

function SignUpForm() {
  useRedirect('loggedIn');
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  });
  // destructuring signUpData
  const { username, password1, password2 } = signUpData;

  // errors
  const [errors, setErrors] = useState({});
  const history = useHistory();
  // onChange function for input

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };
  // form submit handler

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData);
      history.push('/login');
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2 offset-2" md={8}>
        <Container className={appStyles.Content}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
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
              <Alert variant="danger" className="text-center" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="danger" className="text-center" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Repeat Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Repeat Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="danger" className="text-center" key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              variant="success"
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign up
            </Button>
            {/* if passwords dont match Credit CI walkthrough */}

            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="danger" className="text-center mt-3" key={idx}>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/login">
            Already have an account?
            {' '}
            <span>Login now!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
}

export default SignUpForm;
