import styled from "styled-components";

const ResumeStyles = styled.div`
  display: flex;
  padding: 70px 20px;
  margin-top: 45px;
  border-top: 2px solid #000000;
  border-bottom: 2px solid #000000;
  background-color: #f2f1ed;

  > div {
    display: flex;
    flex-direction: column;
    text-align: center;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    a {
      color: rgb(0, 0, 0);
      box-shadow: none;
    }
  }
`;

export { ResumeStyles };
