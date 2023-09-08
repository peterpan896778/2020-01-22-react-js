import styled from "styled-components";

export const Body = styled.div`
  padding-top: 40px;
  padding-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 30px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const BannerContainer = styled.div`
  width: 100%;
  padding: 0px;
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;
