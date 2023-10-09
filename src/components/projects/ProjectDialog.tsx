import React from "react";
import { Form } from "react-router-dom";
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

  input {
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-top: 5px;
    padding-left: 10px;
  }
  textarea {
    min-height: 60px;
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

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  // display: ${(isOpen) => (isOpen ? "flex" : "none")}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button{
    all:unset;
    margin-left: 5px;
    padding: 10px 20px;
    border-radius: 100px;
    cursor: pointer;
  }
  button:last-child{
    background-color: #7834bb;
    color: white;

    &:hover {
        background-color: #975dd2;
      }
  }
`;

const ProjectDialog = ({ isOpen, title, fullDescription, creator, githubUrl }) => {
  const x = () => {
    isOpen = false;
  };

  return (
    <>
      {isOpen && (
        <StyledDialog>
          <Header>Editing {title}</Header>
          <StyledForm>
            <InputWrapper>
              <label>Title: </label>
              <input type="text" defaultValue={title} />
            </InputWrapper>
            <InputWrapper>
              <label>Description: </label>
              <textarea maxLength={3000} defaultValue={fullDescription} />
            </InputWrapper>
            {/* <InputWrapper>
              <div>Progress: </div>
              <label>Not started: </label>
              <input type="radio" />
              <br/>
              <label>In progress: </label>
              <input type="radio" />
              <br/>
              <label>Finished: </label>
              <input type="radio" />
            </InputWrapper> */}
            <InputWrapper>
              <label>Creator: </label>
              <input type="text" defaultValue={creator} />
            </InputWrapper>
            <InputWrapper>
              <label>Github url: </label>
              <input type="text" defaultValue={githubUrl} />
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
export default ProjectDialog;
