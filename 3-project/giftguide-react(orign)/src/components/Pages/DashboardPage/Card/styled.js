import styled from "styled-components";

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Title = styled.div`
  font-size: 20px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Button = styled.button.attrs(props => ({
  type: "button"
}))`
  width: 50%;
  height: 40px;
  font-size: 15px;
  background-color: #333333;
  color: white;
  :hover {
    background-color: #666666;
    color: white;
  }
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 15px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const DescriptionContent = styled.div`
  font-size: 15px;
  text-align: center;
  padding-bottom: 15px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;
