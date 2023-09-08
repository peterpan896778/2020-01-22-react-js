import React, { Component } from "react";
import { connect } from "react-redux";

class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is Account Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(Account);
