import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
  font-weight: bold;
  margin: 10px 0;
`;
const Description = styled.div`
  color: #d7c1ee;
  margin-bottom: 10px;
  line-height: 1.3;
  max-width: 75ch;
`;
const StyledProjectListItem = styled.div`
  padding: 25px;
  border-radius: 20px;
  background-color: #28113e;
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;
const Collaborator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 110px;
`;

const Collaborators = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  @media (max-width: 1025px) {
    flex-direction: column;
    gap: 40px;
  }
`;
const Button = styled(Link)`
  all: unset;
  background-color: #7834bb;
  border-radius: 20px;
  padding: 10px 20px;
  color: white;
  height: fit-content;

  &:hover {
    background-color: #975dd2;
  }
`;

const Details = styled.ul`
  margin: 30px 0;
`;

const CollaborationHeader = styled.div`
  margin-bottom: 20px;
`;

const DetailedProject = ({
  title,
  fullDescription,
  owner,
  image,
  id,
  githubUrl,
}) => {
  return (
    <StyledProjectListItem>
      <Title>{title}</Title>
      <Description>{fullDescription}</Description>
      <Details>
        <li>Progress med farger (grønn, gul, rød)</li>
      </Details>

      <CollaborationHeader>Collaborators:</CollaborationHeader>
      <Wrapper>
        <Collaborators>
          <Collaborator>
            <Image src={image} alt={`Picture of ${owner}`} />
            {owner}
          </Collaborator>
          <Collaborator>
            <Image src={image} alt={`Picture of ${owner}`} />
            {owner}
          </Collaborator>
          <Collaborator>
            <Image src={image} alt={`Picture of ${owner}`} />
            {owner} - owner
          </Collaborator>
        </Collaborators>
        <Button to={githubUrl}>Go to Github</Button>
      </Wrapper>
    </StyledProjectListItem>
  );
};

export default DetailedProject;
