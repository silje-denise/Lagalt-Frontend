import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  min-height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(2px);
`;

const Contributers = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-end;
  gap: 10px;

  :first-child {
    font-weight: bold;
  }
`;
const Image = styled.img`
  height: 30px;
`;

/**
 * A footer component displaying the Lagalt logo and a list of contributors.
 *
 * @component
 * @returns {JSX.Element} The rendered footer.
 */
const Footer = () => {
  return (
    <StyledFooter>
      <div>
         {/* Display the Lagalt logo */}
        <Image src="./../assets/lagalt-logo-new.png" alt="lagalt logo" />
      </div>
      <Contributers>
        <div>Group 3:</div>
        <div>Silje,</div>
        <div>Magnus,</div>
        <div>Silje Denise,</div>
        <div>Joakim</div>
      </Contributers>
    </StyledFooter>
  );
};

export default Footer;
