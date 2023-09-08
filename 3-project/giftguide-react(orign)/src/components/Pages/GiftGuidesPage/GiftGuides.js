import React, { Component } from "react";
import { connect } from "react-redux";

class GiftGuides extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is GiftGuides Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(GiftGuides);
