import React, { Component, lazy, Suspense } from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loadable from "react-loadable";

// import { history } from "./../../stores";
import * as routes from "../../constants/routes";
import "./App.css";

import PageFactory from "../Pages/PageFactory";

// import DashboardPage from "../Pages/DashboardPage";
import AboutPage from "../Pages/AboutPage";
import AccountPage from "../Pages/AccountPage";
import AccountSettingPage from "../Pages/AccountSettingPage";
import UpdateWishItemPage from "../Pages/UpdateWishItemPage";
import BlogPage from "../Pages/BlogPage";
import CalendarPage from "../Pages/CalendarPage";
import FeedbackPage from "../Pages/FeedbackPage";
import FriendsPage from "../Pages/FriendsPage";
import GiftGuidesPage from "../Pages/GiftGuidesPage";
import PrivacyPolicyPage from "../Pages/PrivacyPolicyPage";
import ProfilePage from "../Pages/ProfilePage";
import SearchPage from "../Pages/SearchPage";
import WishListPage from "../Pages/WishListPage";
import ContactPage from "../Pages/ContactPage";
import delay from "delay";
const loading = () => <div>Loading</div>;

// All layouts/containers
const DashboardPage = Loadable({
  loader: async () => {
    return import("../Pages/DashboardPage");
  },
  // render(loaded, props) {
  //   let Component = loaded.default;
  //   return <Component {...props} />;
  // },
  loading
});

class App extends Component {
  constructor(props) {
    super(props);
    console.log("======= app.js props =================");
    console.log(props);
  }

  componentWillMount() {
    console.log("======= this is willmount of app =========");
  }

  render() {
    const DashboardPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <Suspense fallback={loading()}>
          <DashboardPage />
        </Suspense>
      </PageFactory>
    );
    const AboutPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <AboutPage />
      </PageFactory>
    );
    const AccountPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <AccountPage />
      </PageFactory>
    );
    const AccountSettingPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <AccountSettingPage />
      </PageFactory>
    );
    const UpdateWishItemPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <UpdateWishItemPage />
      </PageFactory>
    );
    const BlogPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <BlogPage />
      </PageFactory>
    );
    const CalendarPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <CalendarPage />
      </PageFactory>
    );
    const FeedbackPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <FeedbackPage />
      </PageFactory>
    );
    const FriendsPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <FriendsPage />
      </PageFactory>
    );
    const WishListPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <WishListPage />
      </PageFactory>
    );
    const SearchPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <SearchPage />
      </PageFactory>
    );
    const ProfilePageAugmented = () => (
      <PageFactory user={this.props.user}>
        <ProfilePage />
      </PageFactory>
    );
    const GiftGuidesPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <GiftGuidesPage />
      </PageFactory>
    );
    const PrivacyPolicyPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <PrivacyPolicyPage />
      </PageFactory>
    );
    const ContactPageAugmented = () => (
      <PageFactory user={this.props.user}>
        <ContactPage />
      </PageFactory>
    );
    // prettier-ignore
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className="app">
            {
              // (status === 'lapsed' || status === 'inactive' || status === '7day_expire') && this.props.location !== routes.ACCOUNT_PAYMENTS &&
              // this.props.location !== routes.ACCOUNT_PROFILE && this.props.location !== routes.ACCOUNT_PASSWORD ? (
              //   <Redirect to={routes.ACCOUNT_PAYMENTS} />
              // ) : null
            }
            <Switch>
              <Redirect exact from="/" to={routes.DASHBOARD_PAGE} />
              <Route exact path={routes.DASHBOARD_PAGE} component={DashboardPageAugmented} />
            </Switch>
            <Route exact path={ routes.SEARCH_PAGE } component={ SearchPageAugmented } />
            <Route exact path={ routes.WISH_LIST_PAGE } component={ WishListPageAugmented } />
            <Route exact path={routes.ABOUT_PAGE} component={AboutPageAugmented} />
            <Route exact path={routes.ACCOUNT_PAGE} component={AccountPageAugmented} />
            <Route exact path={routes.ACCOUNT_SETTING_PAGE}	component={AccountSettingPageAugmented} />
            <Route exact path={routes.UPDATE_WISH_ITEM_PAGE}	component={UpdateWishItemPageAugmented} />
            <Route exact path={routes.BLOG_PAGE}	component={BlogPageAugmented} />
            <Route exact path={routes.CALENDAR_PAGE} component={CalendarPageAugmented} />
            <Route exact path={routes.FEEDBACK_PAGE}	component={FeedbackPageAugmented} />
            <Route exact path={routes.FRIENDS_PAGE} component={ FriendsPageAugmented } />
            <Route exact path={routes.PROFILE_PAGE}	component={ProfilePageAugmented} />
            <Route exact path={routes.GIFTGUIDES_PAGE}	component={GiftGuidesPageAugmented} />
            <Route exact path={routes.PRIVACY_POLICY_PAGE}	component={PrivacyPolicyPageAugmented} />
            <Route exact path={routes.CONTACT_PAGE}	component={ContactPageAugmented} />
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    loading: state.userReducer.authState
  };
};

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ userRequest }, dispatch);
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
