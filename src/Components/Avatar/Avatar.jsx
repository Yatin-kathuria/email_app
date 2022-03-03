import React from 'react';
import styles from './avatar.module.css';

const Avatar = ({ name }) => {
  return <div className={styles.root}>{name[0].toUpperCase()}</div>;
};

export default Avatar;
