import React, { Component } from "react";
import { connect } from "react-redux";

class Friends extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is Friends Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(Friends);
