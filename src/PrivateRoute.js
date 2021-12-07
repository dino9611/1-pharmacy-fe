import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PageNotFound from './pages/pageNotFound';

const PrivateRoute = (props) => {
  const { isLoggedIn, isAdmin, ...rest } = props;

  if(!(isLoggedIn && isAdmin === props.adminAuth)){
    return <Route component={PageNotFound} />;
  }

  return <Route {...rest} />
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isAdmin: state.auth.isAdmin
  }
}
  
export default connect(mapStateToProps)(PrivateRoute);