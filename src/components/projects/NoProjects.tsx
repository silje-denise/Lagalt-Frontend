import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #28113e;
  padding: 20px;
  margin: 20px 0;
  border-radius: 20px;
`;
const Image = styled.img`
  filter: invert(1);
`;

const NoProject = () => {
  return (
    <Container>
      <Image
        src="https://cdn.iconscout.com/icon/free/png-256/free-error-2689537-2232197.png"
        alt="test"
      />
      <h2>No projects found</h2>
    </Container>
  );
};
export default NoProject;