import React from "react";
import { DescriptionStyles, DescriptionText } from "./description.styles";
import { LinkButton } from "../../components/Button/button.styles";

const Description = () => {
  return (
    <DescriptionStyles>
      <DescriptionText>
        <div>
          Определитель декоративной бумаги&nbsp;— визуальный справочник,
          помогающий ориентироваться во&nbsp;множестве типов и&nbsp;узоров
          декоративных бумаг. <br />
          Они&nbsp;бесконечно разнообразны, система терминов, используемых для
          их&nbsp;обозначения, ещё не&nbsp;устоялась, а&nbsp;некоторые термины
          отсутствуют в&nbsp;русскоязычной традиции.
          <br />
          <br />
          Мы&nbsp;надеемся, что определитель будет полезен историкам
          и&nbsp;практикам книжного дела, художникам и&nbsp;всем, интересующимся
          декоративно-прикладным искусством.
          <br />
          <br />
          Мы&nbsp;планируем постепенно расширять определитель, вносить
          в&nbsp;него описания других типов и&nbsp;узоров декоративной бумаги
          и&nbsp;дополнять существующие описания.
        </div>
      </DescriptionText>
      <LinkButton
        onClick={() =>
          window.open("https://cloud.nekrasovka.ru/index.php/s/AQY9Bvaehhf6Khv")
        }
      >
        cписок источников
      </LinkButton>
    </DescriptionStyles>
  );
};

export default Description;
