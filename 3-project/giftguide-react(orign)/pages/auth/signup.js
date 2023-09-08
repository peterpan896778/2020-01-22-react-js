import React, { Component } from "react";
import { connect } from "react-redux";

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is SignUp Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(SignUp);
