import React from "react";
import styled from "styled-components";
import ProjectListItem from "./ProjectListItem.tsx";

const StyledProjectList = styled.div`
  width: 65%;
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 480px) {
    width: 75%;
  }
`;

/**
 * A component to render a list of projects.
 *
 * @component
 * @param {object} projects - An object containing an array of project data.
 * @param {Array} projects.projects - An array of project objects.
 * @returns {JSX.Element} The rendered project list.
 */
const ProjectList = (projects) => {
  return (
    <StyledProjectList>
      {projects.projects.map((project:{title: string, shortDescription: string, id: number}) => {
        if (project.title && project.shortDescription) {
          return (
            <ProjectListItem
            key={project.id}
              title={project.title}
              shortDescription={project.shortDescription}
              id={project.id}
            />
          );
        }
        return <></>;
      })}
    </StyledProjectList>
  );
};
export default ProjectList;
