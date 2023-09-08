import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "../../components/card";
import Banner from "../../components/banner";
import banner1 from "../../assets/images/banner1.webp";
import banner2 from "../../assets/images/banner2.webp";
import "../../styles/pages/dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="dashboard-body">
          <div className="dashbord-title">
            <div>SIMPLIFY GIFTING AND ENSURE DELIGHTED</div>
            <div>FACES ON SPECIAL OCCASIONS</div>
          </div>
          <div className="dashboard-card">
            <Card title="CALENDAR" buttonTitle="ADD FRIENDS" />
            <Card title="WISH LIST" buttonTitle="ADD TO WISH LIST" />
            <Card title="REMINDERS" buttonTitle="SET UP REMINDERS" />
          </div>
        </div>
        <div className="dashboard-banner">
          <Banner src={banner2} buttonTitle="GET STARTED" />
          <Banner src={banner1} buttonTitle="BROWSE GIFT IDEAS" />
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(Dashboard);
