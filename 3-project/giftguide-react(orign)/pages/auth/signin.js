import React, { Component } from "react";
import { connect } from "react-redux";

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is SignIn Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(SignIn);
