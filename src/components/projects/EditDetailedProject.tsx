import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProjectDialog from "./ProjectDialog.tsx";

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
  border-radius: 20px 0 0 20px;
  background-color: #28113e;
  display: flex;
  flex-direction: column;
  width: 100%;

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
  flex-direction: column;

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
  width: fit-content;
  margin-top: 20px;

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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 650px;
  justify-content: space-between;
  background-color: #28113e;
  border-radius: 20px;

  @media (max-width: 480px) {
   min-width: 70px; 
  }
`;

const EditProject = styled.section`
  background-color: #28113e;
  border-radius: 0 20px 20px 0;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: flex-end;
  justify-self: flex-end;
  width: 100px;
`;

const EditButton = styled.button`
  all: unset;
  background-color: rgba(49,206,74,0.3);
  height: 50%;
  width: 55px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 20px 0 0;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  all: unset;
  background-color: rgba(217,76,76,0.3);
  height: 50%;
  width: 55px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 20px 0;
  cursor: pointer;
`;

const StyledDeleteIcon = styled(FontAwesomeIcon)`
  margin-left: 4px;
  color: rgba(217,76,76,0.8);
`;

const StyledEditIcon = styled(FontAwesomeIcon)`
  margin-left: 4px;
  color: rgba(49,206,74,0.8);
`;

const EditDetailedProject = ({
  title,
  fullDescription,
  owner,
  image,
  id,
  githubUrl,
}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOnclick = () => {
        if(isOpen){
            setIsOpen(false);
        }else{
            setIsOpen(true);
        }
    }


  return (
    <Container>
      <section>
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
          
          </Wrapper>  <Button to={githubUrl}>Go to Github</Button>
        </StyledProjectListItem>
      </section>
      <EditProject>
        <EditButton onClick={handleOnclick}>Edit <StyledEditIcon icon={faPenToSquare}/></EditButton>
        <DeleteButton onClick={() => alert("Are you sure you want to delete the project?")}>Delete <StyledDeleteIcon icon={faTrashCan}/></DeleteButton>
      </EditProject>
      <ProjectDialog isOpen={isOpen} title={title} fullDescription={fullDescription} owner={owner}/>
    </Container>
  );
};

export default EditDetailedProject;
