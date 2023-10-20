import React, {useState, useEffect} from "react";
import Skills from './../components/profile/ProfileSkills.tsx';
import UserInfo from "../components/profile/UserInfo.tsx";
import Projects from "./../components/profile/ProfileProjects.tsx";
import styled from "styled-components";
import keycloak from "./../keycloak";
import Applications from "../components/profile/Applications.tsx";

const Wrapper = styled.main`
display: flex;
justify-content: center;
flex-direction: row;
`;

const ProfileContent = styled.div`
    width: 90%;

    display: flex;
    justify-content: center;
    flex-direction: column;

`;

const TopSection = styled.div`
display: flex;
justify-content: center;
flex-direction: row;


`;



const ProfilePage = () => (
    <Wrapper>
        <ProfileContent>
            <TopSection>
                <div>
                    <UserInfo />
                    <Skills />
                </div>
                <Projects/>
            </TopSection>
            <Applications />
        </ProfileContent>
    </Wrapper>
);
export default ProfilePage;