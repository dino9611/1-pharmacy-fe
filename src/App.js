import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Marketplace from './pages/marketplace';
import AdminDashboard from './pages/adminDashboard';
import Checkout from './pages/checkout';
import PageNotFound from './pages/pageNotFound';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  state = {}
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Marketplace} />
          <PrivateRoute path="/dashboard" exact component={AdminDashboard} authorizedRole="admin"/>
          <PrivateRoute path="/checkout" exact component={Checkout} authorizedRole="user"/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;