import React from "react";
import Skills from './../components/profile/ProfileSkills.tsx';
import UserInfo from "./../components/profile/ProfileHeader.tsx";



const ProfilePage = () => {
    return(
        <div>
            <UserInfo/>
            <Skills/>
        </div>
    );
};
export default ProfilePage;