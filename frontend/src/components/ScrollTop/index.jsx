import React, { useContext, useState } from "react";
import { IconButton } from "../Button/button.styles";
import Icon from "../Icon";
import { useElementVisibility } from "../../helpers";
import { OpredelitelContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";

const ScrollTop = () => {
  const navigate = useNavigate();
  const { blockId } = useParams();
  const { refMap } = useContext(OpredelitelContext);
  const [isVisible, setIsVisible] = useState(false);
  const handleScrollTop = () => {
    if (blockId) navigate(`/opredelitel/`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useElementVisibility(
    refMap,
    "alphabet_navigator",
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
