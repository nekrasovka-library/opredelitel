import { IconButton } from "./components/Button/button.styles";
import Icon from "./components/Icon";
import AlphabetNavigator from "./components/AlphabetNavigator";
import React from "react";
import Blocks from "./container/Blocks";
import Description from "./container/Description";
import Title from "./container/Title";
import About from "./container/About";
import How from "./container/How";
import { OpredelitelProvider } from "./context";
import Resume from "./container/Resume";
import Header from "./container/Header";

function Opredelitel() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <OpredelitelProvider>
      <Header />
      <AlphabetNavigator />
      <Title />
      <Description />
      <How />
      <About />
      <Blocks />
      <Resume />
      <IconButton onClick={handleScrollTop}>
        <Icon icon="arrowUp" />
      </IconButton>
    </OpredelitelProvider>
  );
}

export default Opredelitel;
