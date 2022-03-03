import React from 'react';
import styles from './emailTile.module.css';
import Avatar from 'Components/Avatar/Avatar';
import { formateDate } from 'utils';

const EmailTile = ({
  read,
  favourite,
  from,
  date,
  short_description,
  onClick,
}) => {
  return (
    <article
      className={`${styles.main} ${read ? styles.read : styles.unread}`}
      onClick={onClick}
    >
      <aside className={styles.aside}>
        <Avatar name={from.name} />
      </aside>
      <div className={styles.body}>
        <div>
          From: <span className='bold'>{`${from.name} <${from.email}>`}</span>
        </div>
        <div>
          Subject: <span className='bold'>Lorem Ipsum</span>
        </div>
        <p>{short_description}</p>
        <div>
          <span className='mr-5'>{formateDate(date)}</span>
          {favourite && <span className={styles.favorite}>Favorite</span>}
        </div>
      </div>
    </article>
  );
};

export default EmailTile;
