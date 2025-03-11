import React, { useContext } from "react";
import Block from "../../components/Block";
import { BlocksStyles } from "./blocks.styles";
import { OpredelitelContext } from "../../context";
import { blocksData } from "../../context/data";

const Blocks = () => {
  const { paperType } = useContext(OpredelitelContext);

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
