import styled from "styled-components";
import { RectangularButton } from "../Button/button.styles";

const BlockStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlockMobileImages = styled.div`
  overflow-x: auto; /* Включаем горизонтальную прокрутку */
  white-space: nowrap; /* Запрещаем перенос строк, чтобы элементы были в строку */
  width: 100%;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > div {
    display: flex; /* Гибкое расположение, чтобы элементы шли друг за другом */
    column-gap: 15px; /* Пробел между дочерними элементами */
    max-height: 250px;

    & > div {
      display: inline-block; /* Каждый дочерний элемент занимает свое место в строке */
      flex-shrink: 0; /* Запрещаем уменьшать элементы */

      &:first-child {
        padding-left: 20px;
      }

      &:last-child {
        padding-right: 20px;
      }

      img {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const BlockHidden = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BlockDescription = styled.div`
  display: flex;
  text-align: center;

  > div {
    a {
      cursor: pointer;
    }
  }

  * {
    color: #000;
    line-height: 1.55;
    font-size: 18px;
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

const FullscreenWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const FullscreenImage = styled.img`
  @media (min-width: 641px) {
    height: 90vh;
    width: auto;
  }

  @media (max-width: 640px) {
    width: 90%;
    height: auto;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  width: 100%;
  transform: translateX(-${({ currentIndex }) => currentIndex * 100}%);
  transition: transform 0.5s ease-in-out;

  @media (max-width: 640px) {
    height: 100%;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  justify-content: center;
  align-items: center;
  flex: 0 0 100%;
  text-align: center;

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
  z-index: 100;

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
  ArrowButton,
  Modal,
  CloseButton,
  ImageContainer,
  FullscreenImage,
  ArrowButtonRight,
  ArrowButtonLeft,
  BlockRectangularButton,
  ImagesContainer,
  FullscreenWrapper,
  BlockMobileImages,
};
