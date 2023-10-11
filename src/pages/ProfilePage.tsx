import React from "react";
import Skills from './../components/profile/ProfileSkills.tsx';
import UserInfo from "./../components/profile/ProfileHeader.tsx";
import Projects from "./../components/profile/ProfileProjects.tsx";
import AdminToggle from "./../components/profile/AdminToggle.tsx";
import styled from "styled-components";

// styled AdminHeader = styled


const ProfilePage = () => {
    return(
        <div>
            <UserInfo/>
            <Skills/>
            <Projects/>
            <h3>Admin:</h3>
            <AdminToggle/>
        </div>
    );
};
export default ProfilePage;