import styled from "styled-components";

const ResumeStyles = styled.div`
  display: flex;
  padding: 60px 20px 75px;
  margin-top: 45px;
  border-top: 2px solid #000000;
  border-bottom: 2px solid #000000;
  background-color: #f2f1ed;

  > div {
    display: flex;
    gap: 40px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    > div {
      max-width: 360px;
      font-size: 14px;
      line-height: 1.55;
      font-weight: 400;
      text-align: left;

      a {
        color: #000000;
      }
    }
  }
`;

export { ResumeStyles };
