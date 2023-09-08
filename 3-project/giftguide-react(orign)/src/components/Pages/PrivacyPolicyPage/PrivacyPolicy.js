import React, { Component } from "react";
import { connect } from "react-redux";

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is PrivacyPolicy Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(PrivacyPolicy);
