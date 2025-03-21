import React from "react";
import Header from "./container/Header";
import ScrollTop from "./components/ScrollTop";
import { OpredelitelProvider } from "./context";
import Main from "./container/Main";

function Opredelitel() {
  return (
    <OpredelitelProvider>
      <Header />
      <Main />
      <ScrollTop />
    </OpredelitelProvider>
  );
}

export default Opredelitel;
