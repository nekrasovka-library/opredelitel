import React, { createContext, useState } from "react";

// Создаем контекст
export const OpredelitelContext = createContext();

// Создаем провайдер для контекста
export const OpredelitelProvider = ({ children }) => {
  const [paperType, setPaperType] = useState(1);
  const [paperSelected, setPaperSelected] = useState("");

  return (
    <OpredelitelContext.Provider
      value={{
        paperType,
        setPaperType,
        paperSelected,
        setPaperSelected,
      }}
    >
      {children}
    </OpredelitelContext.Provider>
  );
};
