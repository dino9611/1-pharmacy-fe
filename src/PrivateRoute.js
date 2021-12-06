import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PageNotFound from './pages/pageNotFound';

const PrivateRoute = (props) => {
  const { isLoggedIn, role, ...rest } = props;

  if(!(isLoggedIn && role === props.authorizedRole)){
    return <Route component={PageNotFound} />;
  }

  return <Route {...rest} />
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    role: state.auth.role
  }
}
  
export default connect(mapStateToProps)(PrivateRoute);