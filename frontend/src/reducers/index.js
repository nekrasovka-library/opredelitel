export const initialState = {
  paperType: 1,
  loadedImages: [],
  imagesToLoad: [],
  isLoaded: true,
  isMobile: false,
  data: { blocks: [], lists: [], isLoaded: false },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PAPER_TYPE":
      return { ...state, paperType: action.payload };
    case "SET_IMAGES_TO_LOAD":
      return {
        ...state,
        imagesToLoad: [...state.imagesToLoad, action.payload],
      };
    case "ADD_LOADED_IMAGE":
      return {
        ...state,
        loadedImages: [...state.loadedImages, action.payload],
      };
    case "REMOVE_IMAGE_TO_LOAD":
      return {
        ...state,
        imagesToLoad: state.imagesToLoad.slice(1),
      };
    case "SET_IS_LOADED":
      return { ...state, isLoaded: action.payload };
    case "SET_IS_MOBILE":
      return { ...state, isMobile: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      throw new Error(`Неизвестное действие: ${action.type}`);
  }
};
