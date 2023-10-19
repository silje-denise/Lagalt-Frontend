import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import keycloak from "../../keycloak";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';


const ProfileProjectsWrapper = styled.ul`
    border-radius: 20px;
    list-style: none;
    position: relative;
    bottom: 50px;
    width: 1050px;
    padding: 40px;
    background-color: #28113e;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    h3{
        color: #111;
    }

    li{
        line-height: 25px;
    }
`;

const User = styled.div`
  margin: 10px 0;
`;
const Content = styled.div`
  margin-bottom: 10px;
  line-height: 1.3;
`;

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    let username = "";
    
    if (keycloak.tokenParsed) {
        username = `${keycloak.tokenParsed.preferred_username}`;
    }
    
    useEffect(() => {
        fetch(`${apiUrl}/api/v1/Users/${username}`)
            .then(response => response.json())
            .then(data => {
                setApplications(data.applications);
            })
            .catch(error => console.error('Error fetching applications:', error));
    }, [apiUrl, username]);

    const deleteApplication = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this application?");

        if (confirmDelete) {
            fetch(`${apiUrl}/api/v1/CollaboratorApplications/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                response.json()
                if(response.ok) {
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error deleting application:', error));
        }
    };

    const confirmApplication = (id: number) => {
        const confirmAccept = window.confirm("Are you sure you want to delete this application?");

        if (confirmAccept) {
            fetch(`${apiUrl}/api/v1/CollaboratorApplications/Accept/${id}`, {
                method: "POST"
            })
            .then(response => {
                response.json()
                if(response.ok) {
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error accepting application:', error));
        }
    };

    return (
        <div>
            <ul>
                <h3>Applications</h3>
                {applications.map(application => (
                    <ProfileProjectsWrapper key={application.id}>
                        <User>{application.user}</User>
                        <button onClick={() => deleteApplication(application.id)}>Delete <FontAwesomeIcon icon={faTrashCan}/></button>
                        <button onClick={() => confirmApplication(application.id)}>Accept <FontAwesomeIcon icon={faCheck}/></button>
                        <Content>{application.content}</Content>
                    </ProfileProjectsWrapper>
                ))}
            </ul>
        </div>
    );
}

export default Applications;
