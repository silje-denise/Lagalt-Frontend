import { Navigate } from "react-router-dom";
import keycloak from "../keycloak";

/**
 * Protect routes based on a given role and authenticated status of a Keycloak Session.
 * @description Default redirect is to the base path: "/"
 * @param {{ children: ReactNode, role: string, redirectTo: string }} props
 * @returns {JSX.Element}
 */
function KeycloakRoute({ children, role, redirectTo = "/" }) {

  console.log(keycloak.authenticated)

  //Not logged inn go to this link
  if (!keycloak.authenticated) {
    return <Navigate replace to={redirectTo} />;
  }

  //if (keycloak.hasRealmRole(role)) {
    return <>{children}</>;
  //}

  //Logged in, but not authorized go to this link
 //return <Navigate replace to={"/authorized"} />;
}

export default KeycloakRoute;
