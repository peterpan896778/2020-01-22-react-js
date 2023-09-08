import React, { Component } from "react";
import { connect } from "react-redux";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div>This is Search Page</div>
      </React.Fragment>
    );
  }
}

export default connect()(Search);
