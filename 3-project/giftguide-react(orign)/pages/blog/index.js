import React, { Component } from "react";
import { connect } from "react-redux";

class Blog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is Blog Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(Blog);
