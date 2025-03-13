import React, { useEffect, useState } from "react";
import { FullscreenImage } from "../Block/block.styles";

// Вынесение глобальной конфигурации на уровень модуля (если используется в других местах)
const API_URL = process.env.REACT_APP_API_URL;

// Генерация URL изображений, чтобы избежать дублирования кода
const generateImageURL = (type, imageUrl) =>
  type === "small"
    ? `${API_URL}/api/optimized-images/250/${imageUrl}`
    : `${API_URL}/images/${imageUrl}`;

const ProgressiveImage = ({ isToLoad, imageUrl, alt }) => {
  const [currentSrc, setCurrentSrc] = useState("");
  const [isLargeLoaded, setIsLargeLoaded] = useState(false);

  // Ссылки на малое и большое изображение
  const smallImageURL = generateImageURL("small", imageUrl);
  const largeImageURL = generateImageURL("large", imageUrl);

  // Обработка загрузки большого изображения
  const handleLargeImageLoad = () => {
    const largeImage = new Image(); // Создание нового объекта изображения
    largeImage.src = largeImageURL;
    largeImage.onload = () => {
      setCurrentSrc(largeImageURL);
      setIsLargeLoaded(true);
    };
  };

  useEffect(() => {
    if (!isLargeLoaded) {
      setCurrentSrc(smallImageURL); // Установка малой версии изображения
    }
  }, [smallImageURL, isLargeLoaded]); // Изменения происходят при смене изображения или флага загрузки

  useEffect(() => {
    if (isToLoad && !isLargeLoaded) {
      handleLargeImageLoad(); // Запуск загрузки большого изображения
    }
  }, [isToLoad, isLargeLoaded]);

  return (
    <FullscreenImage
      src={currentSrc} // Использование текущего URL
      alt={alt} // Альтернативный текст
    />
  );
};

export default ProgressiveImage;
