/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { useParams } from 'react-router';
import Image from 'react-bootstrap/Image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Asset from '../../components/Asset';

import styles from '../../styles/ProfilePage.module.css';
import appStyles from '../../App.module.css';

import { useCurrentUser } from '../../context/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import {
  useProfileData,
  useSetProfileData,
} from '../../context/ProfileDataContext';
import { fetchMoreData } from '../../utils/utils';
import Review from '../reviews/Review';
import NoResults from '../../assets/no-results.png';

import { ProfileEditDropdown } from '../../components/DropDown';

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const [profileReviews, setProfileReviews] = useState({ results: [] });
  const is_owner = currentUser?.username === profile?.owner;
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileReviews }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/reviews/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileReviews(profileReviews);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
        if (err.response.status === 404 | err.response.status === 400) {
          history.push('/');
        }
      }
    };
    fetchData();
  }, [id, setProfileData, history]);

  const mainProfile = (
    <>
      {is_owner && <ProfileEditDropdown id={profile?.id} />}

      <Row noGutters className="text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>

        <Col lg={6}>
          <h3 className="mt-4 font-weight-bold">{profile?.owner}</h3>
          {' '}
        </Col>
        <Col lg={12}>
          <div>
            {profile?.description && (
              <Col className="p-3 text-center font-italic lead">
                {profile.description}
              </Col>
            )}
          </div>
          <hr />
          <div className="text-center mb-4 ml-4 lead">
            Total Reviews:
            {' '}
            {profile?.reviews_count}
          </div>
        </Col>
      </Row>
    </>
  );

  const mainProfileReviews = (
    <>
      {profileReviews.results.length ? (
        <InfiniteScroll
          children={profileReviews.results.map((review) => (
            <Review
              key={review.id}
              {...review}
              setReviews={setProfileReviews}
            />
          ))}
          dataLength={profileReviews.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileReviews.next}
          next={() => fetchMoreData(profileReviews, setProfileReviews)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No posts yet for ${profile?.owner} `}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col md={12} xl={8} className="offset-xl-2">

        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              <h3 className="text-center">Profile Information</h3>
              {mainProfile}
              {mainProfileReviews}
            </>
          ) : (
            <>
              <h3 className="text-center d-none">Profile Information</h3>
              <Asset spinner />
            </>
          )}

        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
