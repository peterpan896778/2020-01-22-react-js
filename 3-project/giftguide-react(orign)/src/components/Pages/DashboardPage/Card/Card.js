import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Card.scss";
import * as S from "./styled";

const Card = props => {
  // const classes = useStyles();
  let description;
  switch (props.title) {
    case "CALENDAR":
      description = [
        <S.DescriptionContent>
          gift guide creates a customized
        </S.DescriptionContent>,
        <S.DescriptionContent>
          calendar for you with all your loved
        </S.DescriptionContent>,
        <S.DescriptionContent>
          one's most important dates, in one
        </S.DescriptionContent>,
        <S.DescriptionContent>easy location</S.DescriptionContent>
      ];
      break;
    case "WISH LIST":
      description = [
        <S.DescriptionContent>
          gift guide users set up profiles
        </S.DescriptionContent>,
        <S.DescriptionContent>
          containing their favorite stores, wish
        </S.DescriptionContent>,
        <S.DescriptionContent>
          lists and items they love, so you no
        </S.DescriptionContent>,
        <S.DescriptionContent>
          longer have to ask for ideas or sizes
        </S.DescriptionContent>
      ];
      break;
    case "REMINDERS":
      description = [
        <S.DescriptionContent>
          gift guide sends you reminders before
        </S.DescriptionContent>,
        <S.DescriptionContent>
          your loved ones' events with their
        </S.DescriptionContent>,
        <S.DescriptionContent>
          wish lists and favorite stores so you
        </S.DescriptionContent>,
        <S.DescriptionContent>
          never miss an important date again
        </S.DescriptionContent>
      ];
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <S.Body data-testid="Card">
        <S.Title>{props.title}</S.Title>
        <S.DescriptionContainer>{description}</S.DescriptionContainer>
        <S.Button> {props.buttonTitle} </S.Button>
      </S.Body>
    </React.Fragment>
  );
};

export default Card;
