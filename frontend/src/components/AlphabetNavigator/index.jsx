import React, { useContext, useEffect, useState } from "react";
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
  const { lists, refMap } = useContext(OpredelitelContext);
  const isMobile = useIsMobile(640);
  const [data, setData] = useState({});
  const [hoveredLetter, setHoveredLetter] = useState(null); // Состояние для текущей буквы, на которую навели
  const [isANVisible, setIsANVisible] = useState(false);

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
    setData(groupedByLetter);
  }, [lists]);

  useEffect(() => {
    if (isMobile || !refMap.current["alphabet_navigator"]) return;

    const targetElement = refMap.current["alphabet_navigator"];

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
  }, [isMobile, refMap]);

  return (
    <Navigation isVisible={isANVisible}>
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
                    <div key={ul.id}>
                      <ItemTitle to={`/opredelitel/${ul.id}`}>
                        {ul.title}
                      </ItemTitle>
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
