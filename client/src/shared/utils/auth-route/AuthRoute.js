import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, auth,children, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth.isAuth && !auth.loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />

);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthRoute);
