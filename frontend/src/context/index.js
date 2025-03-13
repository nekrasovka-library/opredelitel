import React, { createContext, useCallback, useEffect, useState } from "react";

// Создаем контекст
export const OpredelitelContext = createContext();

// Создаем провайдер для контекста
export const OpredelitelProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [paperType, setPaperType] = useState(1);
  const [paperSelected, setPaperSelected] = useState("");
  const [loadedImages, setLoadedImages] = useState([]);
  const [imagesToLoad, setImagesToLoad] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  // Функция загрузки изображения с использованием new Image
  const loadImage = (imageName) => {
    const imagePath = `${API_URL}/images/${imageName}`;

    return new Promise((resolve, reject) => {
      const img = new Image();

      // Событие для успешной загрузки изображения
      img.onload = () => {
        console.log(`Изображение успешно загружено: ${imageName}`);
        resolve(imagePath); // Возвращаем путь загруженного изображения
      };

      // Событие для обработки ошибок загрузки
      img.onerror = (error) => {
        console.error(`Ошибка загрузки изображения: ${imageName}`, error);
        reject(error); // Возвращаем ошибку
      };

      // Устанавливаем путь
      img.src = imagePath;
    });
  };

  // Основной процесс загрузки изображений
  const processImages = useCallback(async () => {
    if (isLoaded && imagesToLoad.length > 0) {
      // Забираем первое изображение из массива
      const imageName = imagesToLoad[0];
      // Ставим флаг "загрузка идет"
      setIsLoaded(false);

      try {
        // Реальная загрузка изображения
        const uploadedPath = await loadImage(imageName);

        // Добавляем в массив загруженных изображений
        setLoadedImages((prevState) => [
          ...prevState,
          { id: imageName, path: uploadedPath },
        ]);

        // Убираем загруженное изображение из очереди
        setImagesToLoad((prevState) => prevState.slice(1));
      } catch (error) {
        console.error(`Ошибка при обработке ${imageName}:`, error);
      } finally {
        // Ставим флаг "загружено"
        setIsLoaded(true);
      }
    }
  }, [isLoaded, imagesToLoad]);

  // Вызываем процесс загрузки при изменении состояния
  useEffect(() => {
    if (imagesToLoad.length > 0) {
      processImages();
    }
  }, [imagesToLoad, processImages]);

  return (
    <OpredelitelContext.Provider
      value={{
        paperType,
        setPaperType,
        paperSelected,
        setPaperSelected,
        setImagesToLoad,
        loadedImages,
      }}
    >
      {children}
    </OpredelitelContext.Provider>
  );
};
