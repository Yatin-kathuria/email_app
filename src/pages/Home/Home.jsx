import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './home.module.css';
import Button from 'Components/Button/Button';
import EmailTile from 'Components/EmailTile/EmailTile';
import { getAllEmails } from 'api';
import EmailBody from 'Components/EmailBody/EmailBody';
import { useDispatch } from 'react-redux';
import {
  setEmails,
  setSelectedEmail,
  setTotal,
  updateRead,
} from 'store/emailSlice';
import { useSelector } from 'react-redux';

const FILTER_BUTTONS = ['Unread', 'Read', 'Favourite'];

const Home = () => {
  const dispatch = useDispatch();
  const { emails, total, selectedEmail } = useSelector((state) => state.emails);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [displayEmails, setDisplayEmails] = useState([]);
  const [page, setPage] = useState(1);
  const scrollableArea = useRef(null);
  const isEmailsExists = useRef(false);

  useEffect(() => {
    function fetchEmails() {
      getAllEmails(page)
        .then(({ data }) => {
          const mails = JSON.parse(localStorage.getItem('emails') || '{}');

          const list = data.list.map((email) => {
            if (email.id in mails) {
              email.favourite = mails[email.id].favourite;
              email.read = mails[email.id].status === 'read';
            } else {
              email.favourite = false;
              email.read = false;
            }
            email.body = '';
            return email;
          });
          isEmailsExists.current = true;
          dispatch(setEmails(list));
          dispatch(setTotal(data.total));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchEmails();
  }, [page]);

  useEffect(() => {
    if (selectedFilter === '') {
      setDisplayEmails(emails);
    } else if (selectedFilter === 'Unread') {
      setDisplayEmails(emails.filter((email) => !email.read));
    } else if (selectedFilter === 'Read') {
      setDisplayEmails(emails.filter((email) => email.read));
    } else if (selectedFilter === 'Favourite') {
      setDisplayEmails(emails.filter((email) => email.favourite));
    }
  }, [selectedFilter, emails]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    console.log(entries);
    if (target.isIntersecting) {
      setPage((prev) => (total > prev * 10 ? prev + 1 : prev));
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '-100px',
      threshold: 0,
    };
    console.log(option);
    const observer = new IntersectionObserver(handleObserver, option);
    if (scrollableArea.current) {
      const id = setInterval(() => {
        const nodeList = document.querySelectorAll('#email_tile');
        if (nodeList.length > 0) {
          observer.observe(nodeList[nodeList.length - 1]);
          clearInterval(id);
        }
      }, 500);
    }
  }, [handleObserver]);

  const handleEmailClick = (index, id) => {
    const localState = JSON.parse(localStorage.getItem('emails') || '{}');
    if (id in localState) {
      localState[id].status = 'read';
    } else {
      localState[id] = {
        favourite: false,
        status: 'read',
      };
    }

    localStorage.setItem('emails', JSON.stringify(localState));
    dispatch(updateRead(id));
    dispatch(setSelectedEmail(index));
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  return (
    <section className={styles.main}>
      <header>
        {FILTER_BUTTONS.map((label) => (
          <Button
            type='primary'
            bordered={selectedFilter === label}
            className='mr-1'
            onClick={() => handleFilterChange(label)}
            key={label}
          >
            {label}
          </Button>
        ))}
      </header>
      <div className={styles.body}>
        <div
          className={styles.email_list}
          style={{ flex: selectedEmail === null ? 1 : 0.3 }}
          id='scrollArea'
          ref={scrollableArea}
        >
          {displayEmails.map((email, index) => (
            <EmailTile
              key={email.id}
              onClick={() => handleEmailClick(index, email.id)}
              {...email}
            />
          ))}
        </div>
        {selectedEmail !== null && (
          <EmailBody {...displayEmails[selectedEmail]} index={selectedEmail} />
        )}
      </div>
    </section>
  );
};

export default Home;
