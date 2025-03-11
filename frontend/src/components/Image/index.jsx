import React, { useEffect, useRef, useState } from "react";
import { ImageStyles } from "./image.styles";

const BlockImage = ({ imageUrl, className }) => {
  const blockRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadingAbortController, setLoadingAbortController] = useState(null);
  const VISIBILITY_THRESHOLD = 0.1; // Уровень видимости для срабатывания

  const createObserver = () =>
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting); // Устанавливаем видимость
        });
      },
      { threshold: VISIBILITY_THRESHOLD },
    );

  useEffect(() => {
    const observer = createObserver();
    if (blockRef.current) observer.observe(blockRef.current);

    return () => {
      if (blockRef.current) observer.unobserve(blockRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible && !imageLoaded) {
      // Если компонент в зоне видимости, начинаем загрузку изображения
      const abortController = new AbortController();
      setLoadingAbortController(abortController);

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setImageLoaded(true); // Устанавливаем статус загруженного изображения
        setLoadingAbortController(null);
      };
      img.onerror = () => {
        // Управляем ошибками загрузки (например, сбрасываем состояние)
        setImageLoaded(false);
        setLoadingAbortController(null);
      };

      return () => {
        // Если компонент уходит из видимости, прерываем загрузку
        abortController.abort();
      };
    } else if (!isVisible && loadingAbortController) {
      // Если компонент ушел из зоны видимости и загрузка идет, прерываем процесс
      loadingAbortController.abort();
      setLoadingAbortController(null);
    }
  }, [isVisible]);

  return (
    <ImageStyles
      isVisible={isVisible}
      className={className}
      ref={blockRef}
      imageUrl={imageLoaded ? `url(${imageUrl})` : "none"}
    >
      <div>
        <div />
      </div>
    </ImageStyles>
  );
};

export default BlockImage;
