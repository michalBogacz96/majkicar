import React, {Component} from 'react';
import './BookingsPanel.css'
import axios from 'axios';
import {config} from './../../config';
import BookingItem from "./BookingItem";

class BookingsPanel extends Component {

    constructor() {
        super();
        this.state = {
            isLogin: "",
            userData: null,
            cars: [],
            rentals: [],
            carIDs: []
        }
        this.checkUserToken = this.checkUserToken.bind(this);
        this.signOut = this.signOut.bind(this);
        this.LoginPanel = this.LoginPanel.bind(this);
    }

    LoginPanel() {
        window.location.href = "/";
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


        axios.get(config.apiUrl + "/rental/bookings").then(response => {
            console.log("To jest moje response:");
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

    }

    render() {


        const myCars = this.state.cars.map(carItem =>
            <BookingItem key={carItem.rentalID}

                         rentalID={carItem.rentalID}
                         userData={this.state.userData}
                         carID={carItem.carID}
                         brand={carItem.brand}
                         model={carItem.model}
                         pathToPhoto={carItem.pathToPhoto}
                         rentalStartDate={carItem.rentalStartDate}
                         rentalFinishDate={carItem.rentalFinishDate}
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
                    {/*<div className="col-md-12 text-center btn-group">*/}

                    {/*    <button type="button" onClick={this.sortByModelAsc}*/}
                    {/*            className="btn btn-primary  my-button-style font-weight-bold">Sort by model asc*/}
                    {/*    </button>*/}
                    {/*    <button type="button" onClick={this.sortByBrandAsc}*/}
                    {/*            className="btn btn-primary  my-button-style font-weight-bold">Sort by brand asc*/}
                    {/*    </button>*/}
                    {/*    <button type="button" onClick={this.sortByStartDateAsc}*/}
                    {/*            className="btn btn-primary  my-button-style font-weight-bold">Sort by start date asc*/}
                    {/*    </button>*/}
                    {/*    <button type="button" onClick={this.sortByEndDateAsc}*/}
                    {/*            className="btn btn-primary  my-button-style font-weight-bold">Sort by end date asc*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    {myCars}
                </div>
            </div>
        )
    }
}


export default BookingsPanel;