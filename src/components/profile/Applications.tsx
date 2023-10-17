import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import keycloak from "../../keycloak";


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
            <h1>Applications</h1>
            <ul>
                {applications.map(a => (
                    <li>
                        {a.content}
                        {a.user}
                        {a.project}
                    </li>
                ))}
            </ul>
        </div>
    );




}
export default Applications;
