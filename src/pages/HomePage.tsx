import React, { useEffect, useState } from "react";
import ProjectList from "../components/projects/public/ProjectList.tsx";
import styled from "styled-components";
import NoProject from "../components/projects/NoProjects.tsx";

const CategoryMenu = styled.div`
  width: 15%;
  list-style: none;
  margin-left: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    flex-direction: row;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
const MenuItem = styled.option`
  all: unset;
  font-size: 19px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  width: 80%;
  border-radius: 15px;
  margin-bottom: 5px;
  background-color: ${(props) => (props.selected ? "#481f70" : "none")};

  &:hover {
    background-color: #28113e;
  }
`;

const HomePage = () => {
  //State management
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  //Set an empty array of objects, which will be updated once the user has selected a category
  const projectsToDisplay = [{}];

  //Get apiUrl from the .env file
  const apiUrl = process.env.REACT_APP_API_URL;

  /**
   * Fetches all categories from the API.
   * This effect fetches the list of categories from the API using the provided
   * `apiUrl`. It then updates the state with the retrieved data or logs an error
   * if the request fails.
   *
   * @effect
   * @param {string} apiUrl - The URL of the API endpoint to fetch categories from.
   */
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories", error));
  }, [apiUrl]);

  /**
   * Fetches all projects from the API.
   * This effect fetches the list of projects from the API using the provided
   * `apiUrl`. It then updates the state with the retrieved project data or logs an
   * error if the request fails.
   *
   * @effect
   * @param {string} apiUrl - The URL of the API endpoint to fetch projects from.
   */
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/projects`)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects", error));
  }, [apiUrl]);

  let index;
  /*This function controls which category was selected and updates styling based on the state
  This is also used to control which projects should be displayed at all times*/
  const handleClick = (index) => {
    setSelectedMenuItem(index);
  };

  return (
    <main>
      <Wrapper>
        <CategoryMenu>
          {/* Display all projects by default */}
          <MenuItem
            onClick={() => handleClick(0)}
            selected={selectedMenuItem === 0}
          >
            All projects
          </MenuItem>
          {categories &&
            categories.map((category: { id: number; name: string }) => {
              return (
                <MenuItem
                  onClick={() => handleClick(category.id)}
                  selected={selectedMenuItem === category.id}
                  key={index}
                >
                  {category.name}
                </MenuItem>
              );
            })}
        </CategoryMenu>

        {/* If the first option is selected, show all projects */}
        {projects && selectedMenuItem === 0 ? (
          <ProjectList projects={projects} />
        ) : (
          <>
            {/* Listing out all the projects associated with a given category */}
            {projects &&
              projects.map((project: { category: { id: number } }) => {
                if (project.category.id === selectedMenuItem) {
                  projectsToDisplay.push(project);
                  return <></>;
                }
              })}
            {projectsToDisplay.length !== 1 ? (
              <ProjectList projects={projectsToDisplay} />
            ) : (
              <NoProject />
            )}
          </>
        )}
      </Wrapper>
    </main>
  );
};
export default HomePage;
