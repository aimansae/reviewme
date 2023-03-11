import React from "react";
import styles from "../styles/Avatar.module.css";

const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img 
      className={`${styles.Avatar} mr-2` } 
      src={src} 
      height={height} 
      width={height}
      alt="avatar" 
      />
      {text}
    </span>
  );
};

export default Avatar;
