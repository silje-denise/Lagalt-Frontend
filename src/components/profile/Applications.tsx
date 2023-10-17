import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import keycloak from "../../keycloak";


const Applications = () => {
    const [application, setApplication] = useState<string[]>([]);
  
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
            setApplication(data.applications);
            console.log("Hello", application);
        })
        .catch((error) => console.error("Error fetching profile data: ", error));
    }, [apiUrl, username, application]);


}
export default Applications;
