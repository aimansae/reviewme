import React from "react";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { DropDown } from "../../components/DropDown";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/Review.module.css";

const Review = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comment_count,
    likes_count,
    like_id,
    product_title,
    description,
    image,
    updated_at,
    reviewPage,
    setReviews,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/reviews/${id}/edit`)

  }

  const handleDelete = async() => {
    try{
      await axiosRes.delete(`/reviews/${id}/`)
      history.goBack();

    }catch(err){
      console.log(err);

    }
    
  }

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

        })
      }))

    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <Card className={styles.Review}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
              {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && reviewPage && (
            <DropDown handleEdit={handleEdit} handleDelete={handleDelete} 
            />
          )}
          </div>
        </Media>
      </Card.Body>
      {product_title && (
        <Card.Title className="text-left m-4 ">{product_title}</Card.Title>
      )}
      {description && <Card.Text>{description}</Card.Text>}
      <Link to={`/reviews/${id}`}>
        <Card.Img className={styles.ImgSize} src={image} alt={product_title} />
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
        </div>
      </Card.Body>
    </Card>
  );
};

export default Review;
