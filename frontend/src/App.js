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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 290 290"
                  fill="#fff"
                >
                  <path d="M261.58,76.62v-.18c0-.07,0-.08-.09-.12a1.16,1.16,0,0,0-.3-.43.88.88,0,0,0-.22-.21l-.07-.07a1.52,1.52,0,0,0-.51-.12H233.06a1.48,1.48,0,0,0-.79.23L204,94.56V9c0-.06,0-.08-.08-.13a1.84,1.84,0,0,0-.3-.43l-.22-.19-.09-.09a1.46,1.46,0,0,0-.51-.12H175.48a1.37,1.37,0,0,0-.78.25L146.31,27.17V9c0-.06,0-.08-.09-.13a1.79,1.79,0,0,0-.51-.62l-.09-.09a1.46,1.46,0,0,0-.5-.12H117.79a1.37,1.37,0,0,0-.78.25L88.13,27.5a1.4,1.4,0,0,0-.57,1.58l.1.14h-.45V75.74h-.12L87,75.66a1.46,1.46,0,0,0-.5-.12H59.18a1.36,1.36,0,0,0-.78.24L29.52,95A1.4,1.4,0,0,0,29,96.18h-.17V213.35H57.18a.61.61,0,0,0,.19,0h.29a1.5,1.5,0,0,0,.51-.15L87,193.94l.08-.07v39.59H116a1.48,1.48,0,0,0,.79-.23l28.09-18.74V282h28.87a1.39,1.39,0,0,0,.79-.24l28.89-19.26a1.4,1.4,0,0,0,.62-1.17V213.27h27.42a1.29,1.29,0,0,0,.63-.19L261,193.83a1.43,1.43,0,0,0,.62-1.18V76.85A.91.91,0,0,0,261.58,76.62Zm-28.09,1.65h22.07L230.9,94.69H208.83Zm-57.61-67.5H198L173.28,27.19H151.22Zm-57.77,0h22.07L115.52,27.19H93.45ZM59.5,78.27H81.57L56.91,94.69H34.84Zm-.72,131V96.87L84.83,79.5V191.92Zm58.61,20.17v-200L143.44,12v200ZM175.14,278V29.38L201.19,12V260.62Zm57.63-68.81V96.87l26-17.37V191.92Z"></path>{" "}
                </svg>
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
