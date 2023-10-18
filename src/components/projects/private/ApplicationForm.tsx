import React from "react";
import styled from "styled-components";

const StyledDialog = styled.div`
  background-color: #481f70;
  z-index: 100;
  width: 50%;
  position: fixed;
  top: 15%;
  left: 25%;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 5px 8px 39px 4px #1c1c1c;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  textarea {
    min-height: 100px;
    border-radius: 5px;
    border: none;
    margin-top: 5px;
    padding-left: 10px;
    padding-top: 10px;
    font-family: Helvetica;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const Header = styled.h2`
  margin: 5px 0 20px 0;
  font-size: 19px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    all: unset;
    margin-left: 5px;
    padding: 10px 20px;
    border-radius: 100px;
    cursor: pointer;
  }
  button:last-child {
    background-color: #7834bb;
    color: white;

    &:hover {
      background-color: #975dd2;
    }
  }
`;
//TODO: add a POST request to send the form
const ApplicationForm = ({ isOpen }) => {
  const x = () => {
    isOpen = false;
  };
  return (
    <>
      {isOpen && (
        <StyledDialog>
          <Header>Tell us why you want to join our team</Header>
          <StyledForm>
            <InputWrapper>
              <textarea maxLength={3000} placeholder="Start typing..." />
            </InputWrapper>
            <br />
            <ButtonContainer>
              <button onClick={x}>Cancel</button>
              <button onClick={x}>Done</button>
            </ButtonContainer>
          </StyledForm>
        </StyledDialog>
      )}
    </>
  );
};
export default ApplicationForm;
