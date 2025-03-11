import React from "react";
import { LinerStyles } from "./liner.styles";

const Liner = ({ linerHeight, borderColor }) => {
  return (
    <LinerStyles linerHeight={linerHeight} borderColor={borderColor}>
      <div />
    </LinerStyles>
  );
};

export default Liner;
