import React, { useEffect, useState } from "react";
import styled from "styled-components";
import keycloak from "../../keycloak";

const ProfileInfoWrapper = styled.div`
  background-color: #28113e;
  border-radius: 20px;
  min-width: 300px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  li {
    text-decoration: none;
    color: #e7daf5;
    left: 100px;
    bottom: 45px;
    font-size: 20px;
  }
`;

const ProfileName = styled.div`
  color: #e7daf5;
  font-size: 20px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const ProfileInfo = styled.div`
  color: #e7daf5;
  font-size: 16px;
  right: 160px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 20px;
`;

const ProfileHeader = styled.h3`
  margin-top: 35px;
  margin-left: 10px;
`;

// This is a functional React component that displays user information.
const UserInfo = () => {

  // Use React hooks to manage the state of user information and their profile picture URL.
  const [userInfo, setUserInfo] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

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
        // Update the component state with the fetched data.
        setUserInfo(data.info);
        setProfilePicture(data.imageUrl);
      })
      .catch((error) => console.error("Error fetching profile data: ", error));
  }, [apiUrl, profilePicture, userInfo, username]);

  // Render the user information and profile picture.
  return (
    <ul>
      <ProfileHeader>Welcome back, {username}!</ProfileHeader>
      <ProfileInfoWrapper>
        <Image
          src={profilePicture}
          alt={`Picture of ${username}`}
          onError={(e) =>
            (e.currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1280px-Placeholder_view_vector.svg.png")
          }
        />
        <div>
          <ProfileName>{username}</ProfileName>
          <ProfileInfo>{userInfo}</ProfileInfo>
        </div>
      </ProfileInfoWrapper>
    </ul>
  );
};
export default UserInfo;
