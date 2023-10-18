import { faCircle, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
  font-weight: bold;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Description = styled.div`
  color: #d7c1ee;
  margin-bottom: 25px;
  line-height: 1.3;
  max-width: 75ch;
`;
const StyledProjectListItem = styled.div`
  overflow: hidden;
  border-radius: 20px;
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

const TopSection = styled.section`
  padding: 25px 25px 0 25px;
  margin-bottom: 25px;
`;

const Skills = styled.div`
  background-color: #481f70;
  gap: 5px;
  padding: 25px;
  display: flex;
`;

const Skill = styled.div`
  background-color: #481f70;
  color: #a673d8;
  padding: 10px 20px;
  border-radius: 10px;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  border: 2px solid #a673d8;
  font-weight: bolder;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 650px;

  @media (max-width: 480px) {
    min-width: 70px;
  }
`;

/**
 * A component displaying detailed project information.
 *
 * @component
 * @param {string} title - The title of the project.
 * @param {string} fullDescription - The full description of the project.
 * @param {string} creator - The creator of the project.
 * @param {string} image - The image representing the creator.
 * @param {string} id - The unique identifier of the project.
 * @param {string} githubUrl - The GitHub URL of the project.
 * @param {number} progress - The progress status of the project (0: Founding, 1: In progress, 2: Stalled, 3: Completed).
 * @param {Array} collaborators - An array of collaborators for the project.
 * @param {Array} neededSkills - An array of skills needed for the project.
 * @returns {JSX.Element} The rendered detailed project information.
 */
const DetailedProject = ({
  title,
  fullDescription,
  creator,
  image,
  id,
  githubUrl,
  progress,
  collaborators,
  neededSkills,
}) => {
  return (
    <Container>
      <StyledProjectListItem>
        <TopSection>
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
                <FontAwesomeIcon icon={faCircle} color={"#67d149"} /> Completed
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
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1280px-Placeholder_view_vector.svg.png")
                    }
                  />
                ) : (
                  <FontAwesomeIcon icon={faCircleUser} color={"white"} />
                )}
                {creator}⭐
              </Collaborator>

              {collaborators &&
                collaborators.map((collaborator: {imageUrl: string, username: string}) => {
                  return (
                    <Collaborator>
                      <Image
                        src={collaborator.imageUrl}
                        alt={`Picture of ${collaborator.username}`}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1280px-Placeholder_view_vector.svg.png")
                        }
                      />
                    </Collaborator>
                  );
                })}
            </Collaborators>
          </Wrapper>
        </TopSection>
        <section>
          <Skills>
            {neededSkills &&
              neededSkills.map((skill: string) => {
                return <Skill>#{skill}</Skill>;
              })}
          </Skills>
        </section>
      </StyledProjectListItem>
    </Container>
  );
};

export default DetailedProject;
