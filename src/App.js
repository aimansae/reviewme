/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';

import styles from './App.module.css';
import NavBar from './components/NavBar';
import './api/axiosDefaults';
import NotFound from './components/NotFound';
import { useCurrentUser } from './context/CurrentUserContext';
import LoginForm from './pages/auth/LoginForm';
import SignUpForm from './pages/auth/SignUpForm';
import Contact from './pages/contact/Contact';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from './pages/profiles/UsernameForm';
import UserPasswordForm from './pages/profiles/UserPasswordForm';
import ReviewCreateForm from './pages/reviews/ReviewCreateForm';
import ReviewEditForm from './pages/reviews/ReviewEditForm';
import ReviewPage from './pages/reviews/ReviewPage';
import ReviewsPage from './pages/reviews/ReviewsPage';

function App() {
    const currentUser = useCurrentUser();
    // eslint-disable-next-line camelcase
    const profile_id = currentUser?.profile_id || '';

    return (
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Spacing}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <ReviewsPage message="Oops..No results found.." />
                        )}
            />
            <Route
              exact
              path="/saved"
              render={() => (
                <ReviewsPage
                  message="No results found. Try again or save a review"
                  filter={`saved__owner__profile=${profile_id}&ordering=-saved__created_at&`}
                />
                        )}
            />

            <Route
              exact
              path="/liked"
              render={() => (
                <ReviewsPage
                  message="No results found. Try again or like a review"
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                />
                        )}
            />
            <Route exact path="/login" render={() => <LoginForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/contact" render={() => <Contact />} />
            <Route
              exact
              path="/reviews/write"
              render={() => <ReviewCreateForm />}
            />
            <Route
              exact
              path="/reviews/:id/edit"
              render={() => <ReviewEditForm />}
            />
            <Route
              exact
              path="/reviews/:id"
              render={() => <ReviewPage />}
            />
            <Route
              exact
              path="/profiles/:id"
              render={() => <ProfilePage />}
            />
            <Route
              exact
              path="/profiles/:id/edit/username"
              render={() => <UsernameForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit/password"
              render={() => <UserPasswordForm />}
            />
            <Route
              exact
              path="/profiles/:id/edit"
              render={() => <ProfileEditForm />}
            />
            <Route render={() => <NotFound message="message" />} />
          </Switch>
        </Container>
      </div>
    );
}

export default App;
