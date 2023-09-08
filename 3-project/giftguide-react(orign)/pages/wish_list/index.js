import React, { Component } from "react";
import { connect } from "react-redux";

class WishList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is WishList Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(WishList);
