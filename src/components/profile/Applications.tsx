import React, { useState, useEffect } from "react";
import styled from "styled-components";
import keycloak from "../../keycloak";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const ApplicationWrapper = styled.ul`
  border-radius: 15px;
  list-style: none;
  background-color: #28113e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 20px;
  height: auto;
  width: 77%;

  h3 {
    color: #111;
  }

  textarea {
    color: black;
    background-color: #ddd;
    border-radius: 5px;
    padding: 10px;
    width: 400px;
    font-family: helvetica;
    line-height: 1.5;
  }
`;

const AcceptButton = styled.button`
  all: unset;
  background-color: rgba(49, 206, 74, 0.3);
  border-radius: 20px;
  padding: 10px 20px;
  margin-left: 20px;
  cursor: pointer;
`;

const DeclineButton = styled.button`
  all: unset;
  background-color: rgba(217, 76, 76, 0.3);
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
`;

const User = styled.div`
  margin: 10px;
  text-transform: capitalize;
`;

const DeclineIcon = styled(FontAwesomeIcon)`
  color: rgba(217, 76, 76, 0.8);
`;

const AcceptIcon = styled(FontAwesomeIcon)`
  color: rgba(49, 206, 74, 0.8);
`;

// This is a functional React component that manages and displays a users's applications.
const Applications = () => {

  const [applications, setApplications] = useState([]);

  // Retrieve the API URL from environment variables.
  const apiUrl = process.env.REACT_APP_API_URL;
  let username = "";

  // If keycloak's token has been parsed, extract the preferred username from it.
  if (keycloak.tokenParsed) {
    username = `${keycloak.tokenParsed.preferred_username}`;
  }

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/Users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the applications state with the fetched data.
        setApplications(data.applications);
      })
      .catch((error) => console.error("Error fetching applications:", error));
  }, [apiUrl, username]);

  // This function deletes a specific application when invoked.
  const deleteApplication = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (confirmDelete) {
      fetch(`${apiUrl}/api/v1/CollaboratorApplications/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          response.json();
          if (response.ok) {
            window.location.reload();
          }
        })
        .catch((error) => console.error("Error deleting application:", error));
    }
  };

  // This function confirms (or accepts) a specific application when invoked.
  const confirmApplication = (id: number) => {
    const confirmAccept = window.confirm(
      "Are you sure you want to accept this application?"
    );

    if (confirmAccept) {
      fetch(`${apiUrl}/api/v1/CollaboratorApplications/Accept/${id}`, {
        method: "POST",
      })
        .then((response) => {
          response.json();
          if (response.ok) {
            window.location.reload();
          }
        })
        .catch((error) => console.error("Error accepting application:", error));
    }
  };

  // Render the list of applications along with Delete and Accept buttons for each.
  return (
    <div>
      <ul>
        {applications.length > 0 && <h3>Applications</h3>}
        {applications &&
          applications.map(
            (application: { id: number; content: string; user: string }) => (
              <>
                <ApplicationWrapper key={application.id}>
                  <div>
                    {application.title}
                    <User>From: {application.user}</User>
                    <textarea
                      value={application.content}
                      disabled
                      rows={4}
                    ></textarea>
                  </div>
                  <div>
                    <DeclineButton
                      onClick={() => deleteApplication(application.id)}
                    >
                      Delete <DeclineIcon icon={faTrashCan} />
                    </DeclineButton>
                    <AcceptButton
                      onClick={() => confirmApplication(application.id)}
                    >
                      Accept <AcceptIcon icon={faCheck} />
                    </AcceptButton>
                  </div>
                </ApplicationWrapper>
              </>
            )
          )}
      </ul>
    </div>
  );
};

export default Applications;
