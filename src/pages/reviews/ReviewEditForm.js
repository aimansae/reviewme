import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/ReviewCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import iconStyle from "../../styles/DropDown.module.css";

function ReviewEditForm() {
  const [errors, setErrors] = useState({});

  {
    /*rating: "", */
  }

  const [postData, setPostData] = useState({
    product_title: "",
    description: "",
    image: "",
    price: "",
  });

  {
    /*rating: "", formData.append("rating", rating); */
  }
  const { product_title, description, image, price } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/${id}/`);
        const { product_title, description, image, is_owner, price } = data;

        is_owner
          ? setPostData({ product_title, description, image, price })
          : history.push("/");
      } catch (err) {
        //console.log(err);
      }
    };
    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("product_title", product_title);
    formData.append("description", description);
    formData.append("price", price);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/reviews/${id}/`, formData);
      history.push(`/reviews/${id}`);
    } catch (err) {
      //console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className={styles.TextLeft}>
      {/* RATING */}

      <Form.Group>
        <Form.Label>Product Title</Form.Label>
        <Form.Control
          type="text"
          name="product_title"
          value={product_title.toUpperCase()}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.product_title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          placeholder="Describe the product.."
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group as={Row}>
        <Form.Label column xs="3">
          Price ???:
        </Form.Label>
        <Col xs={4}>
          <Form.Control
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      {errors?.price?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
      <Col md={12} xl={8} className="offset-xl-2" >
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
        <Col md={12} xl={8} className="offset-xl-2" >
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button}${btnStyles.Blue} btn `}
                  htmlFor="image-upload"
                >
                  <i
                    className={`${iconStyle.IconColor} fa-solid fa-pen-to-square`}
                  />
                  Change Image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="text-center">
              <Button
                className={`${btnStyles.Button} ${btnStyles.Red}`}
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button
                className={`${btnStyles.Button} ${btnStyles.Green}`}
                type="submit"
              >
                Update
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
  );
}

export default ReviewEditForm;
