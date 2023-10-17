import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import DetailedProject from "../components/projects/public/DetailedProject.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import keycloak from "../keycloak.js";
import PrivateDetailedProject from "../components/projects/private/PrivateDetailedProject.tsx";
import EditProject from "../components/projects/admin/EditProject.tsx";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  overflow: hidden;
  padding: 20px 0;
`;

const Project = styled.div``;

const Button = styled.button`
  all: unset;
  background-color: #7834bb;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  cursor: pointer;

  &:hover {
    background-color: #975dd2;
  }
  a {
    color: white;
  }
`;

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  //Get data about the selected project from API
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/projects/${id}/a`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      .catch((error) => console.error("Error fetching project data: ", error));
  }, [apiUrl, id]);

  return (
    <>
      <Wrapper>
        <Button onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <Project>
          {/*Add logic for when a user can have admin privileges */}
          {keycloak.authenticated ? (
            <>
              {project ? (
                <EditProject
                  title={project.title}
                  fullDescription={project.fullDescription}
                  id={id}
                  githubUrl={project.githubUrl}
                  creator={project.creator.username}
                  image={project.creator.imageUrl}
                  progress={project.progress}
                  collaborators={project.collaborators}
                  
                />
              ) : (
                <div>Loading project details...</div>
              )}
              {/* {project ? (
                <PrivateDetailedProject
                  title={project.title}
                  fullDescription={project.fullDescription}
                  id={id}
                  githubUrl={project.githubUrl}
                  creator={project.creator.username}
                  image={project.creator.imageUrl}
                  progress={project.progress}
                  collaborators={project.collaborators}
                  neededSkills={project.neededSkills}
                />
              ) : (
                <div>Loading project details...</div>
              )} */}
            </>
          ) : (
            <>
              {project ? (
                <DetailedProject
                    title={project.title}
                    fullDescription={project.fullDescription}
                    id={id}
                    githubUrl={project.githubUrl}
                    creator={project.creator.username}
                    image={project.creator.imageUrl}
                    progress={project.progress}
                    collaborators={project.collaborators} 
                    neededSkills={project.skills}                
                    />
              ) : (
                <div>Loading project details...</div>
              )}
            </>
          )}
        </Project>
      </Wrapper>
    </>
  );
};

export default ProjectDetail;
