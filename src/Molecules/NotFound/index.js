import React from 'react';
import styles from './style.module.scss';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound_message}>
        Ooops... we cant reach out this page.
      </h1>
      <h2>Please go back <span><Link to="/">====></Link></span></h2>
    </div>
  );
};

export default NotFound;
