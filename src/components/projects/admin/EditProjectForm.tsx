import React, { useState } from "react";
import { Form } from "react-router-dom";
import styled from "styled-components";

const StyledDialog = styled.div`
  background-color: #481f70;
  z-index: 100;
  width: 50%;
  position: fixed;
  top: 83px;
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

const ProgressButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  input {
    width: 20px;
    margin: 0;
    margin-left: 5px;
  }
`;

const EditProjectForm = ({
  isOpen,
  title,
  fullDescription,
  creator,
  githubUrl,
  progress,
  id
}) => {

    

    const [isChecked, setIsChecked] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    //Form
    const [selected, setSelected] = useState("");
    const [description, setDescription] = useState("");

    const checkProgressButton = () => {
        console.log(isChecked);
        if(isChecked){
            setIsChecked(false);
        }else{
            setIsChecked(true);
        }
       console.log(isChecked);
    }

  const x = () => {
    isOpen = false;
  };

  console.log("id: " + id);
  console.log("description: " + description);

  // const checkSelectedValue = () => {
  //   if(selected === progress){
  //     setSelected();
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target.value;
    const formData = new FormData(form);

    console.log("form" + formData.get('description'));

    const requestOptions = {
      method: "PUT",
      headers: {'Content-Type': 'multipart/form-data'},
      body: formData,
    }

    fetch(`${apiUrl}/api/v1/projects/${id}`, requestOptions);
    

    x();
  }

  return (
    <>
      {isOpen && (
        <StyledDialog>
          <Header>Editing "{title}"</Header>
          <StyledForm method="PUT" onSubmit={handleSubmit}>
            <InputWrapper>
              <label>Description: </label>
              <textarea maxLength={3000} value={description} onChange={e => setDescription(e.target.value)}/>
            </InputWrapper>
            <InputWrapper>
              <div>Progress: </div>
              <select onChange={e => setSelected(e.target.value)} value={selected}>
                <option value={0}>Founding</option>
                <option value={1}>In progress</option>
                <option value={2}>Stalled</option>
                <option value={3}>Completed</option>
              </select>
              {/* <ProgressButton>
                <label>Not started: </label>
                <input type="radio"  checked={isChecked} onChange={() => checkProgressButton }/>
              </ProgressButton>
              <ProgressButton>
                <label>In progress: </label>
                <input type="radio"  checked={isChecked} onChange={() => checkProgressButton }/>
              </ProgressButton>
              <ProgressButton>
                <label>Finished: </label>
                <input type="radio"  checked={isChecked} onChange={() => checkProgressButton }/>
              </ProgressButton> */}
            </InputWrapper>
       
            <br />
            <ButtonContainer>
             
              <button type="submit">Submit change</button>
            </ButtonContainer>
          </StyledForm>
          <button onClick={x}>Cancel</button>
        </StyledDialog>
      )}
    </>
  );
};
export default EditProjectForm;