import React, { createContext, useCallback, useEffect, useState } from "react";
import { blocks, lists, images } from "./bd";

// Создаем контекст
export const OpredelitelContext = createContext();
const API_URL = process.env.REACT_APP_API_URL;

// Создаем провайдер для контекста
export const OpredelitelProvider = ({ children }) => {
  const [paperType, setPaperType] = useState(1);
  const [paperSelected, setPaperSelected] = useState("");
  const [loadedImages, setLoadedImages] = useState([]);
  const [imagesToLoad, setImagesToLoad] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [data, setData] = useState({ blocks: [], lists: [], isLoaded: false });

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

  const fetchData = (paperId) => {
    const filteredBlocks = blocks.filter((block) => block.paperId === paperId);

    setData({
      blocks: filteredBlocks.map((block) => {
        return {
          id: block.id,
          paperId: block.paperId,
          tildaId: block.tildaId,
          title: block.title,
          original: block.original,
          text: block.text,
          color: block.color,
          images: images.filter((image) => block.images.includes(image.id)),
        };
      }),
      lists: filteredBlocks.map((block) => {
        return {
          id: block.id,
          title: block.title,
          lists: lists.filter((list) => block.lists.includes(list.id)),
        };
      }),
      isLoaded: true,
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

  useEffect(() => {
    fetchData(paperType);
  }, []);

  useEffect(() => {
    fetchData(paperType);
  }, [paperType]);

  return (
    <OpredelitelContext.Provider
      value={{
        paperType,
        setPaperType,
        paperSelected,
        setPaperSelected,
        setImagesToLoad,
        loadedImages,
        blocks: data.blocks,
        lists: data.lists,
        isLoaded: data.isLoaded,
      }}
    >
      {children}
    </OpredelitelContext.Provider>
  );
};
