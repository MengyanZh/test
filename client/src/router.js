import React from 'react';
import { BrowserRouter, Switch, Route } from  'react-router-dom';
import App from './pages/App.js';
import CustomerMain from './pages/CustomerMain.js';
import CustomerProfile from './pages/CustomerProfile.js';
import VendorPark from './pages/VendorPark.js';
import VendorOrders from './pages/VendorOrders';

class Router extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/customer" exact component={CustomerMain}></Route>
                    <Route path="/profile" exact component={CustomerProfile}></Route>
                    <Route path="/vendor" exact component={VendorPark}></Route>
                    <Route path="/orders" exact component={VendorOrders}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;
