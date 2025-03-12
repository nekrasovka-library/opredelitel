import React, { useContext, useState } from "react";
import Liner from "../Liner";
import {
  ArrowButtonLeft,
  ArrowButtonRight,
  BlockDescription,
  BlockHidden,
  BlockRectangularButton,
  BlockStyles,
  CloseButton,
  ImageContainer,
  Modal,
  ImagesContainer,
  FullscreenWrapper,
} from "./block.styles";
import { OpredelitelContext } from "../../context";
import Icon from "../Icon";
import MasonryGrid from "../MasonryGrid";
import ProgressiveImage from "../ProgressiveImage";
import BlockImage from "../../components/Image";

const Block = ({ item, id }) => {
  const { paperSelected, setPaperSelected } = useContext(OpredelitelContext);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isIntersected, setIsIntersected] = useState(false);

  const openImage = (index) => setCurrentIndex(index);
  const resetCurrentIndex = () => setCurrentIndex(null);

  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1,
    );
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const togglePaperSelection = () => {
    setPaperSelected(id === paperSelected ? "" : id);
  };

  return (
    <BlockStyles id={id}>
      <BlockImage
        imageUrl={item.album}
        isIntersected={isIntersected}
        setIsIntersected={setIsIntersected}
      />
      <Liner linerHeight={30} borderColor={item.color} />
      <BlockRectangularButton
        borderColor={item.color}
        onClick={togglePaperSelection}
      >
        {item.name}
      </BlockRectangularButton>
      {paperSelected === id && isIntersected && (
        <BlockHidden>
          <BlockDescription>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </BlockDescription>
          <MasonryGrid images={item.images} openImage={openImage} />
          {currentIndex !== null && (
            <Modal>
              <CloseButton onClick={resetCurrentIndex}>
                <Icon icon="close" height={20} fill="#000" />
              </CloseButton>
              <ArrowButtonLeft onClick={showPreviousImage}>
                <Icon icon="arrowLeft" height={20} width={20} fill="#000" />
              </ArrowButtonLeft>
              <ArrowButtonRight onClick={showNextImage}>
                <Icon icon="arrowRight" height={20} width={20} fill="#000" />
              </ArrowButtonRight>
              <FullscreenWrapper>
                <ImagesContainer currentIndex={currentIndex}>
                  {item.images.map((image, index) => {
                    return (
                      <ImageContainer key={index}>
                        <ProgressiveImage
                          imageUrl={image.dataset.original}
                          alt={image.name}
                        />
                        <span>{image.name}</span>
                      </ImageContainer>
                    );
                  })}
                </ImagesContainer>
              </FullscreenWrapper>
            </Modal>
          )}
        </BlockHidden>
      )}
    </BlockStyles>
  );
};

export default Block;
