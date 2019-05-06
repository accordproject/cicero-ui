import styled from 'styled-components';

const TextBlock = styled.div`
  position: relative;
  right: -10px;
  margin: 2px auto;
  padding: 10px 20px;
  width: 600px;
  max-width: 600px;
  text-align: left;
  line-height: 1.6em;
  box-sizing: border-box;
  border-radius: 3px;
  border: 1px solid #fff;
  @media (max-width: 1150px) {
    right: -30px;
  }
`;

export default TextBlock;
