import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PageNotFound from './pages/pageNotFound';
import TopNavbar from './components/section/admin/topNavbar';
import SideNavbar from './components/section/admin/sideNavbar';

const PrivateRoute = (props) => {
  const { isLogin, isAdmin, ...rest } = props;

  if(!(isLogin && isAdmin === props.adminAuth)){
    return <Route component={PageNotFound} />;
  }

  return (
    <div 
      className=""
      style={{ 
        height: "100%",
        backgroundColor: "#FFECEE",
      }}
    >
      <TopNavbar/>
      <div className="d-flex flex-row">
        <SideNavbar/>
        <div 
          className="d-flex flex-column justify-content-start m-5"
          style={{ width: "min-content" }}
        >
          <Route {...rest} />
        </div>
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