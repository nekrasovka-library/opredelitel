import styled from "styled-components";

const BlockImages = styled.div`
  max-width: 1200px;
  height: 100%;
  width: 100%;

  > div {
    display: flex;
    gap: 15px;
    height: 100%;
    padding: 0 20px;

    > div {
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: zoom-in;
      max-height: 250px;

      img {
        display: block;
        height: 100%;
      }
    }
  }
`;

export { BlockImages };
