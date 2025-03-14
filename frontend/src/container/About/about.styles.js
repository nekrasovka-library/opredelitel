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

  @media (min-width: 641px) {
    > div {
      &:nth-child(2) {
        > img {
          margin-top: 90px;
        }
      }
    }
  }

  @media (max-width: 640px) {
    > div {
      &:nth-child(2) {
        > img {
          margin-top: 40px;
        }
      }
    }
  }
`;

const AboutType = styled.div`
  padding-bottom: 75px;
  text-align: center;

  h3,
  span,
  em {
    font-weight: 400;
    color: #000000;
  }

  span,
  em {
    font-size: 18px;
    line-height: 1.35;
  }

  > h3 {
    line-height: 1.55;
    font-size: 40px;
  }

  > div {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    span {
      display: block;
      margin: 0;
    }
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
  text-decoration: underline;
  margin-top: 90px;

  > div {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    flex: 1;

    > div {
      cursor: pointer;

      ul {
        margin: 0;
      }
    }
  }

  @media (min-width: 641px) {
    column-gap: 40px;
    max-height: 1200px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    row-gap: 15px;
  }
`;

export { AboutStyles, AboutType, ListStyles };
