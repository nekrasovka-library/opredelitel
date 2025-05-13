import styled from "styled-components";

const HowStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f2f1ed;

  > div {
    &:first-child {
      padding-top: 75px;
      padding-bottom: 45px;

      button {
        font-size: 26px;
        border-width: 1px;
        height: 80px;
        padding-left: 80px;
        padding-right: 80px;
      }
    }
  }
`;

const HowButtons = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;

  @media (min-width: 641px) {
    width: 560px;

    button {
      white-space: nowrap;
      padding: 0 14px;
      font-size: 20px;
      width: 50%;

      &:nth-child(1) {
        border-right: none;
      }

      &:nth-child(2) {
        border-left: none;
      }
    }
  }

  @media (max-width: 640px) {
    position: relative;
    width: 100%;

    button {
      height: 52px;
      padding: 16px 20px;
      font-size: 16px;
      width: calc(100% - 40px);

      &:nth-child(${({ $active }) => $active}) {
        z-index: 1;
      }

      &:nth-child(${({ $active }) => ($active === 1 ? 2 : 1)}) {
        position: absolute;
        z-index: 0;

        ${({ $isShow }) =>
          $isShow
            ? "transform: translateY(52px); transition: transform 0.2s ease;"
            : "visibility: hidden;"}
      }
    }
  }
`;

const HowDescription = styled.div`
  text-align: center;
  padding-bottom: 60px;

  > div {
    font-size: 18px;
    color: #000000;
  }

  @media (min-width: 641px) {
    max-width: 760px;

    > div {
      line-height: 1.55;
    }
  }

  @media (max-width: 640px) {
    padding-right: 20px;
    padding-left: 20px;

    > div {
      line-height: 1.45;
    }
  }
`;

export { HowStyles, HowDescription, HowButtons };
