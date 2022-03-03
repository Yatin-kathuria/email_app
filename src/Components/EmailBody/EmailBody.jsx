import React, { useEffect } from 'react';
import Avatar from 'Components/Avatar/Avatar';
import Button from 'Components/Button/Button';
import styles from './emailBody.module.css';
import { formateDate } from 'utils';
import { getEmailBody } from 'api';
import { useDispatch } from 'react-redux';
import { toggleFavourite, updateEmailBody } from 'store/emailSlice';

const EmailBody = ({ date, favourite, subject, from, body, id, index }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!body) {
      getEmailBody(id)
        .then(({ data }) => {
          dispatch(updateEmailBody({ index, body: data.body }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [body, id, index]);

  const handleFavourite = () => {
    const localState = JSON.parse(localStorage.getItem('emails') || '{}');
    if (id in localState) {
      localState[id].favourite = !favourite;
    } else {
      localState[id] = {
        favourite: !favourite,
        status: 'read',
      };
    }

    localStorage.setItem('emails', JSON.stringify(localState));

    dispatch(toggleFavourite(id));
  };

  return (
    <section className={styles.main}>
      <aside className={styles.aside}>
        <Avatar name={from.name} />
      </aside>
      <article>
        <header>
          <div>
            <h1>{subject}</h1>
            <p>{formateDate(date)}</p>
          </div>
          <div>
            <Button type='secondary' bordered onClick={handleFavourite}>
              Mark as {favourite ? 'unfavourite' : 'favourite'}
            </Button>
          </div>
        </header>
        <main dangerouslySetInnerHTML={{ __html: body }}></main>
      </article>
    </section>
  );
};

export default EmailBody;
