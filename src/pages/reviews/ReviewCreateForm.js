/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

import { useHistory } from 'react-router';
import ReactStars from 'react-rating-stars-component';
import Upload from '../../assets/upload.png';

import Asset from '../../components/Asset';
import styles from '../../styles/ReviewCreateEditForm.module.css';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { useRedirect } from '../../hooks/useRedirect';

function ReviewCreateForm() {
  useRedirect('loggedOut');
  const [errors, setErrors] = useState({});

  // for rating

  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const [postData, setPostData] = useState({
    product_title: '',
    description: '',
    image: '',
    price: '',
  });

  const {
    product_title, description, image, price,
  } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

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

    formData.append('product_title', product_title);
    formData.append('description', description);
    formData.append('image', imageInput.current.files[0]);
    formData.append('price', price);
    formData.append('rating', rating);

    try {
      const { data } = await axiosReq.post('/reviews/', formData);
      history.push(`/reviews/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className={styles.TextLeft}>
      {/* RATING */}
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />

      <Form.Group>
        <Form.Label>Product Title:</Form.Label>
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
        <Form.Label>Description:</Form.Label>
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
        <Form.Label column sm="3">
          Price €:
        </Form.Label>
        <Col sm={3}>
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
      {/* message */}
      <Row>
        <Col md={12} xl={8} className="offset-xl-2">

          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
        <Col md={12} xl={8} className="offset-xl-2">
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
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
                cancel
              </Button>

              <Button
                className={`${btnStyles.Button} ${btnStyles.Green}`}
                type="submit"
              >
                create
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

export default ReviewCreateForm;
