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

    > div {
      position: ${({ isVisible }) => (isVisible ? "fixed" : "initial")};
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: ${({ imageUrl }) => imageUrl};
      transform: translateZ(0);
      will-change: transform;
      pointer-events: none;

      top: 0;
      left: 0;
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
