import React, { Component } from "react";
import { connect } from "react-redux";

class PrivayPolicy extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is GifGuides Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(PrivayPolicy);
