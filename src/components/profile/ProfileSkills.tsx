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

const ProfileSkills = () => {
  const [skills, setSkills] = useState<string[]>([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  let username = "";
  if (keycloak.tokenParsed) {
    username = `${keycloak.tokenParsed.preferred_username}`;
  }

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/Users/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSkills(data.skills);
        console.log(data.skills);
      })
      .catch((error) => console.error("Error fetching profile data: ", error));
  }, [apiUrl, username]);

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
