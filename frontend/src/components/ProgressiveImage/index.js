import React, { useEffect, useState } from "react";
import { FullscreenImage } from "../Block/block.styles";

const ProgressiveImage = ({ imageUrl, alt }) => {
  const [currentSrc, setCurrentSrc] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const small = `${API_URL}/api/optimized-images/250/${imageUrl}`;
  const large = `${API_URL}/images/${imageUrl}`;

  useEffect(() => {
    setCurrentSrc(small);

    const largeImage = new Image();
    largeImage.src = large;

    largeImage.onload = () => setCurrentSrc(large);
  }, [imageUrl]); // Эффект запускается, если изменяются smallSrc или largeSrc

  return (
    <FullscreenImage
      src={currentSrc} // Текущее изображение (smallSrc -> largeSrc)
      alt={alt}
    />
  );
};

export default ProgressiveImage;
