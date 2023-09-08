import styled from "styled-components";

export const Body = styled.div`
  padding-top: 50px;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
  padding-bottom: 10px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Socail = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  align-items: center;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Title = styled.div`
  font-size: 20px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const SocialIcon = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Icon = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const SiteLink = styled.div`
  padding-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Link = styled.div`
  color: black;
  font-size: 15px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const InviteContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 15px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const SubTitle = styled.div`
  font-size: 15px;
  padding-top: 10px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Input = styled.div`
  padding: 0px;
  width: 70%;
  height: 40px;
  border: 1px solid;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Button = styled.button.attrs(props => ({
  type: "button"
}))`
  width: 30%;
  height: 40px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #333333;
  color: white;
  :hover {
    background-color: #666666;
    color: white;
  }
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const Copyright = styled.div`
  font-size: 20px;
  padding-top: 20px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;
