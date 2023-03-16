/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import logo from '../assets/logo.png';
import {
  useCurrentUser,
  useSetCurrentUser,
} from '../context/CurrentUserContext';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import styles from '../styles/NavBar.module.css';
import { removeTokenTimestamp } from '../utils/utils';

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  // to toggle burger menu
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleLogOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err);
    }
  };

  const addReviewIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/reviews/write"
    >
      <i className="fa-solid fa-plus" />
      Review
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/saved"
      >
        <i className="fa-solid fa-tag" />
        Saved
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fa-solid fa-heart" />
        Liked
      </NavLink>

      <NavLink className={styles.NavLink} to="/" onClick={handleLogOut}>
        <i className="fa-solid fa-right-from-bracket" />
        Logout
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/contact"
      >
        <i className="fa-sharp fa-solid fa-file-signature" />
        Contact
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <i className="fa-solid fa-user" />
        Profile
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/login"
      >
        <i className="fa-solid fa-right-to-bracket" />
        Log in
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-sharp fa-solid fa-user-plus" />
        Sign up
      </NavLink>
    </>
  );

  return (
  // to change color bg= and fixed="top"
    <Navbar expanded={expanded} className={styles.NavBar} expand="md">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="50" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addReviewIcon}

        <Navbar.Toggle
          className={styles.NavIcon}
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-sharp fa-solid fa-house" />
              Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
