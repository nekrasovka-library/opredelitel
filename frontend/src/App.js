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

function Opredelitel() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <OpredelitelProvider>
      <div
        id="nav582997614"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          height: "50px",
          boxShadow: "none",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ minWidth: "35px", width: "35px" }}>
            <div style={{ display: "block" }}>
              <a href="http://nekrasovka.ru/" target="_blank" rel="noreferrer">
                <img
                  src="/images/tild3566-3436-4261-b534-363965663933__logo_mono_wh-solo-02.svg"
                  style={{ maxWidth: "35px", width: "35px" }}
                  alt=""
                />
              </a>
            </div>
          </div>
          <nav>
            <a
              href="https://biblioteka.nekrasovka.ru/event"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "18px",
                color: "#ffffff",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              Другие проекты
            </a>
          </nav>
        </div>
      </div>
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
