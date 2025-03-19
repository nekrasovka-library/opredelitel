import React, { useContext } from "react";
import Block from "../../components/Block";
import { BlocksStyles } from "./blocks.styles";
import { OpredelitelContext } from "../../context";

const Blocks = () => {
  const { blocks } = useContext(OpredelitelContext);

  return (
    <BlocksStyles>
      {blocks.map((block) => {
        return <Block key={block.id} block={block} id={block.id} />;
      })}
    </BlocksStyles>
  );
};

export default Blocks;
