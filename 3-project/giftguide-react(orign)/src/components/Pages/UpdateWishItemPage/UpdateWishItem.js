import React, { Component } from "react";
import { connect } from "react-redux";

class UpdateWishItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is UpdateWishItem Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(UpdateWishItem);
