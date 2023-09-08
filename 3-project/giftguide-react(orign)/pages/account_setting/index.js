import React, { Component } from "react";
import { connect } from "react-redux";

class AccountSetting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is AccountSetting Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(AccountSetting);
