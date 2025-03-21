import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FullscreenImage } from "../Block/block.styles";

// Вынесение глобальной конфигурации на уровень модуля (если используется в других местах)
const API_URL = process.env.REACT_APP_API_URL;

// Функция генерации URL изображения
const generateImageURL = (type, imageUrl) =>
  type === "small"
    ? `${API_URL}/api/optimized-images/md/${imageUrl}`
    : `${API_URL}/images/${imageUrl}`;

const ProgressiveImage = ({ isToLoad, imageUrl, alt }) => {
  const [currentSrc, setCurrentSrc] = useState("");
  const [isLargeImageLoaded, setIsLargeImageLoaded] = useState(false);
  const [isSmallImageLoaded, setIsSmallImageLoaded] = useState(false);

  const smallImageURL = useMemo(
    () => generateImageURL("small", imageUrl),
    [imageUrl],
  );
  const largeImageURL = useMemo(
    () => generateImageURL("large", imageUrl),
    [imageUrl],
  );

  const loadSmallImage = useCallback(() => {
    setCurrentSrc(smallImageURL);
    setIsSmallImageLoaded(true);
  }, [smallImageURL]);

  const loadLargeImage = useCallback(() => {
    const largeImage = new Image();
    largeImage.src = largeImageURL;
    largeImage.onload = () => {
      setCurrentSrc(largeImageURL);
      setIsLargeImageLoaded(true);
    };
  }, [largeImageURL]);

  useEffect(() => {
    if (isToLoad && !isSmallImageLoaded) loadSmallImage();
    if (isToLoad && isSmallImageLoaded && !isLargeImageLoaded) loadLargeImage();
  }, [
    isToLoad,
    isSmallImageLoaded,
    isLargeImageLoaded,
    loadSmallImage,
    loadLargeImage,
  ]);

  return <FullscreenImage src={currentSrc} alt={alt} />;
};

export default ProgressiveImage;
