import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  transition-property: background-color, color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
  border-style: solid;
  outline: none;
  background-color: initial;

  @media (hover: hover) {
    &:hover {
      color: #fff;
    }
  }
`;

const TextButton = styled(Button)`
  font-weight: 400;
  border-width: 2px;
  width: fit-content;

  @media (max-width: 640px) {
    height: 70px;
    font-size: 18px;
    padding-left: 40px;
    padding-right: 40px;
  }
`;

const RectangularButton = styled(TextButton)`
  color: ${({ borderColor }) => borderColor};
  border-color: ${({ borderColor }) => borderColor};
  width: fit-content;

  @media (min-width: 641px) {
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    padding-left: 70px;
    padding-right: 70px;
  }

  @media (hover: hover) {
    &:hover {
      background-color: ${({ borderColor }) => borderColor};
    }
  }

  ${({ isActive, borderColor }) =>
    isActive && `background-color: ${borderColor}; color: #fff;`};
`;

const RoundedButton = styled(TextButton)`
  color: #000000;
  border-color: #000000;
  border-radius: 50px;
  width: fit-content;

  @media (min-width: 641px) {
    height: 80px;
    line-height: 80px;
    font-size: 26px;
    padding-left: 80px;
    padding-right: 80px;
  }

  @media (hover: hover) {
    &:hover {
      background-color: #000000;
    }
  }
`;

const LinkButton = styled(Button)`
  height: 55px;
  font-size: 14px;
  line-height: 1.55;
  font-weight: 400;
  border-width: 1px;
  border-radius: 30px;
  padding-left: 40px;
  padding-right: 40px;
  width: fit-content;

  @media (hover: hover) {
    &:hover {
      background-color: #000000;
    }
  }
`;

const IconButton = styled(Button)`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-color: #000000;
  border-radius: 50px;
  padding: 0;
  width: 50px;
  height: 50px;
  border-width: 2px;
  position: fixed;
  z-index: 10;
  bottom: 20px;
  right: 20px;
  background-color: #ffff;

  @media screen and (max-width: 640px) {
    transform: scale(0.8);
  }

  @media (hover: hover) {
    &:hover {
      background-color: #000000;
    }
  }
`;

export { RectangularButton, RoundedButton, IconButton, LinkButton };
