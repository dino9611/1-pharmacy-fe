import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PageNotFound from './pages/pageNotFound';
import TopNavbar from './components/section/admin/topNavbar';
import SideNavbar from './components/section/admin/sideNavbar';

const PrivateRoute = (props) => {
  const { isLogin, isAdmin, ...rest } = props;

  console.log(isLogin, isAdmin);
  if(!(isLogin && isAdmin === props.adminAuth)){
    return <Route component={PageNotFound} />;
  }

  return (
    <div 
      style={{ 
        backgroundColor: "#FFECEE",
      }}
    >
      <TopNavbar/>
      <div className="d-flex flex-row" style={{ height: '90vh' }}>
        <SideNavbar/>
        <div 
          className="d-flex flex-column justify-content-start"
          style={{ width: "80vw", overflowY: "scroll" }}
        >
          <Route {...rest} />
          {/* <div style={{ backgroundColor: 'red', width: '100%', height: '500px'}} /> */}
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