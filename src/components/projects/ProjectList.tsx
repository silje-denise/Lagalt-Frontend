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

  @media (max-width: 480px){
    width: 75%;
  }
`;

const ProjectList = (projects) => {
  return (
    <StyledProjectList>
      {projects.projects.map((p) => {
        if (p.title && p.shortDescription) {
          return (
            <ProjectListItem
              title={p.title}
              shortDescription={p.shortDescription}
              
              id={p.id}
            />
          );
        }
        return <></>
      })}
    </StyledProjectList>
  );
};
export default ProjectList;