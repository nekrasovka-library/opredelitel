import React, { useContext, useState } from "react";
import { AboutStyles, AboutType } from "./about.styles";
import Liner from "../../components/Liner";
import { RoundedButton } from "../../components/Button/button.styles";
import { OpredelitelContext } from "../../context";
import List from "./list";
import { Link } from "react-router-dom";

const About = () => {
  const { paperType, refMap } = useContext(OpredelitelContext);
  const [isListOpen, setListOpen] = useState(false);

  return (
    <AboutStyles>
      <Liner linerHeight={100} borderColor="#000000" />
      <div>
        <img
          src={
            paperType === 1
              ? `${process.env.REACT_APP_API_URL}/api/optimized-images/md/tild6364-6563-4639-b162-396464663162__-_5_943730_2.jpg`
              : `${process.env.REACT_APP_API_URL}/api/optimized-images/md/tild3132-3662-4638-a563-636234373366___.jpg`
          }
          alt=""
        />
      </div>
      <AboutType>
        {paperType === 1 && (
          <>
            <h3>Мраморная бумага</h3>
            <div>
              К&nbsp;этому типу относится декоративная бумага, узор которой
              создан мастером красками при помощи различных инструментов
              и&nbsp;приспособлений на&nbsp;поверхности воды (жидком грунте)
              и&nbsp;затем перенесён на&nbsp;лист бумаги. Такой отпечаток
              является уникальным.
            </div>
          </>
        )}
        {paperType === 2 && (
          <>
            <h3>Клейстерная бумага</h3>
            <div>
              <div>
                <em>
                  (клеевая бумага, пастовая бумага, carta a&nbsp;colla,
                  Kleisterpapier, papier&nbsp;à&nbsp;la&nbsp;colle,
                  papier&nbsp;à&nbsp;la&nbsp;pàte, paste paper)
                </em>
                <br />
                <br />
                К&nbsp;этому типу относится декоративная бумага, которая
                декорируется с&nbsp;помощью клейстера. Клейстер&nbsp;— это
                киселеобразная смесь или паста на&nbsp;мучной, крахмальной или
                целлюлозной основе. Метод декорирования состоит в&nbsp;том, что
                поверхность лис﻿та обычно полностью покрывается окрашенным
                клейстером, а&nbsp;затем при необходимости разными способами
                и&nbsp;инструментами выполняется дальнейший декор. Узоры
                создаются непосредственно на&nbsp;поверхности бумаги путём
                продавливания и&nbsp;перемещения этой окрашенной пасты.
                Клейстерная бумага бывает однотонной или многоцветной.
                Характерной чертой клейстерной бумаги является её&nbsp;всегда
                отчётливо узнаваемая текстура. Следует отличать клейстерную
                бумагу от&nbsp;бумаги с&nbsp;узором, напечатанным клейстерной
                краской. В&nbsp;последнем случае клейстер наносится
                на&nbsp;печатную форму, а&nbsp;не&nbsp;на лист.
                <br />
                <br />
                В&nbsp;XVIII&nbsp;веке в&nbsp;Европе была популярна гернгутская
                клейстерная бумага (Herrnhuter Kleisterpapier).
                Её&nbsp;изготавливала религиозная община в&nbsp;саксонском
                городе Гернгут (Herrnhut) в&nbsp;1764—1824&nbsp;годах.
                Характерный стиль мастерской&nbsp;— использование деревянных
                печатных форм, резных ролей, гребней в&nbsp;сочетании
                с&nbsp;ручной рисованной отделкой. Метод крашения бумаги был
                заимствован у&nbsp;мануфактур по&nbsp;производству печатного
                текстиля. Гернгутская бумага была чаще однотонной и&nbsp;реже
                многоцветной, изготавливалась с&nbsp;
                <Link to="/opredelitel/36" style={{ color: "rgb(0, 0, 0)" }}>
                  рисованным
                </Link>
                ,{" "}
                <Link to="/opredelitel/35" style={{ color: "rgb(0, 0, 0)" }}>
                  печатным
                </Link>{" "}
                и&nbsp;
                <Link to="/opredelitel/34" style={{ color: "rgb(0, 0, 0)" }}>
                  комбинированным
                </Link>{" "}
                узорами. Сочетание в&nbsp;узоре разных техник продемонстрировало
                высокое мастерство и&nbsp;изысканность клейстерной бумаги.
                Гернгутские мастерицы усовершенствовали и&nbsp;сделали более
                профессиональным это&nbsp;ремесло, привлекли к&nbsp;нему
                внимание общественности. Гернгутская клейстерная бумага стала
                так популярна, что&nbsp;к&nbsp;1800&nbsp;году стала почти
                синонимом клейстерной бумаги. Существуют более поздние
                подражания гернгутскому стилю.
              </div>
            </div>
          </>
        )}
      </AboutType>
      <RoundedButton
        ref={(el) => (refMap.current["alphabet_navigator"] = el)}
        onClick={() => setListOpen(!isListOpen)}
      >
        Алфавитный указатель
      </RoundedButton>
      {isListOpen && <List />}
    </AboutStyles>
  );
};

export default About;
