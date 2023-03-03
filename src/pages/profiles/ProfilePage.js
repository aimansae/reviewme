import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../context/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
    useProfileData,
    useSetProfileData,
} from "../../context/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Review from "../reviews/Review"
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
                setProfileReviews(profileReviews)
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
        {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div>{profile?.reviews_count}</div>
                            <div>Reviews</div>
                        </Col>

                    </Row>
                </Col>

                <Col lg={3} className="text-lg-right">
                    <p> Add other info or remove</p>
                </Col>
                {profile?.content && (<Col className="p-3">{profile.content}</Col>)}
            </Row>
        </>
    );

    const mainProfileReviews = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s posts</p>

            <hr />
            {profileReviews.results.length ? (
                <InfiniteScroll
                    children={profileReviews.results.map((review) => (
                        <Review key={review.id} {...review} setReviews={setProfileReviews} />

                    ))
                    }
                    dataLength={profileReviews.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profileReviews.next}
                    next={() => fetchMoreData(profileReviews, setProfileReviews)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );


    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                Profile list
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfileReviews}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>

        </Row>
    );
}

export default ProfilePage;
