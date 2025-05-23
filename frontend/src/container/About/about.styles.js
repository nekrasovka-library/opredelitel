import styled from "styled-components";

const AboutStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 120px;

  > div {
    &:nth-child(2) {
      > img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }
  }
`;

const AboutType = styled.div`
  padding-bottom: 75px;
  text-align: center;

  * {
    color: #000000;
  }

  > h3 {
    line-height: 1.55;
    font-size: 40px;
  }

  > div {
    font-size: 18px;
    line-height: 1.35;
  }

  @media (min-width: 641px) {
    > h3 {
      font-size: 40px;
    }

    > div {
      max-width: 660px;
    }
  }

  @media (max-width: 640px) {
    > h3 {
      font-size: 52px;
    }

    > div {
      padding: 0 35px;
    }
  }
`;

const ListStyles = styled.div`
  display: flex;
  margin-top: 90px;
  font-size: 14px;

  > div {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    flex: 1;

    li,
    a {
      line-height: 1.6;
    }

    > div {
      a {
        cursor: pointer;
        color: #222222;
      }

      ul {
        margin: 0;
      }
    }
  }

  @media (min-width: 641px) {
    column-gap: 40px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    row-gap: 15px;
  }
`;

export { AboutStyles, AboutType, ListStyles };
