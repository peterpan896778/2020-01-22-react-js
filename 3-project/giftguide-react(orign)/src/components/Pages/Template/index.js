import React, { setState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { slide as Menu } from "react-burger-menu";

import Header from "../Header";
import Footer from "../Footer";
import "./Template.css";

class Template extends React.Component {
  constructor(props) {
    super(props);
    console.log("--- Template props ---");
    console.log(props);
    this.state = {
      sidebarOpen: false,
      siderbarStyle: { display: "none" }
    };
  }

  _isSidebarOpen = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="body" id="outer-container" onClick={this._isSidebarOpen}>
        <div style={this.state.siderbarStyle}>
          <Menu
            id="slide"
            right={true}
            width={280}
            isOpen={this.state.sidebarOpen}
            outerContainerId={"outer-container"}
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          >
            <div>sdfsdf\nsdfsdfsdf</div>
          </Menu>
        </div>

        <main id="page-wrap">
          <Header />
          <div className="page_wrapper">{this.props.children}</div>
          <Footer />
        </main>
      </div>
    );
  }
}

const actions = dispatch => bindActionCreators({}, dispatch);

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    loading: state.userReducer.authState
  };
}

export default connect(mapStateToProps, actions)(Template);

// const Template = props => {
//   const [sidebarOpen, setSidebarOpen] = setState(true);

//   const onSetSidebarOpen = open => {
//     setSidebarOpen(open);
//   };

//   return (
//     <div className="body">
//       <Sidebar
//         sidebar={<b>Sidebar content</b>}
//         open={sidebarOpen}
//         onSetOpen={onSetSidebarOpen}
//         styles={{ sidebar: { background: "white" } }}
//       >
//         <Header />
//         <div className="page_wrapper">{props.children}</div>
//         <Footer />
//       </Sidebar>
//     </div>
//   );

// };

// export default Template;
