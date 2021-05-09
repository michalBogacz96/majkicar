import React, {Component} from 'react';
import './UsersManagementPanel.css'
import axios from 'axios';
import {config} from './../../config';
import UserItem from './UserItem';

class UsersManagementPanel extends Component {


    constructor() {
        super();
        this.state = {
            isLogin: "",
            userData: null,
            users: [],
            status: "",
            apiResponse: "",
        };
        this.checkUserToken = this.checkUserToken.bind(this);
        this.loadCars = this.loadCars.bind(this);
        this.sortByEmailDesc = this.sortByEmailDesc.bind(this);
        this.sortByEmailAsc = this.sortByEmailAsc.bind(this);
        this.sortByRoleAsc = this.sortByRoleAsc.bind(this);
        this.sortByRoleDesc = this.sortByRoleDesc.bind(this);
        this.signOut = this.signOut.bind(this);

    }

    CarPanel() {
        window.location.href = "/carsPanel";
    }

    signOut() {
        window.localStorage.removeItem("token");
        window.location.href = "/";
    }

    async checkUserToken() {
        let response = await axios.get(config.apiUrl + "/user/checkUserToken");
        this.setState({
            isLogin: response.data.status,
            userData: response.data.message
        })
    }


    async loadCars() {
        window.location.href = "/carsPanel";
    }

    async componentDidMount() {
        await this.checkUserToken();

        axios.get(config.apiUrl + "/user").then(response => {

            if (response.data.status !== true) {
                this.setState({
                    apiResponse: response.data.message,
                    status: response.data.status

                });
                this.CarPanel();

            } else {
                this.setState({
                    users: response.data.message
                })
            }
        });
    }

    async getUsers(afterLink) {
        const promise = await axios.get(config.apiUrl + "/user/" + afterLink);
        const response = promise.data;
        return response;
    }

    async sortByEmailAsc() {
        this.setState({
            users: await this.getUsers("sortByEmailAsc")
        });
    }

    async sortByRoleAsc() {
        this.setState({
            users: await this.getUsers("sortByPermissionTypeAsc")
        });
    }

    async sortByRoleDesc() {
        this.setState({
            users: await this.getUsers("sortByPermissionTypeDesc")
        });
    }

    async sortByEmailDesc() {
        this.setState({
            users: await this.getUsers("sortByEmailDesc")
        });
    }

    render() {


        const users = this.state.users.map(userItem =>
            <UserItem key={userItem.userID}
                      userData={this.state.userData}
                      userID={userItem.userID}
                      firstName={userItem.firstName}
                      secondName={userItem.secondName}
                      email={userItem.email}
                      permissionType={userItem.permissionType}
            />)

        return (
            <div>
                <div className="container ">
                    <div className="row ">
                        <div className="col-md-12 text-right ">
                            <button type="button" className="btn btn-primary my-navbar-style font-weight-bold"
                                    onClick={this.CarPanel}>All cars
                            </button>
                            <button type="button" className="btn btn-primary my-navbar-style font-weight-bold"
                                    onClick={this.signOut}>Sign out
                            </button>
                        </div>
                    </div>
                </div>
                <div className="todo-list">
                    <div className="col-md-12 text-center btn-group">

                        <button type="button" onClick={this.sortByEmailDesc}
                                className="btn btn-primary  my-button-style font-weight-bold">Sort by email dsc
                        </button>
                        <button type="button" onClick={this.sortByEmailAsc}
                                className="btn btn-primary  my-button-style font-weight-bold">Sort by email asc
                        </button>
                        <button type="button" onClick={this.sortByRoleDesc}
                                className="btn btn-primary  my-button-style font-weight-bold">Sort by role desc
                        </button>
                        <button type="button" onClick={this.sortByRoleAsc}
                                className="btn btn-primary  my-button-style font-weight-bold">Sort by role asc
                        </button>

                    </div>

                    <div>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Second Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Change Role Button</th>

                            </tr>
                            </thead>
                            {users}
                        </table>
                    </div>

                </div>
            </div>
        )
    }
}

export default UsersManagementPanel;