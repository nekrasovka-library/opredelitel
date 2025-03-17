import React, { useContext, useEffect } from "react";
import Block from "../../components/Block";
import { BlocksStyles } from "./blocks.styles";
import { OpredelitelContext } from "../../context";

const Blocks = () => {
  const { blocks, isLoaded, setPaperSelected } = useContext(OpredelitelContext);

  useEffect(() => {
    if (isLoaded) {
      const { pathname } = new URL(window.location);
      const pathSegments = pathname.split("/").filter(Boolean); // Убираем пустые элементы
      const lastSegment = +pathSegments[pathSegments.length - 1];
      const isKey = blocks.some((block) => block.id === lastSegment);

      if (isKey) setPaperSelected(lastSegment);
    }
  }, [window.location, isLoaded]);

  return (
    <BlocksStyles>
      {blocks.map((block) => {
        return <Block key={block.id} block={block} id={block.id} />;
      })}
    </BlocksStyles>
  );
};

export default Blocks;
