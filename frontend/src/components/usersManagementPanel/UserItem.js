import React, {Component} from 'react';
import './UsersManagementPanel.css'
import {config} from "../../config";
import axios from "axios";

class UserItem extends Component {


    constructor(props) {
        super(props);
        this.state = {
            roleStr: "",
            status: "",
            apiResponse: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const putData = {
            userID: this.props.userID,
            firstName: this.props.firstName,
            secondName: this.props.secondName,
            email: this.props.email,
            permissionType: this.props.permissionType,

        };
        axios.put(config.apiUrl + "/user/permissionType", putData).then(
            response => {
                if(response.data.status !== true) {
                    this.setState({
                        apiResponse: response.data.message,
                        status: response.data.status
                    });
                } else {
                    setTimeout(function(){ window.location.reload(); }, 1000);
                    // this.setState({
                    //     apiResponse: "Product created",
                    //     status: response.data.status
                    // });
                }
            }
        );
    }


    render() {

        let myRole = "";

        if (this.props.permissionType === 1){

            console.log("jestem w user")
            myRole = "user";
        }else if (this.props.permissionType === 2) {
            myRole = "admin";
        }

        return (
            <tbody>
            <tr>
                <td >{this.props.firstName}</td>
                <td> {this.props.secondName}</td>
                <td>{this.props.email}</td>
                <td>{myRole}</td>
                <td><button className="btn btn-primary my-book-style font-weight-bold " onClick={this.handleSubmit}>Change Role</button></td>

            </tr>

            </tbody>

        )
    }
}

export default UserItem;