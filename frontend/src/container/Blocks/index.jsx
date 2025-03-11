import React, { useContext, useState } from "react";
import Block from "../../components/Block";
import { BlocksStyles } from "./blocks.styles";
import { OpredelitelContext } from "../../context";
import { blocksData } from "../../context/data";

const Blocks = () => {
  const { paperType } = useContext(OpredelitelContext);
  const [activeBlock, setActiveBlock] = useState([]);

  const handleVisibilityChange = (isVisible, id) => {
    if (isVisible) {
      setActiveBlock((prev) => [...prev, id]);
    } else {
      setActiveBlock((prev) => prev.filter((item) => item !== id));
    }
  };

  return (
    <BlocksStyles>
      {Object.keys(blocksData[paperType]).map((item) => {
        return (
          <Block
            key={item}
            item={blocksData[paperType][item]}
            id={item}
            isVisible={activeBlock.includes(item)}
            onVisibilityChange={(isVisible) =>
              handleVisibilityChange(isVisible, item)
            }
          />
        );
      })}
    </BlocksStyles>
  );
};

export default Blocks;
