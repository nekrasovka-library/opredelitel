import styled from "styled-components";
import Image from "../Image";
import { RectangularButton } from "../Button/button.styles";

const BlockImage = styled(Image)`
  > div {
    position: absolute;
    > div {
      position: fixed;
    }
  }

  ${({ isVisible }) => !isVisible && "display: none;"};
`;

const BlockStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlockHidden = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlockDescription = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  text-align: center;

  * {
    color: #000;
  }

  @media (min-width: 641px) {
    padding: 45px 0;
    max-width: 960px;
  }

  @media (max-width: 640px) {
    padding: 45px 20px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 30px);
  background-color: #ffff;
  z-index: 1000;
  display: flex;
  justify-content: space-between;

  @media (min-width: 641px) {
    padding: 15px;
    width: calc(100% - 30px);
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 15px 0;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 640px) {
    span {
      font-size: 12px;
      padding: 0 14px;
      text-align: center;
    }
  }
`;

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  cursor: pointer;
  margin: 0;
  outline: none;

  @media (min-width: 641px) {
    background: none;
  }

  @media (max-width: 640px) {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    height: 30px;
    width: 30px;
    z-index: 10;
  }

  @media (hover: hover) {
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.5);
    }
  }
`;

const CloseButton = styled(ArrowButton)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const ArrowButtonLeft = styled(ArrowButton)`
  position: absolute;
  left: 15px;
  top: calc(50% - 15px);
`;

const ArrowButtonRight = styled(ArrowButton)`
  position: absolute;
  right: 15px;
  top: calc(50% - 15px);
`;

const FullscreenImage = styled.img`
  @media (min-width: 641px) {
    height: 90%;
  }

  @media (max-width: 640px) {
    width: 100%;
    max-height: 100%;
  }
`;

const BlockRectangularButton = styled(RectangularButton)`
  @media (max-width: 640px) {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

export {
  BlockStyles,
  BlockDescription,
  BlockHidden,
  BlockImage,
  ArrowButton,
  Modal,
  CloseButton,
  ImageContainer,
  FullscreenImage,
  ArrowButtonRight,
  ArrowButtonLeft,
  BlockRectangularButton,
};
