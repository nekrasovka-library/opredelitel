import React from "react";
import { IconButton } from "../Button/button.styles";
import Icon from "../Icon";

const ScrollTop = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <IconButton onClick={handleScrollTop}>
      <Icon icon="arrowUp" />
    </IconButton>
  );
};

export default ScrollTop;
