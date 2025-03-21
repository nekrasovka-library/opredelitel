import React, { useContext } from "react";
import Block from "../../components/Block";
import { BlocksStyles } from "./blocks.styles";
import { OpredelitelContext } from "../../context";
import { useIsMobile } from "../../helpers";

const Blocks = () => {
  const { blocks } = useContext(OpredelitelContext);
  const isMobile = useIsMobile(640);

  return (
    <BlocksStyles>
      {blocks.map((block) => {
        return (
          <Block
            key={block.id}
            block={block}
            id={block.id}
            isMobile={isMobile}
          />
        );
      })}
    </BlocksStyles>
  );
};

export default Blocks;
