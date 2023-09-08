import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { FormControl, Form, Button, Row, Col } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import * as socialLink from "./social_link";

import * as S from "./styled";
import "./Footer.scss";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  _onClickSocialHandler = type => {
    window.open(type);
  };

  render() {
    return (
      <footer>
        <React.Fragment>
          <S.Body data-testid="Footer">
            <S.Socail>
              <S.Title>CONNECT WITH GIFT GUIDE</S.Title>
              <S.SocialIcon>
                <S.Icon>
                  <Link
                    to=""
                    onClick={e => {
                      e.preventDefault();
                      this._onClickSocialHandler(socialLink.PINTEREST_LINK);
                    }}
                  >
                    <img src={socialLink.PINTEREST_ICON} />
                  </Link>
                </S.Icon>
                <S.Icon>
                  <Link
                    to=""
                    onClick={e => {
                      e.preventDefault();
                      this._onClickSocialHandler(socialLink.INSTAGRAM_LINK);
                    }}
                  >
                    <img src={socialLink.INSTAGRAM_ICON} />
                  </Link>
                </S.Icon>
                <S.Icon>
                  <Link
                    to=""
                    onClick={e => {
                      e.preventDefault();
                      this._onClickSocialHandler(socialLink.FACEBOOK_LINK);
                    }}
                  >
                    <img src={socialLink.FACEBOOK_ICON} />
                  </Link>
                </S.Icon>
                <S.Icon>
                  <Link
                    to=""
                    onClick={e => {
                      e.preventDefault();
                      this._onClickSocialHandler(socialLink.TWITTER_LINK);
                    }}
                  >
                    <img src={socialLink.TWITTER_ICON} />
                  </Link>
                </S.Icon>
              </S.SocialIcon>
              <S.SiteLink>
                <Link to="/contact">
                  <S.Link>CONTACT US</S.Link>
                </Link>
                <Link to="/contact">
                  <S.Link>TEAMS OF USE / PRIVACY</S.Link>
                </Link>
                <Link to="/feedback">
                  <S.Link>FEEDBACK</S.Link>
                </Link>
              </S.SiteLink>
            </S.Socail>
            <S.InviteContainer>
              <S.Title>INVITE FRIENDS TO GIFT GUIDE</S.Title>
              <S.SubTitle>enter your loved one's email to invite</S.SubTitle>
              <S.Form>
                <S.Input>
                  <FormControl type="text" onKeyDown={this._handleKeyDown} />
                </S.Input>
                <S.Button>INVITE</S.Button>
              </S.Form>
              <S.Copyright>2019 TM GIFT GUIDE LLC</S.Copyright>
            </S.InviteContainer>
          </S.Body>
        </React.Fragment>
      </footer>
    );
  }
}

const actions = dispatch => bindActionCreators({}, dispatch);

function mapStateToProps(state) {
  // return {
  //   user: state.userReducer.user.user,
  //   banner: state.bannerReducer.banner,
  // };
}

export default Footer;
// export default connect(null, actions)(Footer);
