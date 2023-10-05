import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
  font-weight: bold;
  margin: 10px 0;
`;
const Description = styled.div`
  color: #d7c1ee;
  margin-bottom: 10px;
  line-height: 1.3;
`;
const StyledProjectListItem = styled.div`
  padding: 25px;
  border-radius: 20px;
  background-color: #28113e;
  width: 100%;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;
const Owner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 110px;
  margin-top: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button`
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

const ProjectListItem = ({ title, shortDescription, id }) => {
  const navigate = useNavigate();

  return (
    <StyledProjectListItem>
      <Title>{title}</Title>
      <Description>{shortDescription}</Description>
      <Wrapper>
        <Owner>
          {/* <Image src={image} alt={`Picture of ${owner}`}/>
                {owner} */}
        </Owner>
        <Button onClick={() => navigate(`/projectDetails/${id}`)}>
          View project
        </Button>
      </Wrapper>
    </StyledProjectListItem>
  );
};

export default ProjectListItem;