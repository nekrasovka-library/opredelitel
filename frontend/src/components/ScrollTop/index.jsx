import React, { useContext, useState } from "react";
import { IconButton } from "../Button/button.styles";
import Icon from "../Icon";
import { useElementVisibility } from "../../helpers";
import { OpredelitelContext } from "../../context";

const ScrollTop = () => {
  const { refMap } = useContext(OpredelitelContext);
  const [isVisible, setIsVisible] = useState(false);
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useElementVisibility(
    refMap.current["alphabet_navigator"], // Передаем ссылку на элемент
    (isVisible) => setIsVisible(isVisible), // Устанавливаем видимость через callback
    20,
  );

  return (
    isVisible && (
      <IconButton onClick={handleScrollTop}>
        <Icon icon="arrowUp" />
      </IconButton>
    )
  );
};

export default ScrollTop;
