import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../context/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../context/ProfileDataContext";
import Image from "react-bootstrap/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Review from "../reviews/Review";
import NoResults from "../../assets/no-results.png";

import { ProfileEditDropdown } from "../../components/DropDown";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const [profileReviews, setProfileReviews] = useState({ results: [] });
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileReviews }] =
          await Promise.all([
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
        //console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}

      <Row noGutters className="text-center">
        <Col lg={3} className="ml-4 text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>

        <Col lg={6}>
          <h3 className="mt-4 font-weight-bold">{profile?.owner}</h3>{" "}
        </Col>
        <Col lg={12}>
          <p>
            {profile?.description && (
              <Col className="p-3 text-center font-italic lead">
                {profile.description}
              </Col>
            )}
          </p>
          <hr />
          <div className="text-center mb-4 lead">
            Total Reviews: {profile?.reviews_count}
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
          message={` ${profile?.owner} hasn't posted yet...`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-md-2 offset-2" md={6} xl={8}>
       
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
             <h3 className="text-center">Profile Information</h3>
              {mainProfile}
              {mainProfileReviews}
            </>
          ) : (
            <>
            <h3 className="text-cente d-none">Profile Information</h3>
            <Asset
          src={NoResults}
          
        />
        </>
      )}
          
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
