import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import styles from '../../styles/Star.module.css'


const StarRating = () => {

    const colors = {
        yellow: 'yellow',
        grey: 'grey',
    }

    const stars = Array(5).fill(0)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(undefined)

    const handleClick = value => {
        setRating(value)
    }

    const handleMouseover = newHoverValue => {
        setHover(newHoverValue)
    }

    const handleMouseLeave = () => {
        setHover(undefined)
    }

    return (
        <div className='d-flex justify-content-center'>
            <div>Review
              
                {stars.map((star, index) => {
                    return (
                        <FaStar
                            className={styles.Star}
                            key={index}
                            color={(hover || rating) > index ? colors.yellow : colors.grey}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseover(index + 1)}
                            onMouseLeave={handleMouseLeave} />
                    )
                })}
            </div>
        </div>
    )
}

export default StarRating