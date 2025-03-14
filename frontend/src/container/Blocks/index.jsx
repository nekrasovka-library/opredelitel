import React, { useContext, useEffect } from "react";
import Block from "../../components/Block";
import { BlocksStyles } from "./blocks.styles";
import { OpredelitelContext } from "../../context";
import { blocksData } from "../../context/data";

const Blocks = () => {
  const { paperType, setPaperSelected } = useContext(OpredelitelContext);

  const hasKey = (data, searchKey) => {
    for (const key in data) {
      const entries = data[key];

      // Проверяем, является ли значение массивом
      if (Array.isArray(entries)) {
        for (const entry of entries) {
          if (entry[searchKey]) {
            return true; // Если ключ найден
          }
        }
      } else if (typeof data[key] === "object") {
        if (data[key][searchKey]) {
          return true; // Если ключ найден
        }
      }
    }

    return false; // Ключ не найден
  };

  useEffect(() => {
    const { pathname } = new URL(window.location);
    const pathSegments = pathname.split("/").filter(Boolean); // Убираем пустые элементы
    const lastSegment = pathSegments[pathSegments.length - 1];
    const isKey = hasKey(blocksData, lastSegment);

    if (isKey) setPaperSelected(lastSegment);
  }, [window.location]);

  return (
    <BlocksStyles>
      {Object.keys(blocksData[paperType]).map((item) => {
        return (
          <Block key={item} item={blocksData[paperType][item]} id={item} />
        );
      })}
    </BlocksStyles>
  );
};

export default Blocks;
