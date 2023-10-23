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

const ProfileProjects = () => {
  const [projects, setProjects] = useState<string[]>([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  let username = "";
  if (keycloak.tokenParsed) {
    username = `${keycloak.tokenParsed.preferred_username}`;
  }

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/Users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects);
      })
      .catch((error) => console.error("Error fetching projects", error));
  }, [apiUrl, username]);

  return (
    <ProfileProjectWrapper>
      <h3>Projects</h3>
      <ProjectList projects={projects} />
    </ProfileProjectWrapper>
  );
};

export default ProfileProjects;
