import React from "react";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, FormControl } from "react-bootstrap";

import * as S from "./styled";
import logo from "../../../assets/images/Logo.webp";
import searchIcon from "../../../assets/images/search-icon.webp";
import avatarImg from "../../../assets/images/avatar.webp";

import "./Header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchInputVisible: false
    };
  }

  _toggleSearch = e => {
    e.preventDefault();
    this.setState({
      isSearchInputVisible: this.state.isSearchInputVisible ? false : true
    });
  };

  _handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.history.push("/search");
    }
  };

  render() {
    return (
      <React.Fragment>
        <S.Body data-testid="Header">
          <S.Topbar>
            <S.Logo>
              <img src={logo} alt="logo" />
              <S.LogoText>THE GIFT GUIDE</S.LogoText>
            </S.Logo>
            <S.Avatar>
              <S.SearchInput
                visible={this.state.isSearchInputVisible ? "ture" : "false"}
              >
                <FormControl
                  type="text"
                  placeholder="Search"
                  onKeyDown={this._handleKeyDown}
                />
              </S.SearchInput>
              <img src={searchIcon} alt="search" onClick={this._toggleSearch} />
              <S.Plus>+</S.Plus>
              <S.AvatarImg src={avatarImg} alt="avatar" />
            </S.Avatar>
          </S.Topbar>
          <div className="nab-bar">
            <Navbar bg="light" expand="lg" className="nab-bar-bar">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="nab-bar-link">
                <Nav className="mr-auto">
                  <Nav.Link href="/dashboard" className="nab-link">
                    DASHBOARD
                  </Nav.Link>
                  <Nav.Link href="/wish_list" className="nab-link">
                    WISH LIST
                  </Nav.Link>
                  <Nav.Link href="/friends" className="nab-link">
                    FRIENDS
                  </Nav.Link>
                  <Nav.Link href="/calendar" className="nab-link">
                    CALENDAR
                  </Nav.Link>
                  <Nav.Link href="/gift_guides" className="nab-link">
                    GIFT GUIDES
                  </Nav.Link>
                  <Nav.Link href="/blog" className="nab-link">
                    BLOG
                  </Nav.Link>
                  <Nav.Link href="/contact" className="nab-link">
                    CONTACT
                  </Nav.Link>
                  <Nav.Link href="/about" className="nab-link">
                    ABOUT
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </S.Body>
      </React.Fragment>
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

export default withRouter(Header);
// export default connect(null, actions)(Header);
