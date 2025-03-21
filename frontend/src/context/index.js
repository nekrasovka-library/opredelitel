import React, { createContext, useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { mapBlocks, mapLists, useIsMobile } from "../helpers";
import { reducer, initialState } from "../reducers";
import { useDataHook } from "../hooks";
import { blocks, images, lists } from "./bd";

// Создаем контекст
export const OpredelitelContext = createContext();

// Провайдер контекста
export const OpredelitelProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refMap = useRef({});
  const { blockId } = useParams();
  const isMobile = useIsMobile(640);
  const { processImages, scrollToRef } = useDataHook(dispatch, isMobile);

  const fetchData = (type) => {
    const filteredBlocks = blocks.filter((block) => block.paperId === type);
    dispatch({
      type: "SET_DATA",
      payload: {
        blocks: mapBlocks(filteredBlocks, images),
        lists: mapLists(filteredBlocks, lists),
        isLoaded: true,
      },
    });
  };

  useEffect(() => {
    let type = state.paperType;

    if (blockId) {
      const block = blocks.find((block) => block.id === +blockId);

      if (state.paperType !== block.paperId) {
        type = block.paperId;
      }

      dispatch({ type: "SET_PAPER_TYPE", payload: type });
    }

    fetchData(type);
  }, []);

  // Прокрутка при изменении blockId
  useEffect(() => {
    if (blockId && refMap.current[blockId] && state.data.isLoaded) {
      scrollToRef(refMap.current[blockId]);
    }
  }, [blockId, refMap, scrollToRef, state.data.isLoaded]);

  // Запуск процесса обработки изображений
  useEffect(() => {
    if (state.imagesToLoad.length > 0) {
      processImages({
        isLoaded: state.isLoaded,
        imagesToLoad: state.imagesToLoad,
      });
    }
  }, [state.imagesToLoad, state.isLoaded, processImages]);

  return (
    <OpredelitelContext.Provider
      value={{
        refMap,
        paperType: state.paperType,
        loadedImages: state.loadedImages,
        blocks: state.data.blocks,
        lists: state.data.lists,
        fetchData: fetchData,
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
