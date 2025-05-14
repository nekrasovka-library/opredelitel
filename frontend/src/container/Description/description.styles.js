import styled from "styled-components";

const DescriptionStyles = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 60px;
  align-items: center;
  width: 100%;
  border-bottom-color: #00000024;
  border-width: 2px;
  border-bottom-style: solid;
  background-color: #f2f1ed;

  @media (min-width: 641px) {
    padding: 82px 0;
  }

  @media (max-width: 640px) {
    padding: 48px 0;
  }
`;

const DescriptionText = styled.div`
  > div {
    line-height: 31px;
    color: #000000;
    font-size: 22px;
    font-weight: 400;
    text-align: center;
  }

  @media (min-width: 641px) {
    width: 960px;
  }

  @media (max-width: 640px) {
    padding: 0 65px;
  }
`;

export { DescriptionStyles, DescriptionText };
