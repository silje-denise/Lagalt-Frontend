import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import keycloak from "../../keycloak";


const ProfileInfoWrapper = styled.div`
    background-color: #28113e;
    width: 300px;
    height: 100px;
    padding: 20px;
    border-radius: 20px;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    li {
        text-decoration: none;
        color: #e7daf5;
        position: relative;
        left: 100px;
        bottom: 45px;
        font-size: 20px;
      }
`;

const ProfileName = styled.div`
    color: #e7daf5;
    font-size: 20px;
    
`

const ProfileInfo = styled.div`
    color: #e7daf5;
    position: relative;
    font-size: 16px;
    top: 30px;
    right: 147px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
//   border: 2px solid #7834bb;
`;

const UserInfo = () => {

    const [userInfo, setUserInfo] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
  
    const apiUrl = process.env.REACT_APP_API_URL;
    let username = ""
    if(keycloak.tokenParsed){
        username = `${keycloak.tokenParsed.preferred_username}`
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
            setUserInfo(data.info);
            setProfilePicture(data.imageUrl)
            console.log(userInfo);
            console.log(profilePicture)
        })
        .catch((error) => console.error("Error fetching profile data: ", error));
    }, [apiUrl, profilePicture, userInfo, username]);


    return (
        <ul>
            <ProfileInfoWrapper>
            <Image
                      src={profilePicture}
                      alt={`Picture of ${username}`}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1280px-Placeholder_view_vector.svg.png")
                      }
                    />
            {/* <img src= {profilePicture} alt="Profile Picture"/> */}
            {/* <ProfileIcon icon={faCircleUser} color={"white"} /> */}
            <ProfileName>
            {username}
            </ProfileName>
            <ProfileInfo>
            {userInfo}
            </ProfileInfo>


            </ProfileInfoWrapper>
        </ul>
    );
}
export default UserInfo;