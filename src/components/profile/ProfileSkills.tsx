import styled from "styled-components";
import React, { useState, useEffect } from 'react';

const SkillsWrapper = styled.div`
    background-color: #28113e;
    width: 300px;
    height: 300px;
    padding-left: 50px;
    padding-top: 10px;
    border-radius: 20px;
    list-style: none;
    margin-top: 20px;

    h2{
        color: #e7daf5;
    }

    li{
        line-height: 35px;
    }
`;

// const SkillsButton = styled.button`
//     background-color: #7834bb;
//     border: none;
//     color: #e7daf5;
//     font-size: 16px;
//     border-radius: 20px;
//     padding: 10px 15px;
//     margin-left: 190px;
//     height: fit-content;

//     &:hover{
//         background-color: #975dd2;
//     }
// `;

const Skills = () => {

    const [skills, setSkills] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
    fetch(`${apiUrl}/api/v1/Skills`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => setSkills(data));
    }, []);

    return (
        <ul>
            <SkillsWrapper>
                <h2>Mine skills:</h2>
                {skills.map((item, index) => {
                    if (item.name) {
                        return(
                            <li key={index}>{item.name}</li>
                        )
                    }
                })}
                {/* <SkillsButton>Add skill</SkillsButton> */}
            </SkillsWrapper>
        </ul>
    );
};
export default Skills;