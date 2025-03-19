import { useCallback } from "react";
import { mapBlocks, mapLists, loadImage } from "../helpers";
import { blocks, lists, images } from "../context/bd";
const API_URL = process.env.REACT_APP_API_URL;

export const useDataHook = (dispatch, isMobile) => {
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

  const processImages = useCallback(
    async (state) => {
      if (state.isLoaded && state.imagesToLoad.length > 0) {
        const imageName = state.imagesToLoad[0];
        dispatch({ type: "SET_IS_LOADED", payload: false });
        try {
          const uploadedPath = await loadImage(imageName, API_URL);
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
    },
    [dispatch],
  );

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

  return { fetchData, processImages, scrollToElement };
};
