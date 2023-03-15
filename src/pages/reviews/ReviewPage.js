import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Review from "./Review";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import style from "../../styles/ContactForm.module.css";

function ReviewPage() {
  const { id } = useParams();
  const [review, setReview] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  const history = useHistory();

  //Create a state variable for the rating.
  const [stars, setStars] = useState();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: review }, { data: comments }] = await Promise.all([
          axiosReq.get(`/reviews/${id}`),
          axiosReq.get(`/comments/?review=${id}`),
        ]);

        setReview({ results: [review] });
        // rating
        console.log(review);
        setComments(comments);
        // rating

        const new_stars = review.rating;
        console.log(`Rating from api: ${review.rating}`);
        setStars(new_stars);
        console.log(`Rating: ${stars}`);
      } catch (err) {
        console.log(err);
        if ((err.response.status === 404) | (err.response.status === 400)) {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [id, history, stars]);

  return (
    <Row className="h-100">
      <Col md={12} xl={8} className="offset-xl-2">
        <Review
          {...review.results[0]}
          setReviews={setReview}
          ratingValue={stars}
          reviewPage
        />
      </Col>
      <Col md={12} xl={8} className="offset-xl-2">
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              review={id}
              setReview={setReview}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            <p className="text-center lead text-secondary">Comments</p>
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setReview={setReview}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <p className="text-left text-secondary">
              No comments yet... Leave a comment
            </p>
          ) : (
            <p className="text-left text-secondary">
              No comments yet...{" "}
              <Link to="/login">
                <i className={`fa-solid fa-plus ${style.ReviewLink}`}></i>Login
                to see more
              </Link>
            </p>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ReviewPage;
