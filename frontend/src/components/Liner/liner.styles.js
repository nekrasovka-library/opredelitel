import styled from "styled-components";

const LinerStyles = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 2px solid ${({ borderColor }) => borderColor};

  > div {
    width: 2px;
    height: ${({ linerHeight }) => linerHeight}px;
    background-color: ${({ borderColor }) => borderColor};
  }
`;

export { LinerStyles };
