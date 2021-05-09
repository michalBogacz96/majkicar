import React, {Component} from 'react';
import './CarPanel.css'
import axios from 'axios';
import {config} from './../../config';
import CarItem from "./CarItem";

class CarPanel extends Component {


    constructor() {
        super();
        this.state = {
            isLogin: "",
            userData: null,
            cars: []
        }
        this.checkUserToken = this.checkUserToken.bind(this);
        this.loadCars = this.loadCars.bind(this);
        this.sortByBrandDesc = this.sortByBrandDesc.bind(this);
        this.sortByBrandAsc = this.sortByBrandAsc.bind(this);
        this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
        this.sortByPriceDesc = this.sortByPriceDesc.bind(this);
        this.signOut = this.signOut.bind(this);
        this.Bookings = this.Bookings.bind(this);
        this.LoginPanel = this.LoginPanel.bind(this);
    }


    LoginPanel() {
        window.location.href = "/";
    }

    signOut() {
        window.localStorage.removeItem("token");
        window.location.href = "/";
    }


    Bookings() {

        window.location.href = "/bookingsPanel";
    }

    showUsers() {
        window.location.href = "/usersManagementPanel";
    }

    async checkUserToken() {
        let response = await axios.get(config.apiUrl + "/user/checkUserToken");
        this.setState({
            isLogin: response.data.status,
            userData: response.data.message
        })
        console.log(response.data);
    }


    async loadCars() {
        const promise = await axios.get(config.apiUrl + "/car");
        console.log(promise);
        console.log(promise.data);
        return promise.data;
    }

    async componentDidMount() {
        await this.checkUserToken();

        axios.get(config.apiUrl + "/car").then(response => {

            console.log("to jest moj status");
            console.log(response.data.status);
            console.log(response);
            if (response.data.status !== true) {
                this.setState({
                    apiResponse: response.data.message,
                    status: response.data.status

                });
                this.LoginPanel();

            } else {
                this.setState({
                    cars: response.data.message
                })
            }
        });


        // this.setState({
        //     cars: await this.loadCars()
        // });
    }

    async getCars(afterLink) {
        const promise = await axios.get(config.apiUrl + "/car/" + afterLink);
        const response = promise.data;
        return response;
    }

    async sortByBrandAsc() {
        this.setState({
            cars: await this.getCars("sortByBrandAsc")
        });
    }

    async sortByPriceAsc() {
        this.setState({
            cars: await this.getCars("sortByPriceAsc")
        });
    }

    async sortByPriceDesc() {
        this.setState({
            cars: await this.getCars("sortByPriceDesc")
        });
    }

    async sortByBrandDesc() {
        this.setState({
            cars: await this.getCars("sortByBrandDesc")
        });
    }

    render() {

        console.log("this.state.userData");
        console.log(this.state.userData);

        const cars = this.state.cars.map(carItem =>
            <CarItem key={carItem.carID}

                // item={carItem}
                     userData={this.state.userData}
                     carID={carItem.carID}
                     brand={carItem.brand}
                     model={carItem.model}
                     gearbox={carItem.gearbox}
                     amountOfDoors={carItem.amountOfDoors}
                     amountOfBags={carItem.amountOfBags}
                     price={carItem.price}
                     airConditioning={carItem.airConditioning}
                     pathToPhoto={carItem.pathToPhoto}
            />)

        return (
            <div>
                <div className="container ">

                    <div className="row ">
                        <div className="col-md-12 text-right ">

                            <button type="button" className="btn btn-primary my-navbar-style font-weight-bold"
                                    onClick={this.showUsers}>Users
                            </button>
                            <button type="button" className="btn btn-primary my-navbar-style font-weight-bold"
                                    onClick={this.Bookings}>Bookings
                            </button>
                            <button type="button" className="btn btn-primary my-navbar-style font-weight-bold"
                                    onClick={this.signOut}>Sign out
                            </button>
                        </div>

                    </div>
                </div>
                <div className="todo-list">
                    <div className="col-md-12 text-center btn-group">

                        <button type="button" onClick={this.sortByBrandDesc}
                                className="btn btn-primary  my-button-style font-weight-bold">Sort by brand dsc
                        </button>
                        <button type="button" onClick={this.sortByBrandAsc}
                                className="btn btn-primary  my-button-style font-weight-bold">Sort by brand asc
                        </button>
                        <button type="button" onClick={this.sortByPriceDesc}
                                className="btn btn-primary  my-button-style font-weight-bold">Sort by price desc
                        </button>
                        <button type="button" onClick={this.sortByPriceAsc}
                                className="btn btn-primary  my-button-style font-weight-bold">Sort by price asc
                        </button>

                    </div>
                    {cars}
                </div>
            </div>
        )
    }
}

export default CarPanel;