import React, { useState } from "react";
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;

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

const EditProjectForm = ({
  isOpen,
  title,
  fullDescription,
  progress,
  id,
}) => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [selected, setSelected] = useState("");
  const [description, setDescription] = useState("");

  const closeDialog = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    e.persist();

    const formData = new FormData(form);
    formData.append("Id", id);
    formData.append("Progress", selected);
    formData.append("FullDescription", description);

    const requestOptions = {
      method: "PUT",
      body: formData,
    };

    fetch(`${apiUrl}/api/v1/projects/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data from the API if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("There was a problem with the fetch operation:", error);
      });

      closeDialog();
  };

  return (
    <>
      {isOpen &&(
        <StyledDialog>
          <Header>Editing "{title}"</Header>
          <StyledForm method="PUT" onSubmit={handleSubmit}>
            <InputWrapper>
              <label>Description: </label>
              <textarea
                maxLength={3000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="FullDescription"
              />
            </InputWrapper>
            <InputWrapper>
              <div>Progress: </div>
              <select
                onChange={(e) => setSelected(e.target.value)}
                value={selected}
                name="Progress"
              >
                <option value={0}>Founding</option>
                <option value={1}>In progress</option>
                <option value={2}>Stalled</option>
                <option value={3}>Completed</option>
              </select>
            </InputWrapper>
            <ButtonContainer>
             
              <button type="submit">Submit change</button>
            </ButtonContainer>
          </StyledForm>
          <button onClick={closeDialog}>Cancel</button>
        </StyledDialog>
      )}
    </>
  );
};
export default EditProjectForm;