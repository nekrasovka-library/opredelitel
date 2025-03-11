import React from "react";
import { TitleStyles, TitleImage } from "./title.styles";

const Title = () => {
  return (
    <TitleStyles>
      <div>
        <h1>Определитель декоративной бумаги в книжном переплёте</h1>
      </div>
      <TitleImage
        imageUrl={`${process.env.REACT_APP_API_URL}/images/tild6432-6636-4635-b462-656638633431__--_7_944401-copy_1.jpg`}
      />
    </TitleStyles>
  );
};

export default Title;
