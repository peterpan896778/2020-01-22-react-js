import React, { Component } from "react";
import { connect } from "react-redux";

class Contact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is Contact Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(Contact);
