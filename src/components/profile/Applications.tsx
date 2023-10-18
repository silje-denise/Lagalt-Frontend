import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import keycloak from "../../keycloak";


const ProfileProjectsWrapper = styled.div`
    border-radius: 20px;
    list-style: none;
    position: relative;
    bottom: 480px;
    left: 45px;
    width: 1080px;
    padding: 20px;
    background-color: #28113e;

    h3{
        color: #e7daf5;
    }

    li{
        line-height: 35px;
    }
`;


const Applications = () => {
    const [applications, setApplications] = useState([]);
  
    const apiUrl = process.env.REACT_APP_API_URL;
    let username = ""
    if(keycloak.tokenParsed){
        username = `${keycloak.tokenParsed.preferred_username}`
    }

        
    useEffect(() => {
        fetch(`${apiUrl}/api/v1/Users/${username}`)
            .then(response => response.json())
            .then(data => {
                setApplications(data.applications);
            })
            .catch(error => console.error('Error fetching applications:', error));
    }, []);
    
    return (
        <ProfileProjectsWrapper>
            <ul>
                {applications.map(a => (
                    <li>
                        {a.content}
                        {a.user}
                        {a.project}
                    </li>
                ))}
            </ul>
        </ProfileProjectsWrapper>
    );




}
export default Applications;
