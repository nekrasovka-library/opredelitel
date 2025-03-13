import React, { useContext, useEffect, useRef, useState } from "react";
import { ImageStyles } from "./image.styles";
import { OpredelitelContext } from "../../context";

const Image = ({ imageUrl, className, isIntersected, setIsIntersected }) => {
  const { setImagesToLoad, loadedImages } = useContext(OpredelitelContext);

  const API_URL = process.env.REACT_APP_API_URL;
  const SMALL_IMAGE = `${API_URL}/api/optimized-images/20/${imageUrl}`;
  const blockRef = useRef(null); // Ссылка на HTML-элемент
  const [isFullImageLoaded, setIsFullImageLoaded] = useState(false); // Флаг завершённой загрузки изображения (чтобы не грузить снова)
  const visibilityTimerRef = useRef(null); // Таймер на 200 мс

  useEffect(() => {
    const currentBlockRef = blockRef.current;

    // Создаём Observer для отслеживания видимости
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersected(entry.isIntersecting);

        if (entry.isIntersecting) {
          if (!isFullImageLoaded) {
            visibilityTimerRef.current = setTimeout(() => {
              // loadImage();
              setImagesToLoad((prevState) => [...prevState, imageUrl]);
            }, 200); // Ожидаем, пока блок находится в видимости 200 мс
          }
        } else clearTimeout(visibilityTimerRef.current);
      },
      { threshold: 0.1 }, // 10% блока должны быть видимы
    );

    if (blockRef.current) {
      observer.observe(currentBlockRef);
    }

    return () => {
      // Чистим observer и таймер при размонтировании
      if (currentBlockRef) {
        observer.unobserve(currentBlockRef);
      }

      clearTimeout(visibilityTimerRef.current);
    };
  }, [imageUrl, isFullImageLoaded]);

  useEffect(() => {
    if (isFullImageLoaded) return;

    const imageObject = loadedImages.find((image) => image.id === imageUrl);

    if (imageObject) {
      const div = blockRef.current.children[0].children[0];
      div.style.backgroundImage = `url(${imageObject.path})`;
      setIsFullImageLoaded(true);
    }
  }, [loadedImages, setIsFullImageLoaded, isFullImageLoaded]);

  return (
    <ImageStyles
      isIntersected={isIntersected}
      className={className}
      ref={blockRef}
      imageUrl={`url(${SMALL_IMAGE})`}
    >
      <div>
        <div />
      </div>
    </ImageStyles>
  );
};

export default Image;
