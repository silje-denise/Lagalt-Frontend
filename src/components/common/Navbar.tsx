import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import keycloak from "../../keycloak";

const StyledNavbar = styled.nav`
border-bottom: 1px solid rgba(255,255,255,0.1);
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
`;

const NavWrapper = styled.div`
  list-style: none;
  justify-content: flex-end;
  display: flex;
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
  display:flex;
  align-items: center;
`;
const Image = styled.img`
  width: 40px;
  height: auto;
`;

const Navbar = () => {
  let linka = "/notLoggedIn"
  if (keycloak.tokenParsed){
    linka = `/users/${keycloak.tokenParsed.preferred_username}`
  }
  return (
    <StyledNavbar>
      <Logo>
        <Image src="./../assets/lagalt-logo-new.png" alt="Lagalt logo"/>
        <Link to="/">Lagalt</Link>
        </Logo>
      <NavWrapper>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </NavWrapper>
      <section className="actions">
        {!keycloak.authenticated && (
          <button onClick={() => keycloak.login()}>Login</button>
        )}
        {keycloak.authenticated && (
          <button onClick={() => keycloak.logout()}>Logout</button>
        )}
      </section>
    </StyledNavbar>
  );
};
export default Navbar;