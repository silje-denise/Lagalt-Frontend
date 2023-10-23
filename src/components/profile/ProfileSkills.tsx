import styled from "styled-components";
import React, { useState, useEffect } from "react";
import keycloak from "../../keycloak";

const SkillsWrapper = styled.div`
  background-color: #28113e;
  padding: 25px;

  border-radius: 20px;
  list-style: none;
  margin-top: 20px;

  h2 {
    margin: 0;
    margin-bottom: 20px;
    color: #e7daf5;
  }

  li {
    line-height: 35px;
    margin-left: 20px;
  }
`;
// This is a functional React component that displays a user's skills.
const ProfileSkills = () => {
  const [skills, setSkills] = useState<string[]>([]);

  // Get the API URL from environment variables.
  const apiUrl = process.env.REACT_APP_API_URL;
  let username = "";

  // Check if keycloak's token has been parsed, then extract the preferred username from it.
  if (keycloak.tokenParsed) {
    username = `${keycloak.tokenParsed.preferred_username}`;
  }

  // Send a GET request to the API to retrieve user data.
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/Users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the skills state with the fetched data.
        setSkills(data.skills);
      })
      .catch((error) => console.error("Error fetching profile data: ", error));
  }, [apiUrl, username]);

  // Render the list of skills.
  return (
    <ul>
      <SkillsWrapper>
        <h2>My skills</h2>
        {skills && skills.map((skill, index) => <li key={index}>{skill}</li>)}
      </SkillsWrapper>
    </ul>
  );
};

export default ProfileSkills;
