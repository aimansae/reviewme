import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset"
import styles from "../../styles/ReviewCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Image } from "react-bootstrap";

function ReviewCreateForm() {

  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: "",
  })

  const { title, description, image } = postData

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    })
  }

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image)
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      })

    }
  }

  const textFields = (
    <div className="text-center">
      {/* Add your form fields here */}
      <Form.Group controlId="title">
        <Form.Label>Product Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}

        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>





    </div>
  );

  return (
    <Form>
      <Row>
        <Col md={6} xl={8} className="d-md-block p-0 p-md-2 offset-2">
          <Container className={appStyles.Content}>{textFields}
          </Container>
        </Col>
        <Col className="py-2 p-0 p-md-2 offset-2" md={6} xl={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                <figure>
                  <Image className={appStyles.Image} src={image} rounded/>
                </figure>
                <div>
                  <Form.Label 
                  className={`${btnStyles.Button}${btnStyles.Green} btn `}
                  htmlFor="image-upload"
                  >

                  
                  Change Image
                  </Form.Label>
                </div>
                </>

              ) : (
                <Form.Label
                className="d-flex justify-content-center"
                htmlFor="image-upload"
              >
                <Asset src={Upload} message="Click to upload product image" />
              </Form.Label>

              )}

             
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
              />

            </Form.Group>

            <div className="text-center">
              <Button
                variant='success'
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => { }}
              >
                cancel
              </Button>
              <Button variant='success' className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                create
              </Button>
            </div>
          </Container>
        </Col>


      </Row>
    </Form>
  );
}

export default ReviewCreateForm;