import React, {Component} from 'react';
import './BookingsPanel.css'
import {audiA3, audiA6, BMWx6} from './../../photos/index'
import {config} from "../../config";
import axios from "axios";
import BackendResponse from "../feedback/BackendResponse";


class BookingItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newRentalStartDate: null,
            newRentalFinishDate: null,
            apiResponse: "",
            status: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

    }


    deleteItem(event) {
        event.preventDefault();
        axios.delete(config.apiUrl + "/rental/" + this.props.rentalID).then(
            response => {
                console.log("response");
                console.log(response);
                if (response.data.status !== true) {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                } else {
                    window.location.reload();
                }
            }
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const putData = {
            rentalID: this.props.rentalID,
            carID: this.props.carID,
            brand: this.props.brand,
            model: this.props.model,
            rentalStartDate: this.state.newRentalStartDate,
            rentalFinishDate: this.state.newRentalFinishDate,

        };
        axios.put(config.apiUrl + "/rental/", putData).then(
            response => {
                console.log("response");
                console.log(response);
                if (response.data.status !== true) {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                } else {
                    this.setState({
                        backendMessage: "Edited successfully.",
                        status: response.data.status
                    });
                    // setTimeout(function () {
                    //     window.location.reload();
                    // }, 1000);
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


        let logo = null;

        if (this.props.pathToPhoto === "audiA3") {
            logo = audiA3;
        } else if (this.props.pathToPhoto === "audiA6") {
            logo = audiA6;
        } else if (this.props.pathToPhoto === "BMWx6") {
            logo = BMWx6;
        }


        return (


            <div className="container todo-item">

                <div className="row">
                    <div className="col">
                        <img src={logo} className="mr-3" alt="Generic placeholder image" width="300"
                             height="250"/>
                    </div>
                    <div className="col-4">
                        <ul className="list-group-flush">
                            <li className="list-group-item">Brand: {this.props.brand}</li>
                            <li className="list-group-item">Model: {this.props.model}</li>
                            <li className="list-group-item">Rental start date: {this.props.rentalStartDate}</li>
                            <li className="list-group-item">Rental end date: {this.props.rentalFinishDate}</li>
                        </ul>
                    </div>

                    <div className="col-4">
                        <div className="row">
                            <input onChange={this.handleChange} className="my-date-style" type="date"
                                   id="newRentalStartDate"/>
                        </div>
                        <div className="row">
                            <input onChange={this.handleChange} className="my-date-style" type="date"
                                   id="newRentalFinishDate"/>
                        </div>

                        <div className="row">
                            <button type="button" className="btn btn-primary my-book-style font-weight-bold "
                                    onClick={this.handleSubmit}>Save
                            </button>
                            <button type="button" className="btn btn-primary my-book-style font-weight-bold "
                                    onClick={this.deleteItem}>Delete
                            </button>
                        </div>
                        <div>
                            <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>
                        </div>

                    </div>
                </div>

            </div>

        )
    }
}

export default BookingItem;