import React from "react";
import { ImageStyles } from "./image.styles";

const Image = ({ imageUrl, className }) => {
  return (
    <ImageStyles imageUrl={imageUrl} className={className}>
      <div>
        <div />
      </div>
    </ImageStyles>
  );
};

export default Image;
