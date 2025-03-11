import React from "react";
import { ResumeStyles } from "./resume.styles";

const Resume = () => {
  return (
    <ResumeStyles>
      <div>
        Мы продолжаем работать над определителем и будем рады вашим замечаниям,
        вопросам и ссылкам на материалы. <br />
        Вы можете их прислать на почту{" "}
        <a href="mailto:biblioteka@nekrasovka.ru">biblioteka@nekrasovka.ru</a>
        <br />
        <br />
        Благодарим за помощь и вдохновение участников круглого стола и группу
        «Декоративная бумага в книжном переплёте»: Е. В. Белозёрову, М. Б.
        Золотову, Т. Г. Зудину, Л. В. Камбулову, Т. В. Кульматову, А. И.
        Маркову, Е. В. Мымрину, Е. С. Неботову, О. Б. Пономаренко, Н. Б.
        Субботину, В. А. Толстову, К. П. Яркову.
        <br />
        <br />
        Иллюстративный ряд определителя существенно дополнен образцами из фонда
        отдела редких книг и рукописей Научной библиотеки МГУ имени М. В.
        Ломоносова благодаря деятельному участию в проекте А. Л. Лифшица и В. Л.
        Мотылёвой.
        <br />
        <br />
        Куратор проекта: Екатерина Коршунова, главный библиотекарь отдела редких
        изданий и коллекций библиотеки им. Н. А. Некрасова. <br />
        Автор концепции: Анна Зайцева, независимый исследователь.
      </div>
    </ResumeStyles>
  );
};

export default Resume;
