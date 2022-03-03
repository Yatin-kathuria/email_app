import React from 'react';
import styles from './button.module.css';

const Button = ({ type, children, className, bordered, ...rest }) => {
  return (
    <button
      className={`${styles.button}
      ${type === 'primary' ? styles.primary : ''}
      ${type === 'secondary' ? styles.secondary : ''}
      ${bordered ? styles.bordered : ''}
      ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
