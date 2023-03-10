import React, { useState } from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { DropDown } from "../../components/DropDown";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/Review.module.css";
import ModalAlert from "../../components/ModalAlert";

//import Rating from 'react-rating-stars-component';



const Review = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comment_count,
    likes_count,
    like_id,
    save_id,
    product_title,
    description,
    image,
    updated_at,
    reviewPage,
    setReviews,

  } = props;
  //to add rating,

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/reviews/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/reviews/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
    setShow(false);
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { review: id });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
              ...review,
              likes_count: review.likes_count + 1,
              like_id: data.id,
            }
            : review;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      const { data } = await axiosRes.delete(`/likes/${like_id}/`);
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
              ...review,
              likes_count: review.likes_count - 1,
              like_id: data.id,
            }
            : review;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };
  // adding save functionality

  const handleSave = async () => {
    try {
      const { data } = await axiosRes.post("/saved/", { review: id });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id ? { ...review, save_id: data.id, } : review;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };

  const handleUnsave = async () => {
    try {
      const { data } = await axiosRes.delete(`/saved/${save_id}/`);
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
              ...review,
              save_id: data.id,
            } : review;
        }),
      }));
    } catch (err) {
      //console.log(err);
    }
  };
// form modal confirmation
  const showConfirmDeleteModal = (event) => {
    setShow(true);
  };

  const [show, setShow] = useState(false);


  return (
    <>
    <Card className={styles.Review}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span className={styles.Span}>{updated_at}</span>
            {is_owner && reviewPage && (
              <DropDown handleEdit={handleEdit} handleDelete={showConfirmDeleteModal} />
            )}
          </div>
        </Media>
      </Card.Body>

      {/* //to add rating,{rating && (
        <Card.Title className="text-left m-4 ">Rating:{rating}</Card.Title>
            )}}*/}

      <Card.Body>
   
        {product_title && (
          <Card.Title className={`text-center ${styles.Title} `}>{product_title}</Card.Title>
        )}
        {description && <Card.Text>{description}</Card.Text>}
      </Card.Body>

      <Link to={`/reviews/${id}`}>
        <Card.Img className={styles.ImgSize} src={image} alt={product_title} width={50} />

      </Link>


      <Card.Body>
        <div className={styles.ReviewBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}

          <Link to={`/reviews/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comment_count}
      

          {/*save functionality*/}
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't save your own post!</Tooltip>}
            >
              <i className="fa-solid fa-tag" />
            </OverlayTrigger>
          ) : save_id ? (
            <span onClick={handleUnsave}>
              <i className={`fa-solid fa-tag ${styles.SaveTag}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleSave}>
              <i className={`fa-solid fa-tag ${styles.SaveTagOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to save posts!</Tooltip>}
            >
              <i className="fa-solid fa-tag" />
            </OverlayTrigger>
          )}
          {/*end saved*/}
          </div>

         
      </Card.Body>
    </Card>

      <ModalAlert
      show={show}
      handleClose={() => setShow(false)}
      onConfirm={handleDelete}
      title="ReviewME"
      message={"Are you sure you want to delete this review?"}
    />
 </>


  );
};

export default Review;
