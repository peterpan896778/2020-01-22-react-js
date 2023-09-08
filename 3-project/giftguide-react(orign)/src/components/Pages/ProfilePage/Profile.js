import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is Profile Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(Profile);
