import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { DropDown } from "../../components/DropDown";
import { useCurrentUser } from "../../context/CurrentUserContext";
import styles from "../../styles/Comment.module.css";
import CommentEditForm from "./CommentEditForm";
import ModalAlert from "../../components/ModalAlert";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setReview,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setReview((prevReview) => ({
        results: [
          {
            ...prevReview.results[0],
            comments_count: prevReview.results[0].comments_count - 1,
          },
        ],
      }));
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
    setShow(false);
  };

  // form modal confirmation
  const showConfirmDeleteModal = (event) => {
    setShow(true);
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center">
          <span className={styles.Owner}>{owner}</span>
          <span className= {styles.Date}>{updated_at}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p className="mt-2">{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <DropDown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={showConfirmDeleteModal}
          />
        )}
      </Media>
      <ModalAlert
        show={show}
        handleClose={() => setShow(false)}
        onConfirm={handleDelete}
        title="ReviewME"
        message={"Are you sure you want to delete this comment?"}
      />
    </>
  );
};
export default Comment;
