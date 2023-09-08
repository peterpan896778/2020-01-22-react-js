import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is About Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(About);
