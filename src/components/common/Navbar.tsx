import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import keycloak from "../../keycloak";

const StyledNavbar = styled.nav`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
    margin-left: 20px;
    color: #e7daf5;
  }
  button {
    all: unset;
    margin-left: 20px;
    cursor: pointer;
  }
`;

const NavWrapper = styled.div`
  list-style: none;
  justify-content: flex-end;
  display: flex;
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  height: 40px;
`;

/**
 * A navigation bar component that displays links to various sections of the app and login/logout buttons.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation bar.
 */
const Navbar = () => {
  // Initialize the link to "/notLoggedIn"
  let link = "/notLoggedIn";
  // Check if the user is authenticated (logged in) using Keycloak
  if (keycloak.tokenParsed) {
    // If authenticated, set the link to the user's profile page
    link = `/users/${keycloak.tokenParsed.preferred_username}`;
  }
  return (
    <StyledNavbar>
      <Logo>
        <Link to="/">
          <Image src="./../assets/LogoText.svg" alt="Lagalt logo" />
        </Link>
      </Logo>
      <NavWrapper>
        <li>
          <Link to="/">Home</Link>
        </li>
        {keycloak.authenticated && <Link to="/profile">Profile</Link>}

        <li>
          {!keycloak.authenticated && (
            <button onClick={() => keycloak.login()}>Login</button>
          )}
          {keycloak.authenticated && (
            <button onClick={() => keycloak.logout()}>Logout</button>
          )}
        </li>
      </NavWrapper>
    </StyledNavbar>
  );
};
export default Navbar;
