import React, { useEffect, useState } from "react";
import ProjectList from "../components/projects/ProjectList.tsx";
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
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);

  //Get apiUrl from the .env file
  const apiUrl = process.env.REACT_APP_API_URL;

  //Get all categories from API
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories", error));
  }, [apiUrl]);

  //Get all projects from API
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/projects`)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects", error));
  }, [apiUrl]);

  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  const handleClick = (index) => {
    setSelectedMenuItem(index);
  };

  const projectsToDisplay = [{}];
  let index;

  return (
    <Wrapper>
      <CategoryMenu>
        {categories &&
          categories.map((c, index) => {
            return (
              <MenuItem
                onClick={() => handleClick(index)}
                selected={selectedMenuItem === index}
                key={index}
              >
                {c.name}
              </MenuItem>
            );
          })}
      </CategoryMenu>

      {/* Listing out all the projects assosiated with a given category */}
      {projects &&
        projects.map((p) => {
          index = p.category.id - 1; //The API doens't have an ID 0, so we need to force the index to start on 1
          if (index === selectedMenuItem) {
            projectsToDisplay.push(p);
            return <></>;
            
          }console.log(projectsToDisplay)
        })}

      {projectsToDisplay.length !== 1 ? <ProjectList projects={projectsToDisplay}/> : <NoProject/>}
    </Wrapper>
  );
};
export default HomePage;
