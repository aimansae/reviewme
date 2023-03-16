/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import appStyles from '../../App.module.css';
import styles from '../../styles/ReviewsPage.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import Review from './Review';
import NoResults from '../../assets/no-results.png';
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';
import { useCurrentUser } from '../../context/CurrentUserContext';

function ReviewsPage({ message, filter = '' }) {
  const [reviews, setReviews] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  const { pathname } = useLocation();

  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(
          `/reviews/?${filter}search=${search}`,
        );
        setReviews(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchReviews();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, search, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col md={12} xl={8} className="offset-xl-2">
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            type="text"
            placeholder="search for a product..."
          />
        </Form>

        {hasLoaded ? (
          <>
            {reviews.results.length ? (
              <InfiniteScroll
                children={reviews.results.map((review) => (
                  <Review key={review.id} {...review} setReviews={setReviews} />
                ))}
                dataLength={reviews.results.length}
                loader={<Asset spinner />}
                hasMore={!!reviews.next}
                next={() => fetchMoreData(reviews, setReviews)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default ReviewsPage;
