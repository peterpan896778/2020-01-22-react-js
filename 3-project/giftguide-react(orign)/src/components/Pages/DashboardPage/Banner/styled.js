import styled from "styled-components";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 500px;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const BannerImage = styled.img.attrs(props => ({
  alt: "banner",
  src: props.src
}))`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: ${props => (props.border ? 1 : 0)}px solid;
`;

export const ButtonWhite = styled.button.attrs(props => ({
  type: "button"
}))`
  position: absolute;
  bottom: 50px;
  width: 300px;
  height: 40px;
  border: 0;
  background: white;
  color: black;
  font-size: 15px;
  :hover {
    background-color: #666;
    color: white;
  }
  border: ${props => (props.border ? 1 : 0)}px solid;
`;
