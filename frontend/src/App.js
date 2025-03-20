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
              <a href="http://nekrasovka.ru/" target="_blank" rel="noopener">
                <img
                  src="https://static.tildacdn.com/tild3566-3436-4261-b534-363965663933/Logo_mono_wh-solo-02.svg"
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
              rel="noopener"
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
      {/*<div style={{ backgroundColor: "rgb(0, 0, 0)", height: "200px" }}>*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      left: "1396.5px",*/}
      {/*      top: "82px",*/}
      {/*      width: "36px",*/}
      {/*      position: "absolute",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <a href="https://vk.com/nekrasovkalibrary">*/}
      {/*      <img*/}
      {/*        alt=""*/}
      {/*        src="https://optim.tildacdn.com/tild3038-6230-4663-b763-333761623864/-/resize/72x/-/format/webp/VK-02.png"*/}
      {/*      />*/}
      {/*    </a>*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      left: "1442.5px",*/}
      {/*      top: "82px",*/}
      {/*      width: "36px",*/}
      {/*      position: "absolute",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <a href="https://t.me/nekrasovkalibrary">*/}
      {/*      <img*/}
      {/*        alt=""*/}
      {/*        src="https://optim.tildacdn.com/tild3332-3231-4331-a464-656537626235/-/resize/72x/-/format/webp/TELE-02.png"*/}
      {/*      />*/}
      {/*    </a>*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      left: "1488.5px",*/}
      {/*      top: "82px",*/}
      {/*      width: "36px",*/}
      {/*      position: "absolute",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <a href="https://www.youtube.com/nekrasovkalibrary/">*/}
      {/*      <img*/}
      {/*        alt=""*/}
      {/*        src="https://optim.tildacdn.com/tild3436-3635-4235-b133-323561613064/-/resize/72x/-/format/webp/YT-02.png"*/}
      {/*      />*/}
      {/*    </a>*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      left: "412.5px",*/}
      {/*      top: "75px",*/}
      {/*      width: "160px",*/}
      {/*      position: "absolute",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <a href="http://nekrasovka.ru/">*/}
      {/*      <img*/}
      {/*        alt=""*/}
      {/*        src="https://optim.tildacdn.com/tild6664-6431-4337-b236-306262366264/-/resize/320x/-/format/webp/Logo_white-02.png"*/}
      {/*      />*/}
      {/*    </a>*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      left: "363.5px",*/}
      {/*      top: "76px",*/}
      {/*      width: "34px",*/}
      {/*      position: "absolute",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div>*/}
      {/*      <img*/}
      {/*        alt=""*/}
      {/*        src="https://optim.tildacdn.com/tild3138-6231-4831-b934-613065633439/-/resize/68x/-/format/webp/BM_logo_top_white.png"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}

      {/*  <div*/}
      {/*    style={{*/}
      {/*      top: "76px",*/}
      {/*      left: "850.5px",*/}
      {/*      width: "10px",*/}
      {/*      height: "auto",*/}
      {/*      position: "absolute",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div style={{ lineHeight: "28px" }}>*/}
      {/*      <span style={{ color: "rgb(255, 255, 255)" }}>*/}
      {/*        +7 495 916 93 86*/}
      {/*      </span>*/}
      {/*      <a*/}
      {/*        href="mailto: nekrasovka@culture.mos.ru"*/}
      {/*        style={{*/}
      {/*          color: "#ffffff",*/}
      {/*          textDecoration: "none",*/}
      {/*          borderBottom: "1px solid #ffffff",*/}
      {/*          boxShadow: "inset 0px 0px 0px 0px #ffffff",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        nekrasovka@culture.mos.ru*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </OpredelitelProvider>
  );
}

export default Opredelitel;
