import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import CarPanel from "./components/carPanel/CarPanel";
import BookingsPanel from "./components/bookingsPanel/BookingsPanel";
import UsersManagementPanel from "./components/usersManagementPanel/UsersManagementPanel";
import axios from "axios";

axios.defaults.headers['x-access-token'] = window.localStorage.getItem("token");


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/user/register' component={Register}/>
                    <Route path='/carsPanel' component={CarPanel}/>
                    <Route path='/bookingsPanel' component={BookingsPanel}/>
                    <Route path='/usersManagementPanel' component={UsersManagementPanel}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
