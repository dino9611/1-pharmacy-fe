import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PageNotFound from './pages/pageNotFound';
import TopNavbar from './components/UI/adminInventory/topNavbar';
import SideNavbar from './components/UI/adminInventory/sideNavbar';

const PrivateRoute = (props) => {
  const { isLogin, isAdmin, ...rest } = props;

  if(!(isLogin && isAdmin === props.adminAuth)){
    return <Route component={PageNotFound} />;
  }

  return (
    <div 
      className=""
      style={{ 
          height: "200vh",
          backgroundColor: "#FFF6F6"
      }}
    >
      <TopNavbar/>
      <div className="d-flex flex-row">
        <SideNavbar/>
        <Route {...rest}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
    isAdmin: state.auth.isAdmin
  }
}
  
export default connect(mapStateToProps)(PrivateRoute);