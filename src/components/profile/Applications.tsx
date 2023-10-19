import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import keycloak from "../../keycloak";


const ProfileProjectsWrapper = styled.ul`
    border-radius: 20px;
    list-style: none;
    position: relative;
    bottom: 520px;
    width: 1050px;
    padding: 40px;
    margin-bottom: 20px;
    background-color: #28113e;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    h3{
        color: #e7daf5;
    }

    li{
        line-height: 25px;
    }
`;

const Title = styled.div`
  margin: 10px 0;
`;
const Description = styled.div`
  color: #d7c1ee;
  margin-bottom: 10px;
  line-height: 1.3;
`;
const StyledProjectListItem = styled.div`
  padding: 25px;
  border-radius: 20px;
  background-color: #28113e;
  width: 100%;
`;


const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
        <div>
            <ul>
                {applications.map(application => (
                    <ProfileProjectsWrapper>
                        <Title>{application.user}</Title>
                        {application.content}
                        {application.project}
                    </ProfileProjectsWrapper>
                ))}
            </ul>
        </div>
    );




}
export default Applications;
