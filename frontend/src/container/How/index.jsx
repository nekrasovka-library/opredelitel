import React, { useContext, useState } from "react";
import { HowButtons, HowDescription, HowStyles } from "./how.styles";
import { RectangularButton } from "../../components/Button/button.styles";
import { useIsMobile } from "../../helpers";
import { OpredelitelContext } from "../../context";

const How = () => {
  const [isClosed, setIsClosed] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const isMobile = useIsMobile(640);
  const { paperType, setPaperType } = useContext(OpredelitelContext);

  const handleButton = (id) => {
    setPaperType(id);
    isMobile && setIsShow(!isShow);
  };

  return (
    <HowStyles>
      <div>
        <h3 onClick={() => setIsClosed(!isClosed)}>Как устроен определитель</h3>
      </div>
      {!isClosed && (
        <HowDescription>
          <span>
            Материалы в определителе сгруппированы по типам бумаги, внутри типов
            названия узоров размещены по алфавиту. Для каждого узора мы привели
            основную иллюстрацию, главный термин и краткую характеристику. По
            возможности приведены дополнительные иллюстрации. Для большинства
            узоров приведены также дополнительные термины.
          </span>
          <span>
            Основная иллюстрация представляет узор в его стандартном виде, а
            дополнительные иллюстрации представляют различные варианты
            исполнения узора. Главный термин — название узора, используемое в
            каталоге библиотеки имени Н. А. Некрасова. Дополнительные термины —
            названия узора, используемые в книговедческих публикациях и
            интернет-ресурсах, а также среди художников, переплётчиков,
            реставраторов и антикваров, в том числе на английском, немецком и
            французском языках. Краткая характеристика узора содержит указания
            на те черты, по которым его легко узнать или отличить от других
            похожих узоров. При необходимости к словесным описаниям добавлены
            указания на период бытования и технические приёмы создания узора.
          </span>
        </HowDescription>
      )}
      <HowButtons active={paperType} isShow={isShow}>
        <RectangularButton
          isActive={paperType === 1}
          onClick={() => handleButton(1)}
          borderColor="#000000"
        >
          Мраморная бумага
        </RectangularButton>
        <RectangularButton
          isActive={paperType === 2}
          onClick={() => handleButton(2)}
          borderColor="#000000"
        >
          Клейстерная бумага
        </RectangularButton>
      </HowButtons>
    </HowStyles>
  );
};

export default How;
