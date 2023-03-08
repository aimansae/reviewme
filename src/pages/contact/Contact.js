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

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };
 //to send successfull message
 const [isSubmitted, setIsSubmitted] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault();
//to send successfull message        
        setIsSubmitted(true)
        const formData = new FormData();

        formData.append("full_name", full_name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("query_text", query_text);
        formData.append("created_at", created_at);

        try {
            await axiosReq.post("/contact/", formData);
            history.push("/");

        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className={styles.TextLeft}>
            <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    name="full_name"
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
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
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.phone?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}

            <Form.Group>
                <Form.Label>Your message</Form.Label>
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
            {!isSubmitted ? (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6} xl={8} className="p-0 p-md-2 offset-2">
                            <h1 className="text-center">Contact us:</h1>
                            <Container className={appStyles.Content}>{textFields}</Container>
                        </Col>
                        <Col className="py-2 p-0 p-md-2 offset-2" md={6} xl={8}>
                            <Container
                                className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                            >


                                <div className="text-center">
                                    <Button
                                        variant="success"
                                        className={`${btnStyles.Button} ${btnStyles.Blue}`}
                                        onClick={() => history.goBack()}
                                    >
                                        cancel
                                    </Button>

                                    <Button
                                        variant="success"
                                        className={`${btnStyles.Button} ${btnStyles.Blue}`}
                                        type="submit"

                                    >
                                        Submit
                                    </Button>
                                    {errors?.non_field_errors?.map((message, idx) => (
                                        <Alert key={idx} variant="warning" className="mt-3">
                                            {message}
                                        </Alert>
                                    ))}
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <div>
                    <p>Thank you for submitting the form!</p>
                    <button onClick={() => setIsSubmitted(false)}>Submit Another</button>
                </div>
            )}
        </>

    );

}




export default Contact;
