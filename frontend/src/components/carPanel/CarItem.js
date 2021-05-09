import React, {Component} from 'react';
import './CarPanel.css'
import {audiA3, audiA6, BMWx6} from './../../photos/index'
import {config} from "../../config";
import axios from "axios";
import BackendResponse from '../feedback/BackendResponse'


class CarItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rentalStartDate: null,
            rentalFinishDate: null,
        };
        this.bookCar = this.bookCar.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    bookCar() {


        const postData = {
            carID: this.props.carID,
            brand: this.props.brand,
            model: this.props.model,
            pathToPhoto: this.props.pathToPhoto,
            rentalStartDate: this.state.rentalStartDate,
            rentalFinishDate: this.state.rentalFinishDate,
        };

        axios.post(config.apiUrl + "/rental", postData).then(
            response => {
                if (response.data.status !== true) {
                    this.setState({
                        backendMessage: response.data.message,
                        status: response.data.status
                    });
                } else {
                    this.setState({
                        backendMessage: "Booked successfully.",
                        status: response.data.status
                    });
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

        console.log(this.state);
        console.log(this.props.userData);


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
                    <div className="col-5">
                        <ul className="list-group-flush">
                            <li className="list-group-item">Brand: {this.props.brand}</li>
                            <li className="list-group-item">Model: {this.props.model}</li>
                            <li className="list-group-item">Doors: {this.props.amountOfDoors}</li>
                            <li className="list-group-item">Price: {this.props.price}</li>
                            <li className="list-group-item">Air Conditioning {this.props.airConditioning}</li>
                            <li className="list-group-item">Price {this.props.price}</li>
                        </ul>
                    </div>

                    <div className="col-3">
                        <div className="row">
                            <input onChange={this.handleChange} className="my-date-style" type="date"
                                   id="rentalStartDate"/>
                        </div>
                        <div className="row">
                            <input onChange={this.handleChange} className="my-date-style" type="date"
                                   id="rentalFinishDate"/>
                        </div>

                        <div className="row">
                            <button type="button" className="btn btn-primary my-book-style font-weight-bold "
                                    onClick={this.bookCar}>Book car
                            </button>
                        </div>
                        <BackendResponse status={this.state.status} backendMessage={this.state.backendMessage}/>

                    </div>

                </div>

            </div>
        )
    }
}

export default CarItem;