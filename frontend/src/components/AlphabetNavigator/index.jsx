import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dropdown,
  ItemTitle,
  List,
  ListItem,
  Navigation,
  NavItem,
} from "./alphabet.styles";
import { OpredelitelContext } from "../../context";
import { useIsMobile } from "../../helpers";

const Alphabet = () => {
  const { lists, paperSelected, setPaperSelected } =
    useContext(OpredelitelContext);
  const isMobile = useIsMobile(640);
  const navigationRef = useRef(null);
  const [data, setData] = useState({});
  const [hoveredLetter, setHoveredLetter] = useState(null); // Состояние для текущей буквы, на которую навели
  const [isANVisible, setIsANVisible] = useState(false);

  const handlePaperSelected = (id) => {
    const newId = id === paperSelected ? "" : id;
    setPaperSelected(newId);
    window.history.replaceState({}, "", `/opredelitel/${newId}`);
  };

  const getElementPosition = (id) => {
    const element = document.getElementById(`${id}`);
    const { top } = element.getBoundingClientRect();
    const offset = isMobile ? 0 : navigationRef.current.clientHeight;

    return window.scrollY + top - offset;
  };

  const scrollToElement = (id) => {
    const top = getElementPosition(id);

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const groupedByLetter = lists.reduce((acc, item) => {
    // Получаем первую букву заголовка
    const firstLetter = item.title[0];

    // Добавляем массив объектов под каждую букву, если буква еще не инициализирована
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }

    // Откладываем объект в нужную букву
    acc[firstLetter].push(item);

    return acc;
  }, {});

  useEffect(() => {
    if (paperSelected) {
      scrollToElement(paperSelected);
    }
  }, [paperSelected]);

  useEffect(() => {
    setData(groupedByLetter);
  }, [lists]);

  useEffect(() => {
    if (isMobile) return;

    const targetElement = document.getElementById("alphabet_navigator");

    const handleScroll = () => {
      const rect = targetElement.getBoundingClientRect(); // Получаем позицию относительно окна
      const offset = rect.top - 20; // Учитываем отступ в 60px

      if (offset <= 0) {
        setIsANVisible(true);
      } else setIsANVisible(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <Navigation ref={navigationRef} isVisible={isANVisible}>
      {Object.keys(data).map((item) => {
        return (
          <NavItem
            isActive={hoveredLetter === item}
            key={item}
            onMouseEnter={() => setHoveredLetter(item)}
            onMouseLeave={() => setHoveredLetter(null)}
            onClick={() =>
              setHoveredLetter(hoveredLetter === item ? null : item)
            }
          >
            <span>{item}</span>
            {hoveredLetter === item && (
              <Dropdown>
                {data[item].map((ul) => {
                  return (
                    <div key={ul.id} onClick={() => handlePaperSelected(ul.id)}>
                      <ItemTitle>{ul.title}</ItemTitle>
                      <List>
                        {ul.lists.map((li, index) => (
                          <ListItem key={index}>{li.title}</ListItem>
                        ))}
                      </List>
                    </div>
                  );
                })}
              </Dropdown>
            )}
          </NavItem>
        );
      })}
    </Navigation>
  );
};

export default Alphabet;
