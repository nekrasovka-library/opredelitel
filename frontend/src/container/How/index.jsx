import React, { useContext, useState } from "react";
import { HowButtons, HowDescription, HowStyles } from "./how.styles";
import { RectangularButton } from "../../components/Button/button.styles";
import { useIsMobile } from "../../helpers";
import { OpredelitelContext } from "../../context";
import { useNavigate } from "react-router-dom";

const How = () => {
  const [isClosed, setIsClosed] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const isMobile = useIsMobile(640);
  const { paperType, setPaperType, fetchData } = useContext(OpredelitelContext);
  const navigate = useNavigate();

  const handleButton = (id) => {
    navigate(`/opredelitel/`);
    fetchData(id);
    setPaperType(id);
    if (isMobile) {
      setIsShow((prevState) => !prevState);
    }
  };

  return (
    <HowStyles>
      <div>
        <h3 onClick={() => setIsClosed(!isClosed)}>Как устроен определитель</h3>
      </div>
      {!isClosed && (
        <HowDescription>
          <div>
            &nbsp;Материалы в&nbsp;определителе сгруппированы по&nbsp;типам
            бумаги, внутри типов названия узоров размещены по&nbsp;алфавиту.
            <br /> Для&nbsp;каждого узора мы&nbsp;привели основную иллюстрацию,
            главный термин и&nbsp;краткую характеристику. По&nbsp;возможности
            приведены дополнительные иллюстрации. Для&nbsp;большинства узоров
            приведены также дополнительные термины.
            <br />
            <br /> Основная иллюстрация представляет узор в&nbsp;его стандартном
            виде, а&nbsp;дополнительные иллюстрации представляют различные
            варианты исполнения узора.
            <br /> Главный термин&nbsp;— название узора, используемое
            в&nbsp;каталоге
            библиотеки&nbsp;имени&nbsp;Н.&nbsp;А.&nbsp;Некрасова.
            <br /> Дополнительные термины&nbsp;— названия узора, используемые
            в&nbsp;книговедческих публикациях и&nbsp;интернет-ресурсах,
            а&nbsp;также среди художников, переплётчиков, реставраторов
            и&nbsp;антикваров, в&nbsp;том числе на&nbsp;английском,
            немецком&nbsp;и&nbsp;французском&nbsp;языках.
            <br /> Краткая характеристика узора содержит указания
            на&nbsp;те&nbsp;черты, по&nbsp;которым его легко узнать или отличить
            от&nbsp;других похожих узоров. При необходимости к&nbsp;словесным
            описаниям добавлены указания на&nbsp;период бытования
            и&nbsp;технические приёмы&nbsp;создания&nbsp;узора.
            <br />
          </div>
        </HowDescription>
      )}
      <HowButtons $active={paperType} $isShow={isShow}>
        <RectangularButton
          $isActive={paperType === 1}
          $borderColor="#000000"
          onClick={() => handleButton(1)}
        >
          Мраморная бумага
        </RectangularButton>
        <RectangularButton
          $isActive={paperType === 2}
          $borderColor="#000000"
          onClick={() => handleButton(2)}
        >
          Клейстерная бумага
        </RectangularButton>
      </HowButtons>
    </HowStyles>
  );
};

export default How;
