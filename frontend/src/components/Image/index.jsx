import React, { useEffect, useRef, useState } from "react";
import { ImageStyles } from "./image.styles";

const Image = ({ imageUrl, className }) => {
  const blockRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // Видимость компонента
  const [imageLoaded, setImageLoaded] = useState(false); // Флаг, загружено ли изображение
  const [imageBlob, setImageBlob] = useState(null); // Blob URL для отображения изображения
  const [loadingAbortController, setLoadingAbortController] = useState(null); // AbortController
  const VISIBILITY_THRESHOLD = 0.1; // Уровень видимости

  const createObserver = () =>
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
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
      // Если изображение становится видимым и еще не загружено
      const abortController = new AbortController();
      setLoadingAbortController(abortController);

      // Используем fetch для загрузки изображения
      fetch(imageUrl, { signal: abortController.signal })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка загрузки изображения");
          }
          return response.blob(); // Преобразуем ответ в blob
        })
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob);
          setImageBlob(blobUrl); // Устанавливаем URL загруженного blob
          setImageLoaded(true);
          setLoadingAbortController(null); // Очищаем AbortController
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Загрузка изображения прервана");
          } else {
            console.error("Ошибка загрузки:", error);
          }
          setLoadingAbortController(null);
        });

      return () => {
        if (abortController) {
          // Прерываем загрузку, если компонент уходит из зоны видимости
          abortController.abort();
        }
      };
    } else if (!isVisible && loadingAbortController) {
      // Если компонент выходит из зоны видимости, прерываем загрузку
      loadingAbortController.abort();
      setLoadingAbortController(null);
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (imageBlob) {
        URL.revokeObjectURL(imageBlob);
        setImageBlob(null);
      }
    };
  }, [imageBlob]);

  return (
    <ImageStyles
      isVisible={isVisible}
      className={className}
      ref={blockRef}
      imageUrl={imageBlob ? `url(${imageBlob})` : "none"}
    >
      <div>
        <div />
      </div>
    </ImageStyles>
  );
};

export default Image;
