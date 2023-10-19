import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
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

//Type definition for a project object. 
type Project = {
  id: number;
  title: string;
  fullDescription: string;
  creator: {
    username: string;
    imageUrl: string;
  };
  progress: number;
  githubUrl: string;
  collaborators: {
    username: string;
    imageUrl: string;
  }[];
  neededSkills: string[];
};

/**
 * ProjectDetail component displays project details based on user authentication.
 *
 * @component
 * @return {JSX.Element} ProjectDetail component
 */
const ProjectDetail = () => {
  // Extract the 'id' parameter from the URL
  const { id } = useParams();
  // State to hold project data, initialized as null
  const [project, setProject] = useState<Project | null>(null);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  let username = "";
  if (keycloak.tokenParsed) {
    username = `${keycloak.tokenParsed.preferred_username}`;
  }

  /**
   * Fetch data about the selected project from the API.
   *
   * @function
   * @param {string} apiUrl - The API URL to fetch project data.
   * @param {number} id - The unique project ID.
   * @throws {Error} Error message in case of a fetch error.
   */
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/projects/${id}/a`)
      .then((response) => response.json())
      .then((data: Project) => setProject(data))
      .catch((error) => console.error("Error fetching project data: ", error));
  }, [apiUrl, id]);

  return (
    <main>
      <Wrapper>
        <Button onClick={navigateBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>
        <div>
          {/* Conditional rendering based on user authentication */}
          {keycloak.authenticated ? (
            <>
              {project && username === project.creator.username ? (
                // Display EditProject component for admin users (users who are also the creator of the project)
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
                <></>
              )}
              {project && username !== project.creator.username ? (
                // Display PrivateDetailedProject for non-admin users (logged-in users who are not creators of the project)
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
                <></>
              )}
            </>
          ) : (
            <>
              {project ? (
                // Display DetailedProject for unauthenticated users
                <DetailedProject
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
                <></>
              )}
            </>
          )}
        </div>
      </Wrapper>
    </main>
  );
};

export default ProjectDetail;
