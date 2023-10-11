import React, {useEffect, useState} from "react";
import styled from "styled-components";
import keycloak from "../../keycloak";

const Projects = () => {

    const [projects, setProjects] = useState<string[]>([]);

    const apiUrl = process.env.REACT_APP_API_URL;
    let username = ""
    if(keycloak.tokenParsed){
        username = `${keycloak.tokenParsed.preferred_username}`
    }

    useEffect(() => {
        fetch(`${apiUrl}/api/v1/Users/${username}`)
          .then((response) => response.json())
          .then((data) => {
            setProjects(data.projects);
            console.log(data.projects);
        })
          .catch((error) => console.error("Error fetching projects", error));
      }, [apiUrl]);

      return (
        <ul>
            {projects && projects.map((project, index) => (
            <li key={index}>{project.title}</li>
        ))}
        </ul>

      )
};

export default Projects;