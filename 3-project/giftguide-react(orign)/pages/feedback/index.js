import React, { Component } from "react";
import { connect } from "react-redux";

class Feedback extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is Feedback Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(Feedback);
