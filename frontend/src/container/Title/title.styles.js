import styled from "styled-components";
import Image from "../../components/Image";

const TitleImage = styled(Image)`
  > div {
    position: absolute;
    > div {
      position: fixed;
    }
  }
`;

const TitleStyles = styled.div`
  position: relative;
  width: 100%;
  border-top: 2px solid #000000;
  border-bottom: 2px solid #000000;

  > h1 {
    color: #000000;
    font-weight: 400;
    text-align: center;
  }

  > div {
    &:nth-child(1) {
      position: absolute;
      z-index: 11;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      h1 {
        text-align: center;
        font-weight: 400;
      }
    }

    &:nth-child(2) {
      height: 100%;
    }
  }

  @media (min-width: 641px) {
    height: 335px;
    margin-top: 70px;

    > div {
      &:nth-child(1) {
        h1 {
          width: 665px;
          font-size: 60px;
          line-height: 60px;
        }
      }
    }
  }

  @media (max-width: 640px) {
    height: 215px;
    margin-top: 60px;

    > div {
      &:nth-child(1) {
        h1 {
          width: 285px;
          font-size: 30px;
          line-height: 30px;
        }
      }
    }
  }
`;

export { TitleStyles, TitleImage };
