import React, { useState } from "react";
import { TitleStyles } from "./title.styles";
import BlockImage from "../../components/Image";

const Title = () => {
  const [isIntersected, setIsIntersected] = useState(false);

  return (
    <TitleStyles>
      <div>
        <h1>Определитель декоративной бумаги в&nbsp;книжном переплёте</h1>
      </div>
      <BlockImage
        imageUrl="tild6432-6636-4635-b462-656638633431__--_7_944401-copy_1.jpg"
        isIntersected={isIntersected}
        setIsIntersected={setIsIntersected}
      />
    </TitleStyles>
  );
};

export default Title;
