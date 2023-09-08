import React, { Component } from "react";
import { Image, Button } from "react-bootstrap";
import "./Banner.scss";
import * as S from "./styled";

const Banner = props => {
  return (
    <React.Fragment>
      <S.Body data-testid="Banner">
        <S.BannerImage src={props.src} />
        <S.ButtonWhite type="button">{props.buttonTitle}</S.ButtonWhite>
      </S.Body>
    </React.Fragment>
  );
};

export default Banner;
