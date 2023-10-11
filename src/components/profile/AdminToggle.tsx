import React, { useState } from 'react';
import styled from 'styled-components';

const SwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  margin-left: 20px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;

  &::before {
    position: absolute;
    content: "";
    height: 22px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }

  ${Checkbox}:checked + & {
    background-color: #7834bb;
  }

  ${Checkbox}:checked + &::before {
    transform: translateX(26px);
  }
`;

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SwitchWrapper>
      <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
      <Slider />
    </SwitchWrapper>
  );
}

export default ToggleSwitch;