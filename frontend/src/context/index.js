import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { blocks, lists, images } from "./bd";
import { useParams } from "react-router-dom";
import { mapBlocks, mapLists, useIsMobile } from "../helpers";
import { reducer, initialState } from "../reducers";

// Создаем контекст
export const OpredelitelContext = createContext();
const API_URL = process.env.REACT_APP_API_URL;

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
  const [state, dispatch] = useReducer(reducer, initialState);
  const refMap = useRef({});
  const { blockId } = useParams();
  const isMobile = useIsMobile(640);

  // Функция для получения и обработки данных
  const fetchData = useCallback(
    (paperId) => {
      const filteredBlocks = blocks.filter(
        (block) => block.paperId === paperId,
      );
      dispatch({
        type: "SET_DATA",
        payload: {
          blocks: mapBlocks(filteredBlocks, images),
          lists: mapLists(filteredBlocks, lists),
          isLoaded: true,
        },
      });
    },
    [dispatch],
  );

  // Основной процесс загрузки изображений
  const processImages = useCallback(async () => {
    if (state.isLoaded && state.imagesToLoad.length > 0) {
      const imageName = state.imagesToLoad[0];
      dispatch({ type: "SET_IS_LOADED", payload: false });
      try {
        const uploadedPath = await loadImage(imageName);
        dispatch({
          type: "ADD_LOADED_IMAGE",
          payload: { id: imageName, path: uploadedPath },
        });
        dispatch({ type: "REMOVE_IMAGE_TO_LOAD" });
      } catch (error) {
        console.error(`Ошибка при обработке ${imageName}:`, error);
      } finally {
        dispatch({ type: "SET_IS_LOADED", payload: true });
      }
    }
  }, [state.isLoaded, state.imagesToLoad]);

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

  // Прокрутка при изменении blockId
  useEffect(() => {
    if (blockId && refMap.current[blockId] && state.data.isLoaded) {
      scrollToElement(refMap.current[blockId]);
    }
  }, [blockId, refMap, scrollToElement, state.data.isLoaded]);

  // Загрузка данных на основе paperType
  useEffect(() => {
    fetchData(state.paperType);
  }, [state.paperType, fetchData]);

  // Запуск процесса обработки изображений
  useEffect(() => {
    if (state.imagesToLoad.length > 0) {
      processImages();
    }
  }, [state.imagesToLoad, processImages]);

  return (
    <OpredelitelContext.Provider
      value={{
        paperType: state.paperType,
        setPaperType: (type) =>
          dispatch({ type: "SET_PAPER_TYPE", payload: type }),
        setImagesToLoad: (image) =>
          dispatch({ type: "SET_IMAGES_TO_LOAD", payload: image }),
        loadedImages: state.loadedImages,
        refMap,
        blocks: state.data.blocks,
        lists: state.data.lists,
      }}
    >
      {children}
    </OpredelitelContext.Provider>
  );
};
