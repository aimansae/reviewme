import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../App";

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext)

  const loggedInIcons = <>{currentUser?.username}</>

  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink}
        activeClassName={styles.Active}
        to="/login"
      >
        <i className="fa-solid fa-right-to-bracket"></i>Log in
      </NavLink>

      <NavLink className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className="fa-sharp fa-solid fa-user-plus"></i>Sign up
      </NavLink>


    </>
  )

  return (
    //to change color bg= and fixed="top"
    <Navbar className={styles.NavBar} expand="md" >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="50" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fa-sharp fa-solid fa-house"></i>Home
            </NavLink>
            <NavLink className={styles.NavLink}
              activeClassName={styles.Active}
              to="/contact">
              <i className="fa-sharp fa-solid fa-file-signature"></i>Contact
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
