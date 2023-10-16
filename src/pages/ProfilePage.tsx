import React, {useState, useEffect} from "react";
import Skills from './../components/profile/ProfileSkills.tsx';
import UserInfo from "./../components/profile/ProfileHeader.tsx";
import Projects from "./../components/profile/ProfileProjects.tsx";
import AdminToggle from "./../components/profile/AdminToggle.tsx";
import styled from "styled-components";
import keycloak from "./../keycloak";
import ProjectListItem from "../components/projects/public/ProjectListItem.tsx";

const ProfilePage = () => {
    return(
        <div>
            <UserInfo/>
            <Skills/>
            {/* <AdminToggle/> */}
            <Projects/>
            
        </div>
    );
};
export default ProfilePage;