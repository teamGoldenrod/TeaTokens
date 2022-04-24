import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Confirmation from "./components/Confirmation";

import AuthPage from "./components/AuthPage";

import Allproducts from "./components/Allproducts";
import Singleproduct from "./components/Singleproduct";

import Home from "./components/Home";
import { me } from "./store";
import Cart from "./components/Cart";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/home" component={Home} />

          <Route path="/auth">
            {!isLoggedIn ? <AuthPage /> : <Redirect to="/home" />}
          </Route>

          {/* <Route path="/cart" component={Cart} /> */}
          <Route exact path="/products" component={Allproducts} />
          <Route exact path="/products/:productId" component={Singleproduct} />

          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
