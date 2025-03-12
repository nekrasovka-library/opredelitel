import styled from "styled-components";

const ImageStyles = styled.div`
  width: 100%;
  position: relative;

  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    clip-path: inset(0 0 0 0);
    z-index: 1;
    background-image: ${({ imageUrl }) => imageUrl};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    > div {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      ${({ isIntersected }) =>
        isIntersected
          ? "position: fixed; top: 0; left: 0;"
          : "position: initial"};
    }
  }

  @media (min-width: 641px) {
    height: 200px;
  }

  @media (max-width: 640px) {
    height: 100px;
  }
`;

export { ImageStyles };
