import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { blocks, lists, images } from "./bd";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../helpers";

// Создаем контекст
export const OpredelitelContext = createContext();
const API_URL = process.env.REACT_APP_API_URL;

// Вспомогательная функция для преобразования данных блоков
const mapBlocks = (filteredBlocks) =>
  filteredBlocks.map((filteredBlock) => ({
    id: filteredBlock.id,
    paperId: filteredBlock.paperId,
    tildaId: filteredBlock.tildaId,
    title: filteredBlock.title,
    original: filteredBlock.original,
    text: filteredBlock.text,
    color: filteredBlock.color,
    images: images.filter((image) => filteredBlock.images.includes(image.id)),
  }));

// Вспомогательная функция для преобразования списков
const mapLists = (filteredBlocks) =>
  filteredBlocks.map((filteredBlock) => ({
    id: filteredBlock.id,
    title: filteredBlock.title,
    lists: lists.filter((list) => filteredBlock.lists.includes(list.id)),
  }));

// Функция загрузки изображения
const loadImage = (imageName) => {
  const imagePath = `${API_URL}/images/${imageName}`;
  return new Promise((resolve, reject) => {
    const imageElement = new Image();
    imageElement.onload = () => resolve(imagePath);
    imageElement.onerror = (error) => reject(error);
    imageElement.src = imagePath;
  });
};

// Провайдер контекста
export const OpredelitelProvider = ({ children }) => {
  const [paperType, setPaperType] = useState(1);
  const [loadedImages, setLoadedImages] = useState([]);
  const [imagesToLoad, setImagesToLoad] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [data, setData] = useState({ blocks: [], lists: [], isLoaded: false });
  const refMap = useRef({});
  const { blockId } = useParams();
  const isMobile = useIsMobile(640);

  // Функция для получения и обработки данных
  const fetchData = useCallback((paperId) => {
    const filteredBlocks = blocks.filter((block) => block.paperId === paperId);
    setData({
      blocks: mapBlocks(filteredBlocks),
      lists: mapLists(filteredBlocks),
      isLoaded: true,
    });
  }, []);

  // Основной процесс загрузки изображений
  const processImages = useCallback(async () => {
    if (isLoaded && imagesToLoad.length > 0) {
      const imageName = imagesToLoad[0];
      setIsLoaded(false);
      try {
        const uploadedPath = await loadImage(imageName);
        setLoadedImages((prev) => [
          ...prev,
          { id: imageName, path: uploadedPath },
        ]);
        setImagesToLoad((prev) => prev.slice(1));
      } catch (error) {
        console.error(`Ошибка при обработке ${imageName}:`, error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, [isLoaded, imagesToLoad]);

  const scrollToElement = useCallback(
    (element) => {
      const { top } = element.getBoundingClientRect();

      window.scrollTo({
        top: window.scrollY + top - (isMobile ? 0 : 60),
        behavior: "smooth",
      });
    },
    [isMobile],
  );

  useEffect(() => {
    if (blockId && refMap.current[blockId] && data.isLoaded) {
      scrollToElement(refMap.current[blockId]);
    }
  }, [data.isLoaded, blockId, refMap, scrollToElement]);

  useEffect(() => {
    if (imagesToLoad.length > 0) {
      processImages();
    }
  }, [imagesToLoad, processImages]);

  useEffect(() => {
    fetchData(paperType);
  }, [paperType, fetchData]);

  return (
    <OpredelitelContext.Provider
      value={{
        paperType,
        setPaperType,
        setImagesToLoad,
        loadedImages,
        refMap,
        blocks: data.blocks,
        lists: data.lists,
      }}
    >
      {children}
    </OpredelitelContext.Provider>
  );
};
