import React, { Component } from "react";
import { connect } from "react-redux";

class AddWishItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is AddWishItem Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(AddWishItem);
