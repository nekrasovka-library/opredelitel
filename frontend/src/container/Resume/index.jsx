import React from "react";
import { ResumeStyles } from "./resume.styles";

const Resume = () => {
  return (
    <ResumeStyles>
      <div>
        <div>
          Мы&nbsp;продолжаем работать над определителем и&nbsp;будем рады вашим
          замечаниям, вопросам и&nbsp;ссылкам на&nbsp;материалы. <br />
          Вы&nbsp;можете их&nbsp;прислать на&nbsp;почту{" "}
          <a
            href="mailto:biblioteka@nekrasovka.ru"
            style={{
              color: "rgb(0, 0, 0)",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              boxShadow: "none",
              textDecoration: "none",
            }}
          >
            biblioteka@nekrasovka.ru
          </a>
          . <br />
          <br />
          Благодарим за&nbsp;помощь и&nbsp;вдохновение участников круглого стола
          и&nbsp;группу «Декоративная бумага в&nbsp;книжном переплёте»:
          Е.&nbsp;В.&nbsp;Белозёрову, М.&nbsp;Б.&nbsp;Золотову,
          Т.&nbsp;Г.&nbsp;Зудину, Л.&nbsp;В.&nbsp;Камбулову,
          Т.&nbsp;В.&nbsp;Кульматову, А.&nbsp;И.&nbsp;Маркову,
          Е.&nbsp;В.&nbsp;Мымрину, Е.&nbsp;С.&nbsp;Неботову,
          О.&nbsp;Б.&nbsp;Пономаренко,<strong> </strong>
          Н.&nbsp;Б.&nbsp;Субботину, В.&nbsp;А.&nbsp;Толстову,
          К.&nbsp;П.&nbsp;Яркову. <br />
          <br />
          Иллюстративный ряд определителя существенно дополнен образцами
          из&nbsp;фонда отдела редких книг и&nbsp;рукописей Научной библиотеки
          МГУ&nbsp;имени&nbsp;М.&nbsp;В.&nbsp;Ломоносова благодаря деятельному
          участию в&nbsp;проекте А.&nbsp;Л.&nbsp;Лифшица и
          В.&nbsp;Л.&nbsp;Мотылёвой. <br />
          <br />
          Куратор проекта: Екатерина&nbsp;Коршунова, главный библиотекарь отдела
          редких изданий и&nbsp;коллекций библиотеки
          им.&nbsp;Н.&nbsp;А.&nbsp;Некрасова. <br />
          Автор концепции: Анна&nbsp;Зайцева, независимый исследователь.
        </div>
      </div>
    </ResumeStyles>
  );
};

export default Resume;
