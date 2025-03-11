import React, { useContext, useState } from "react";
import { AboutStyles, AboutType } from "./about.styles";
import Liner from "../../components/Liner";
import { RoundedButton } from "../../components/Button/button.styles";
import { OpredelitelContext } from "../../context";
import List from "./list";

const About = () => {
  const { paperType } = useContext(OpredelitelContext);
  const [isListOpen, setListOpen] = useState(false);

  return (
    <AboutStyles>
      <Liner linerHeight={100} borderColor="#000000" />
      <div>
        <img
          src={
            paperType === 1
              ? `${process.env.REACT_APP_API_URL}/api/optimized-images/tild6364-6563-4639-b162-396464663162__-_5_943730_2.jpg`
              : `${process.env.REACT_APP_API_URL}/api/optimized-images/tild3132-3662-4638-a563-636234373366___.jpg`
          }
          alt=""
        />
      </div>
      <AboutType>
        {paperType === 1 && (
          <>
            <h3>Мраморная бумага</h3>
            <div>
              <span>
                К этому типу относится декоративная бумага, узор которой создан
                мастером красками при помощи различных инструментов и
                приспособлений на поверхности воды (жидком грунте) и затем
                перенесён на лист бумаги. Такой отпечаток является уникальным.
              </span>
            </div>
          </>
        )}
        {paperType === 2 && (
          <>
            <h3>Клейстерная бумага</h3>
            <div>
              <em>
                (клеевая бумага, пастовая бумага, carta a colla, Kleisterpapier,
                papier à la colle, papier à la pàte, paste paper)
              </em>
              <span>
                К этому типу относится декоративная бумага, которая декорируется
                с помощью клейстера. Клейстер — это киселеобразная смесь или
                паста на мучной, крахмальной или целлюлозной основе. Метод
                декорирования состоит в том, что поверхность лис﻿та обычно
                полностью покрывается окрашенным клейстером, а затем при
                необходимости разными способами и инструментами выполняется
                дальнейший декор. Узоры создаются непосредственно на поверхности
                бумаги путём продавливания и перемещения этой окрашенной пасты.
                Клейстерная бумага бывает однотонной или многоцветной.
                Характерной чертой клейстерной бумаги является её всегда
                отчётливо узнаваемая текстура. Следует отличать клейстерную
                бумагу от бумаги с узором, напечатанным клейстерной краской. В
                последнем случае клейстер наносится на печатную форму, а не на
                лист.
              </span>
              <span>
                В XVIII веке в Европе была популярна гернгутская клейстерная
                бумага (Herrnhuter Kleisterpapier). Её изготавливала религиозная
                община в саксонском городе Гернгут (Herrnhut) в 1764—1824 годах.
                Характерный стиль мастерской — использование деревянных печатных
                форм, резных ролей, гребней в сочетании с ручной рисованной
                отделкой. Метод крашения бумаги был заимствован у мануфактур по
                производству печатного текстиля. Гернгутская бумага была чаще
                однотонной и реже многоцветной, изготавливалась с рисованным,
                печатным и комбинированным узорами. Сочетание в узоре разных
                техник продемонстрировало высокое мастерство и изысканность
                клейстерной бумаги. Гернгутские мастерицы усовершенствовали и
                сделали более профессиональным это ремесло, привлекли к нему
                внимание общественности. Гернгутская клейстерная бумага стала
                так популярна, что к 1800 году стала почти синонимом клейстерной
                бумаги. Существуют более поздние подражания гернгутскому стилю.
              </span>
            </div>
          </>
        )}
      </AboutType>
      <RoundedButton
        id="alphabet_navigator"
        onClick={() => setListOpen(!isListOpen)}
      >
        Алфавитный указатель
      </RoundedButton>
      {isListOpen && <List />}
    </AboutStyles>
  );
};

export default About;
