import {
  faArrowUpRightFromSquare,
  faCircle,
  faCircleUser,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditProjectForm from "./EditProjectForm.tsx";

const Title = styled.div`
  font-weight: bold;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 650px;
`;
const Description = styled.div`
  color: #d7c1ee;
  line-height: 1.3;
  max-width: 75ch;
  margin-bottom: 25px;
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
  border: 2px solid #7834bb;
`;
const Collaborator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Collaborators = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  max-width: 500px;
  flex-wrap: wrap;
  overflow: clip;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
  align-items: center;
  flex-direction: row;
  width: 90%;

  @media (max-width: 1025px) {
    flex-direction: column;
    gap: 40px;
  }
`;
const Button = styled(Link)`
  all: unset;
  font-weight: bold;
  padding: 10px 20px;
  color: white;
  height: fit-content;
  cursor: pointer;

  &:hover {
    color: #975dd2;
    text-decoration: underline;
  }
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

const EditButtons = styled.section`
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
  background-color: rgba(49, 206, 74, 0.3);
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
  background-color: rgba(217, 76, 76, 0.3);
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
  color: rgba(217, 76, 76, 0.8);
`;

const StyledEditIcon = styled(FontAwesomeIcon)`
  margin-left: 4px;
  color: rgba(49, 206, 74, 0.8);
`;

const EditProject = ({
  title,
  fullDescription,
  creator,
  image,
  id,
  githubUrl,
  progress,
  collaborators,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOnclick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  // const testCall = () => {
  //   const apiUrl = process.env.REACT_APP_API_URL;

  //   fetch(`${apiUrl}/api/v1/projects`)
  //     .then((response) => response.json())
  //     .then((data) => setProjects(data))
  //     .catch((error) => console.error("Error fetching projects", error));
  // };

  const deleteProject = () => {
    let confirm = window.confirm(
      "Are you sure you want to delete this project? \n This action cannot be undone!"
    );
     if (confirm) {
    //     fetch(`${apiUrl}/api/v1/projects/${id}`, {method: 'DELETE',})
    //     .then(response => response.json())
    //     .then(() => setStatus('Delete successful'));
    }
    // alert(status);
  };

  console.log('progress editproject: ' + progress)

  return (
    <Container>
      <section>
        <StyledProjectListItem>
          <Title>
            {title}
            {progress === 0 && (
              <div>
                <FontAwesomeIcon icon={faCircle} color={"#4991de"} /> Founding
              </div>
            )}
            {progress === 1 && (
              <div>
                <FontAwesomeIcon icon={faCircle} color={"#F2B84B"} /> In
                progress
              </div>
            )}
            {progress === 2 && (
              <div>
                <FontAwesomeIcon icon={faCircle} color={"#F28D52"} /> Stalled
              </div>
            )}
            {progress === 3 && (
              <div>
                <FontAwesomeIcon icon={faCircle} color={"67d149"} /> Completed
              </div>
            )}
          </Title>
          <Description>{fullDescription}</Description>

          <Wrapper>
            <Collaborators>
              <Collaborator>
                {image ? (
                  <Image
                    src={image}
                    alt={`Picture of ${creator}`}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1280px-Placeholder_view_vector.svg.png";
                    }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faCircleUser} color={"white"} />
                )}
                {creator}⭐
              </Collaborator>

              {collaborators &&
                collaborators.map((collaborator) => {
                  return (
                    <Collaborator>
                      <Image
                        src={collaborator.imageUrl}
                        alt={`Picture of ${collaborator.username}`}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1280px-Placeholder_view_vector.svg.png";
                        }}
                      />
                    </Collaborator>
                  );
                })}
            </Collaborators>
            <Button to={githubUrl}>
              Go to Github <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Button>
          </Wrapper>
        </StyledProjectListItem>
      </section>
      <EditButtons>
        <EditButton onClick={handleOnclick}>
          Edit <StyledEditIcon icon={faPenToSquare} />
        </EditButton>
        <DeleteButton onClick={deleteProject}>
          Delete <StyledDeleteIcon icon={faTrashCan} />
        </DeleteButton>
      </EditButtons>
      <EditProjectForm
        isOpen={isOpen}
        title={title}
        fullDescription={fullDescription}
        creator={creator}
        githubUrl={githubUrl} progress={progress} id={id}      />
    </Container>
  );
};

export default EditProject;
