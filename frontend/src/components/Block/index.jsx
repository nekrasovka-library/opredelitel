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
  const blockRef = useRef(null); // Реф для отслеживания элемента

  const openImage = (index) => {
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setCurrentIndex(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePaperSelected = () => {
    setIsIntersected(false);
    setPaperSelected(id === paperSelected ? "" : id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Если блок в видимости, передаем true, иначе false
          onVisibilityChange(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Минимальная доля видимости для срабатывания (10%)
      },
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => {
      // Чистим наблюдателя при размонтировании
      if (blockRef.current) {
        observer.unobserve(blockRef.current);
      }
    };
  }, []);

  return (
    <BlockStyles id={id} ref={blockRef}>
      <BlockImage
        imageUrl={`${process.env.REACT_APP_API_URL}/images/${item.album}`}
        isVisible={isVisible}
      />
      <Liner linerHeight={30} borderColor={item.color} />
      <BlockRectangularButton
        borderColor={item.color}
        onClick={handlePaperSelected}
      >
        {item.name}
      </BlockRectangularButton>
      {paperSelected === id && isIntersected ? (
        <BlockHidden>
          <BlockDescription>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </BlockDescription>
          <MasonryGrid images={item.images} openImage={openImage} />
          {currentIndex !== null && (
            <Modal>
              <CloseButton onClick={closeModal}>
                <Icon icon="close" height={20} fill="#000" />
              </CloseButton>
              <ArrowButtonLeft onClick={handlePrev}>
                <Icon icon="arrowLeft" height={20} width={20} fill="#000" />
              </ArrowButtonLeft>
              <ArrowButtonRight onClick={handleNext}>
                <Icon icon="arrowRight" height={20} width={20} fill="#000" />
              </ArrowButtonRight>
              <ImageContainer>
                <ProgressiveImage
                  smallSrc={`${process.env.REACT_APP_API_URL}/api/optimized-images/${item.images[currentIndex].dataset.original}`}
                  largeSrc={`${process.env.REACT_APP_API_URL}/images/${item.images[currentIndex].dataset.original}`}
                  alt={item.images[currentIndex].name}
                />
                <span>{item.images[currentIndex].name}</span>
              </ImageContainer>
            </Modal>
          )}
        </BlockHidden>
      ) : null}
    </BlockStyles>
  );
};

export default Block;
