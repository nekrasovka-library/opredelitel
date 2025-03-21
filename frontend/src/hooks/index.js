import { useCallback } from "react";
import { loadImage } from "../helpers";
const API_URL = process.env.REACT_APP_API_URL;

export const useDataHook = (dispatch, isMobile) => {
  const processImages = useCallback(
    async ({ isLoaded, imagesToLoad }) => {
      if (isLoaded && imagesToLoad.length > 0) {
        const imageName = imagesToLoad[0];
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

  const scrollToRef = useCallback(
    (element) => {
      const { top } = element.getBoundingClientRect();

      window.scrollTo({
        top: window.scrollY + top - (isMobile ? 0 : 60),
        behavior: "smooth",
      });
    },
    [isMobile],
  );

  return { processImages, scrollToRef };
};
