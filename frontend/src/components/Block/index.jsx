import React, { useContext, useEffect, useRef, useState } from "react";
import Liner from "../Liner";
import {
  ArrowButtonLeft,
  ArrowButtonRight,
  BlockDescription,
  BlockHidden,
  BlockImage,
  BlockRectangularButton,
  BlockStyles,
  CloseButton,
  ImageContainer,
  Modal,
} from "./block.styles";
import { OpredelitelContext } from "../../context";
import Icon from "../Icon";
import MasonryGrid from "../MasonryGrid";
import ProgressiveImage from "../ProgressiveImage";

const Block = ({ item, id, onVisibilityChange, isVisible }) => {
  const { paperSelected, setPaperSelected, isIntersected, setIsIntersected } =
    useContext(OpredelitelContext);
  const [currentIndex, setCurrentIndex] = useState(null);
  const blockRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const VISIBILITY_THRESHOLD = 0;

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
    setIsIntersected(false);
    setPaperSelected(id === paperSelected ? "" : id);
  };

  const createObserver = () =>
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => onVisibilityChange(entry.isIntersecting));
      },
      { rootMargin: "200px", threshold: VISIBILITY_THRESHOLD },
    );

  useEffect(() => {
    const observer = createObserver();
    if (blockRef.current) observer.observe(blockRef.current);

    return () => {
      if (blockRef.current) observer.unobserve(blockRef.current);
    };
  }, []);

  return (
    <BlockStyles id={id} ref={blockRef}>
      <BlockImage
        imageUrl={`${API_URL}/images/${item.album}`}
        isVisible={isVisible}
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
              <ImageContainer>
                <ProgressiveImage
                  smallSrc={`${API_URL}/api/optimized-images/${item.images[currentIndex].dataset.original}`}
                  largeSrc={`${API_URL}/images/${item.images[currentIndex].dataset.original}`}
                  alt={item.images[currentIndex].name}
                />
                <span>{item.images[currentIndex].name}</span>
              </ImageContainer>
            </Modal>
          )}
        </BlockHidden>
      )}
    </BlockStyles>
  );
};

export default Block;
