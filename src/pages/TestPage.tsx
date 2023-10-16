import React from "react";
import EditProject from "../components/projects/admin/EditProject.tsx";
import DetailedProject from "../components/projects/public/DetailedProject.tsx";
import PrivateDetailedProject from "../components/projects/private/PrivateDetailedProject.tsx";
import styled from "styled-components";

//This file is meant as a page to test components without effecting the other pages

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
`;

const TestPage = () => {

    let creators = [
        {
            username: "Silje",
            imageUrl: "testtt"
        },
        {
            username: "Silje D",
            imageUrl: "testtt"
        },
        {
            username: "Joakim",
            imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
        }
    ];

  let skills = ["Frontend", "Backend", "CSharp"];
  
  return (
    <Main>
      <EditProject title={"EditProject component"} fullDescription={"Testing the description.   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus totam consectetur laborum cupiditate dolor suscipit officia quia expedita voluptate laboriosam ad saepe provident esse fugiat consequuntur facilis voluptatem maxime, nostrum itaque quisquam eaque accusantium nihil. Doloribus necessitatibus nam atque hic voluptatum rerum, officiis nesciunt sunt! Amet qui nulla quibusdam voluptatem natus cum veniam odio officiis laudantium mollitia."} creator={creators[0].username} image={creators[0].imageUrl} id={1} githubUrl={undefined} progress={0} collaborators={creators} />
      <br/>
      <DetailedProject title={"PublicDetailedProject component"} fullDescription={"Testing the description sidjfisodfjsidfjæasejfio<sjefiajwiefo ajwseodfjWSEDFOjweif jawiedfjiosjedifjesidjfilseifjisljeifljsiejfilsjiejdfisjijdfisifsjfiesijfiliefseifjsirjøirjfsrdjfdi lsifjsiljdfisjdilfsjfsiefsjilfjslej fisefislidfjslifeifj ji eif imeisflijefilsmifmsielsimflsmelkfm lekem l smkfesklfmekfklseklf me mkesfkekflsefml"} creator={creators[1].username} image={creators[1].imageUrl} id={2} githubUrl={undefined} progress={1} collaborators={creators} neededSkills={skills} />
      <br/>
      <PrivateDetailedProject title={"PrivateDetailedProject component"} fullDescription={"Testing the description sierjgfiawlrsdgaiwrj gii gaisr jgi asgrig nnsij gsr gjsrlifgjfisjlkflsejflsajildfjglasrjgf jlirsjf gliskjfgd lkjslrifg jlsjflgmjlzdflglszdkfgvlksdfzmglkv klrsgkl sdlkfg lkdfmg lksfd lkgm ksdf klg ksdfm lkfdmklgmklskldflskfmlsdklfmskeldfsldkfklsdmk lffklf sldk flksdm flkskdl mflkmsldkfmlknsdlfkjksldzfmgklsdgkldfklgkld fgkllfdskglsdkf ksdfkl skdf kljs dlkfkl "} creator={creators[2].username} image={creators[2].imageUrl} id={3} githubUrl={undefined} progress={2} collaborators={creators} neededSkills={skills} />
    </Main>
  );
};
export default TestPage;
