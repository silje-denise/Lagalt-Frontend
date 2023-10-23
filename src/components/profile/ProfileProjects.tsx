import React, { useEffect, useState } from "react";
import styled from "styled-components";
import keycloak from "../../keycloak";
import ProjectList from "../projects/public/ProjectList.tsx";

const ProfileProjectWrapper = styled.ul`
  border-radius: 20px;
  list-style: none;
  width: 100%;

  h3 {
    color: #e7daf5;
    margin-left: 30px;
  }
`;
// This is a functional React component that displays a user's projects.
const ProfileProjects = () => {
  const [projects, setProjects] = useState<string[]>([]);

  // Retrieve the API URL from the environment variables.
  const apiUrl = process.env.REACT_APP_API_URL;
  let username = "";

  // If keycloak's token has been parsed, extract the preferred username from it.
  if (keycloak.tokenParsed) {
    username = `${keycloak.tokenParsed.preferred_username}`;
  }

// Send a GET request to the API to retrieve user data.
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/Users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the projects state with the fetched data.
        setProjects(data.projects);
      })
      .catch((error) => console.error("Error fetching projects", error));
  }, [apiUrl, username]);

  // Render the list of projects using the ProjectList component.
  return (
    <ProfileProjectWrapper>
      <h3>Projects</h3>
      <ProjectList projects={projects} />
    </ProfileProjectWrapper>
  );
};

export default ProfileProjects;
