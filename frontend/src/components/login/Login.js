import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import './login.css'
import axios from 'axios';
import {config} from "../../config";
import BackendResponse from '../feedback/BackendResponse'


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            backendMessage: "",
            isLogin: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkUserToken = this.checkUserToken.bind(this);
    }


    async componentWillMount() {
        this.setState({
            isLogin: await this.checkUserToken()
        });
    }

    async checkUserToken() {
        let response = await axios.get(config.apiUrl + "/user/checkUserToken");
        console.log(response.data);
        return response.data.status;
    }

    handleSubmit(event) {
        event.preventDefault();
        const postData = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(config.apiUrl + "/user/authenticate", postData).then(
            response => {
                if (response.data.status !== true) {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                } else {
                    window.localStorage.setItem("token", response.data.message.token);
                    axios.defaults.headers['x-access-token'] = window.localStorage.getItem("token");
                    this.setState({
                        isLogin: true
                    });
                    window.location.href = "/carsPanel";
                }
            }
        );
    }

    handleChange(event) {
        let stateName = event.target.id;
        this.setState({
            [stateName]: event.target.value
        });
    }

    render() {

        if (this.state.isLogin.toString() === "true") {
            return <Redirect to="/carsPanel"/>
        }


        if (this.state.isLogin.toString() === "false") {

            return (
                <div className="registration-page">
                    <div className="sign-in-form">
                        <h1 className="sign-in-text font-weight-bold">Sign in</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="black-text">Email</label>
                                <input onChange={this.handleChange} placeholder="Email" type="text"
                                       className="form-control" id="email"/>
                            </div>
                            <div className="form-group">
                                <label className="black-text">Password</label>
                                <input onChange={this.handleChange} placeholder="Password" type="password"
                                       className="form-control" id="password"/>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block font-weight-bold">Sign In
                            </button>
                            <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>
                        </form>
                        <p>
                            <Link to="/user/register">
                                Register New Account
                            </Link>
                        </p>
                    </div>
                </div>
            );
        }
    }

}

export default Login