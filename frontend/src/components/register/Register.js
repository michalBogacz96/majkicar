import React, {Component} from 'react';
import './Register.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import {config} from "../../config";
import BackendResponse from '../feedback/BackendResponse'


class Register extends Component {

    constructor() {
        super();
        this.state = {
            firstName: "",
            secondName: "",
            email: "",
            password: "",

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    handleSubmit(event) {
        event.preventDefault();
        const postData = {
            firstName: this.state.firstName,
            secondName: this.state.secondName,
            email: this.state.email,
            password: this.state.password,
        };
        axios.post(config.apiUrl + "/user/registration", postData).then(
            response => {
                if (response.data.status !== true) {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                    console.log(response.data);
                } else {
                    this.setState({
                        backendMessage: "Account created.",
                        status: response.data.status
                    });
                    window.sessionStorage.setItem("token", response.data.message.token);
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
        return (
            <div className="registration-page">
                <div className="sign-in-form">
                    <h1 className="sign-in-text font-weight-bold">Create a new account</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="black-text">First Name</label>
                            <input onChange={this.handleChange} placeholder="First Name" type="text"
                                   className="form-control" id="firstName"/>
                        </div>
                        <div className="form-group">
                            <label className="black-text">Second Name</label>
                            <input onChange={this.handleChange} placeholder="Second Name" type="text"
                                   className="form-control" id="secondName"/>
                        </div>
                        <div className="form-group">
                            <label className="black-text">Email Address</label>
                            <input onChange={this.handleChange} placeholder="Email Address" type="email"
                                   className="form-control" id="email"/>
                        </div>
                        <div className="form-group">
                            <label className="black-text">Password</label>
                            <input onChange={this.handleChange} placeholder="Password" type="password"
                                   className="form-control" id="password"/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Register New Account</button>
                        <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>
                    </form>
                    <p>
                        <Link to="/">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Register;
