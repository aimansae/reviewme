/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';

import { Spinner } from 'react-bootstrap';

import styles from '../styles/Asset.module.css';

function Asset({ spinner, src, message }) {
  return (
    <div className={`${styles.Asset} pl-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default Asset;
