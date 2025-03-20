import styled from "styled-components";

const HeaderStyles = styled.header`
  background-color: rgba(0, 0, 0, 0.3);
  height: 50px;
  box-shadow: none;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;

  > div {
    width: 35px;
  }

  a {
    font-size: 18px;
    color: #ffffff;
    font-weight: 500;
    text-decoration: none;
  }
`;

export { HeaderStyles };
