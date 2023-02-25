import React from 'react'
import { Card, Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { useCurrentUser } from '../../context/CurrentUserContext'
import styles from '../../styles/Review.module.css'


const Review = (props) => {

  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    product_title,
    description,
    image,
    updated_at,
    reviewPage,

  } = props

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  return (
  
      <Card className={styles.Review}>
        <Card.Body>
       
          <Media className="align-item-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55}>{owner}</Avatar>

            </Link>
            <div className='d-flex align-items-center'>
              <span>{updated_at}</span>
              {is_owner && reviewPage & "..."}



            </div>

          </Media>
        </Card.Body>
        {product_title && <Card.Title className='text-left m-4 '>{product_title}</Card.Title>}
        <Link to={`/reviews/${id}`}>
          <Card.Img src={image} alt={product_title} />

        </Link>
        <Card.Body>
         
          {description && <Card.Text>{description}</Card.Text>}
        </Card.Body>
    </Card>
    
  )
}

export default Review