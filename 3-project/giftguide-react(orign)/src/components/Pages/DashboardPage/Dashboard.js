import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Card from "./Card/Card";
import Banner from "./Banner/Banner";
import banner1 from "../../../assets/images/banner1.webp";
import banner2 from "../../../assets/images/banner2.webp";
import * as S from "./styled";
import "./Dashboard.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log("--- dashboard props ---");
    console.log(props);
  }
  render() {
    return (
      <React.Fragment>
        <S.Body data-testid="Dashboard">
          <S.Title>
            <div>SIMPLIFY GIFTING AND ENSURE DELIGHTED</div>
            <div>FACES ON SPECIAL OCCASIONS</div>
          </S.Title>
          <S.CardContainer>
            <Card title="CALENDAR" buttonTitle="ADD FRIENDS" />
            <Card title="WISH LIST" buttonTitle="ADD TO WISH LIST" />
            <Card title="REMINDERS" buttonTitle="SET UP REMINDERS" />
          </S.CardContainer>
          <S.BannerContainer>
            <Banner src={banner2} buttonTitle="GET STARTED" />
            <Banner src={banner1} buttonTitle="BROWSE GIFT IDEAS" />
          </S.BannerContainer>
        </S.Body>
      </React.Fragment>
    );
  }
}

const actions = dispatch => bindActionCreators({}, dispatch);

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    loading: state.userReducer.authState
  };
}

// export default Dashboard;
export default connect(mapStateToProps, actions)(Dashboard);
