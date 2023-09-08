import React, { Component } from "react";
import { connect } from "react-redux";

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is Calendar Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(Calendar);
