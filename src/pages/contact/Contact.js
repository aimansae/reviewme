import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/ReviewCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { Link } from "react-router-dom";
import style from "../../styles/ContactForm.module.css";

function Contact() {
  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    full_name: "",
    email: "",
    phone: "",
    query_text: "",
    created_at: "",
  });

  const { full_name, email, phone, query_text, created_at } = postData;

  const history = useHistory();

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("query_text", query_text);
    formData.append("created_at", created_at);

    try {
      const data = await axiosReq.post("/contact/", formData);
     // console.log(data);
      setMessage("Request sent successfully, we will contact you shortly..");

      // clear out the form after submission
      setPostData({
        full_name: "",
        email: "",
        phone: "",
        query_text: "",
        created_at: "",
      });
    } catch (err) {
      //console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className={styles.TextLeft}>
      <Form.Group>
        <Form.Control
          type="text"
          name="full_name"
          placeholder="Full Name:"
          value={full_name.toUpperCase()}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.full_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email:"
          value={email.toLowerCase()}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.email?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Control
          type="text"
          name="phone"
          value={phone}
          placeholder="Pnone Nr:"
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.phone?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Control
          as="textarea"
          rows={4}
          name="query_text"
          placeholder="Send your request here.."
          value={query_text}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.query_text?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className={style.Formstyle}>
          <Col className="my-auto p-0 p-md-2" md={6}>
            <h2 className="text-center">Contact us:</h2>

            {message && (
              <div>
                {" "}
                <Alert className={style.SuccessMessage} variant="success">
                  {message}
                </Alert>
              </div>
            )}

            <Container className={appStyles.Content}>{textFields}</Container>

            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <div className={`text-center ${style.ButtonPosition}`}>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Green}`}
                  type="submit"
                >
                  send
                </Button>

                <Button
                  className={`${btnStyles.Button} ${btnStyles.Red}`}
                  onClick={() => history.goBack()}
                >
                  cancel
                </Button>
                {errors?.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                  </Alert>
                ))}
              </div>
            </Container>
          </Col>
          <Col className=" p-2 text-center" md={6}>
            <h2 className=" m4-2 ">
              About us<i className={`fa-regular fa-star ${style.StarIcon}`}></i>
            </h2>
            <p className={`ml-2 mt-2 ${style.AboutText} lead`}>
              Welcome to our review website! <br />
              We are dedicated to providing you with honest and informative
              reviews on a wide range of beauty products.
              <br />
              At our review website, we value your feedback and encourage you to
              share your own experiences in the comments section. Together, we
              can help each other make informed purchasing decisions and find
              the best products and services out there. Review a product here{" "}
              <Link to="/reviews/write">
                <i className={`fa-solid fa-plus ${style.ReviewLink}`}></i>Review
              </Link>
            </p>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Contact;
