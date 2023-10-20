import React, { useState } from "react";
import styled from "styled-components";
import keycloak from "../../../keycloak";

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

/**
 * ApplicationForm component to handle collaboration application form.
 *
 * @param {boolean} isOpen - Indicates whether the application form dialog is open.
 * @param {number} id - The unique identifier of the project for which the user is applying.
 */
const ApplicationForm = ({ isOpen, id }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [content, setContent] = useState("");

  //Get the username
  let username = "";
  if (keycloak.tokenParsed) {
    username = `${keycloak.tokenParsed.preferred_username}`;
  }

  //POST
  const sendApplicationForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Append the application content, user, and project to the form data
    formData.append("Content", content);
    formData.append("User", username);
    formData.append("Project", id);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

      // Send a POST request to submit the application form
    fetch(`${apiUrl}/api/v1/CollaboratorApplications`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    // Close the dialog after submitting the form
    closeDialog();
  };

  const closeDialog = () => {
    window.location.reload();
  };

  return (
    <>
      {isOpen && (
        <StyledDialog>
          <Header>Tell us why you want to join our team</Header>
          <StyledForm onSubmit={sendApplicationForm}>
            <InputWrapper>
              <textarea
                maxLength={3000}
                placeholder="Start typing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name="Content"
              />
            </InputWrapper>
            <ButtonContainer>
              <button onClick={closeDialog}>Cancel</button>
              <button type="submit">Send</button>
            </ButtonContainer>
          </StyledForm>
        </StyledDialog>
      )}
    </>
  );
};
export default ApplicationForm;
