import React, { createContext, useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../helpers";
import { reducer, initialState } from "../reducers";
import { useDataHook } from "../hooks";

// Создаем контекст
export const OpredelitelContext = createContext();

// Провайдер контекста
export const OpredelitelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refMap = useRef({});
  const { blockId } = useParams();
  const isMobile = useIsMobile(640);
  const { fetchData, processImages, scrollToRef } = useDataHook(
    dispatch,
    isMobile,
  );

  // Прокрутка при изменении blockId
  useEffect(() => {
    if (blockId && refMap.current[blockId] && state.data.isLoaded) {
      scrollToRef(refMap.current[blockId]);
    }
  }, [blockId, refMap, scrollToRef, state.data.isLoaded]);

  // Загрузка данных на основе paperType
  useEffect(() => {
    fetchData(state.paperType);
  }, [state.paperType, fetchData]);

  // Запуск процесса обработки изображений
  useEffect(() => {
    if (state.imagesToLoad.length > 0) {
      processImages(state);
    }
  }, [state.imagesToLoad, processImages, state]);

  return (
    <OpredelitelContext.Provider
      value={{
        refMap,
        paperType: state.paperType,
        loadedImages: state.loadedImages,
        blocks: state.data.blocks,
        lists: state.data.lists,
        setPaperType: (type) =>
          dispatch({ type: "SET_PAPER_TYPE", payload: type }),
        setImagesToLoad: (image) =>
          dispatch({ type: "SET_IMAGES_TO_LOAD", payload: image }),
      }}
    >
      {children}
    </OpredelitelContext.Provider>
  );
};
