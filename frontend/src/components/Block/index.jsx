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
  const [isImageIntersected, setImageIntersected] = useState(false);

  const TOTAL_IMAGES = item.images.length;

  const openImage = (index) => setCurrentIndex(index);
  const closeImage = () => setCurrentIndex(null);

  const navigateToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TOTAL_IMAGES - 1 : prevIndex - 1,
    );
  };

  const navigateToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TOTAL_IMAGES - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePaperSelectionToggle = () => {
    const newPaperId = id === paperSelected ? "" : id;
    setPaperSelected(newPaperId);
    window.history.replaceState({}, "", `/opredelitel/${newPaperId}`);
  };

  const handleLinkClick = (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      const lastSegment = event.target.href.split("/").filter(Boolean).pop();
      setPaperSelected(lastSegment);
    }
  };

  return (
    <BlockStyles id={id}>
      <BlockImage
        imageUrl={item.album}
        isIntersected={isImageIntersected}
        setIsIntersected={setImageIntersected}
      />

      <Liner linerHeight={30} borderColor={item.color} />

      <BlockRectangularButton
        borderColor={item.color}
        onClick={handlePaperSelectionToggle}
      >
        {item.name}
      </BlockRectangularButton>

      {paperSelected === id && (
        <BlockHidden>
          <BlockDescription>
            <div
              dangerouslySetInnerHTML={{ __html: item.text }}
              onClick={handleLinkClick}
            />
          </BlockDescription>

          <MasonryGrid images={item.images} openImage={openImage} />

          {currentIndex !== null && (
            <Modal>
              <CloseButton onClick={closeImage}>
                <Icon icon="close" height={20} fill="#000" />
              </CloseButton>

              {TOTAL_IMAGES > 1 && (
                <>
                  <ArrowButtonLeft onClick={navigateToPreviousImage}>
                    <Icon icon="arrowLeft" height={20} width={20} fill="#000" />
                  </ArrowButtonLeft>
                  <ArrowButtonRight onClick={navigateToNextImage}>
                    <Icon
                      icon="arrowRight"
                      height={20}
                      width={20}
                      fill="#000"
                    />
                  </ArrowButtonRight>
                </>
              )}

              <FullscreenWrapper>
                <ImagesContainer currentIndex={currentIndex}>
                  {item.images.map((image, index) => (
                    <ImageContainer key={index}>
                      <ProgressiveImage
                        isToLoad={index === currentIndex}
                        imageUrl={image.dataset.original}
                        alt={image.name}
                      />
                      <span>{image.name}</span>
                    </ImageContainer>
                  ))}
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
