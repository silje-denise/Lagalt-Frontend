import React, {useEffect, useState} from "react";
import styled from "styled-components";
import keycloak from "../../keycloak";
import ProjectListItem from "../projects/public/ProjectListItem.tsx";
import ProjectList from "../projects/public/ProjectList.tsx";

const ProfileProjectWrapper = styled.ul`
    background-color: #28113e;
    width: 300px;
    height: 300px;
    padding-left: 50px;
    padding-top: 10px;
    border-radius: 20px;
    list-style: none;
    margin-top: 20px;
    margin-left: 35px;

    h3{
        color: #e7daf5;
    }

    li{
        line-height: 35px;
    }
`;
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
            <h3>
                My projects: 
            </h3>
            <ProjectList projects = {projects}/>
        </ul>
      )
};

export default Projects;