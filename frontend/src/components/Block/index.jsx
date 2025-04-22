import React, { useContext, useEffect, useState } from "react";
import Liner from "../Liner";
import {
  ArrowButtonLeft,
  ArrowButtonRight,
  BlockDescription,
  BlockHidden,
  BlockMobileImages,
  BlockRectangularButton,
  BlockStyles,
  CloseButton,
  FullscreenWrapper,
  ImageContainer,
  ImagesContainer,
  Modal,
} from "./block.styles";
import { OpredelitelContext } from "../../context";
import Icon from "../Icon";
import MasonryGrid from "../MasonryGrid";
import ProgressiveImage from "../ProgressiveImage";
import BlockImage from "../../components/Image";
import { useNavigate, useParams } from "react-router-dom";

const Block = ({ block, id, isMobile }) => {
  const navigate = useNavigate();
  const { blockId } = useParams();
  const { refMap } = useContext(OpredelitelContext);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isImageIntersected, setImageIntersected] = useState(false);
  const [isBlockOpen, setBlockOpen] = useState(false);

  const TOTAL_IMAGES = block.images.length;

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
    if (isBlockOpen) {
      setBlockOpen(false);
      if (+blockId === id) navigate("/opredelitel/");
    } else {
      navigate(`/opredelitel/${id}`);
    }
  };

  const handleLinkClick = (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
      const lastSegment = +event.target.href.split("/").filter(Boolean).pop();
      navigate(`/opredelitel/${lastSegment}`);
    }
  };

  useEffect(() => {
    if (+blockId === id) {
      setBlockOpen(true);
    }
  }, [blockId, id]);

  return (
    <BlockStyles ref={(el) => (refMap.current[id] = el)}>
      <BlockImage
        imageUrl={block.original}
        isIntersected={isImageIntersected}
        setIsIntersected={setImageIntersected}
      />

      <Liner linerHeight={30} borderColor={block.color} />

      <BlockRectangularButton
        $borderColor={block.color}
        onClick={handlePaperSelectionToggle}
      >
        {block.title}
      </BlockRectangularButton>

      {isBlockOpen && (
        <BlockHidden>
          <BlockDescription>
            <div
              dangerouslySetInnerHTML={{ __html: block.text }}
              onClick={handleLinkClick}
            />
          </BlockDescription>

          {isMobile ? (
            <BlockMobileImages>
              <div>
                {block.images.map((image, index) => {
                  return (
                    <div key={index} onClick={() => openImage(index)}>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/api/optimized-images/md/${image.original}`}
                        alt={image.title}
                      />
                    </div>
                  );
                })}
              </div>
            </BlockMobileImages>
          ) : (
            <MasonryGrid images={block.images} openImage={openImage} />
          )}

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
                  {block.images.map((image, index) => (
                    <ImageContainer key={index}>
                      <ProgressiveImage
                        isToLoad={index === currentIndex}
                        imageUrl={image.original}
                        alt={image.title}
                      />
                      <span>{image.title}</span>
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
