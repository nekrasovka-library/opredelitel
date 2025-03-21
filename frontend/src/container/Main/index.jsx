import React from "react";
import AlphabetNavigator from "../../components/AlphabetNavigator";
import Title from "../Title";
import Description from "../Description";
import How from "../How";
import About from "../About";
import Blocks from "../Blocks";
import Resume from "../Resume";

const Main = () => {
  return (
    <main>
      <AlphabetNavigator />
      <Title />
      <Description />
      <How />
      <About />
      <Blocks />
      <Resume />
    </main>
  );
};

export default Main;
