import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ProfileHeaderItems from "./ProfileHeaderItems.tsx";

const ProfileInfoWrapper = styled.div`
    background-color: #28113e;
    width: 300px;
    height: 100px;
    padding-left: 50px;
    padding-top: 40px;
    border-radius: 20px;
    list-style: none;

    li {
        text-decoration: none;
        color: #e7daf5;
        position: relative;
        left: 100px;
        bottom: 45px;
        font-size: 20px;
      }
`;

const Image = styled.img`
    width: 60px;
    height: auto;
    padding-left: ;
`


const UserInfo = () => {

    // const test = [
    //     {
    //         name: "Silje D",
    //         about: "Frontend utvikler med en bachelorgrad innen Frontend fra Høyskolen Kristiania",
    //         skills: "React, JavaScript, TypeScript, .NET, Angular",
    //     },
    //     {
    //         name: "Silje",
    //         about: "Infoviter med en bachelorgrad innen Informasjonsvitenskap fra Univeristetet i Bergen",
    //         skills: "React, JavaScript, TypeScript, .NET, Angular",
    //     },
    // ];

    const [user, setUser] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
    fetch(`${apiUrl}/api/v1/users`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => setUser(data));
    }, []);

    return (
        <ul>
            <ProfileInfoWrapper>
            <Image src="./../../assets/default-profile-picture.png" alt="Default profile picture"/>
            {user.map((item, index) => {
                if (item.username && item.id === 1) {
                    return(
                        <li key={index}>{item.username}</li>
                    )
                }
            })}
            </ProfileInfoWrapper>
        </ul>
    );
}
export default UserInfo;