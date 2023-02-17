import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { bookFlight } from "../../store/action/flight"

export class BookFlight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flight: {
                flightName: '',
                departureCity: '',
                arrivalCity: '',
                departureDate: ''
            },
            errors: {},
            msg: '',
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="card">
                    <h5 className="card-header">Book Flight</h5>
                    <div className="card-body">
                        <h5 className="card-title">Enter Flight Info: </h5>
                        <p className="card-text">
                            <span>{this.state.msg}</span> <br />

                            <label>Flight Name: </label>
                            <input type="text"
                                name="flightName"
                                value={this.state.flight.flightName}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['flightName']}</span>
                            <br /><br />

                            <label>Departure City: </label>
                            <input type="text"
                                name="departureCity"
                                value={this.state.flight.departureCity}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['departureCity']}</span>
                            <br /><br />

                            <label>Arrival City: </label>
                            <input type="text"
                                name="arrivalCity"
                                value={this.state.flight.arrivalCity}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['arrivalCity']}</span>
                            <br /><br />

                            <label>Departure Date: </label>
                            <input type="date"
                                name="departureDate"
                                value={this.state.flight.departureDate}
                                onChange={this.changeHandler} />
                            <span style={{ color: 'red' }}>{this.state.errors['joiningDate']}</span>

                            <button onClick={this.onAdd} className="btn btn-primary">Book Flight</button>

                        </p>
                    </div>
                </div>
            </div>
        );
    }

    changeHandler = (event) => {
        this.setState({
            flight: {
                ...this.state.flight,
                [event.target.name]: event.target.value
            }
        });
    }

    onAdd = ()=>{
        /* Validate Flight inputs */
        if(this.handleValidation()){
            console.log(this.state.flight);
            /* Call the API */
           this.postFlight(this.state.flight);
        }
        else{
            /* Display error messages */
            console.log('validation not passed..');     
        }
    }

    handleValidation(){
        let flightName = this.state.flight.flightName;
        let departureCity = this.state.flight.departureCity;
        let arrivalCity = this.state.flight.arrivalCity;
        let departureDate = this.state.flight.departureDate;
    
        let tempErrors = {}
        let formValid = true; 

        if(!flightName){ //If name is not given
            formValid = false;
            tempErrors['flightName']='flight Name cannot be empty';
        }
        if(!departureCity){ //If departureCity is not given
            formValid = false;
            tempErrors['departureCity']='departure City cannot be empty';
        }
        if(!arrivalCity){ //If arrivalCity is not given
            formValid = false;
            tempErrors['arrivalCity']='arrival City cannot be empty';
        }
        if(!departureDate){ //If departureDate is not given
            formValid = false;
            tempErrors['departureDate']='Please select flight departure Date';
        }
        this.setState({
            errors: tempErrors
        });

        return formValid;
    }

    async postFlight(f){
        let flt = {
            flightName: f.flightName,
            departureCity: f.departureCity,
            arrivalCity: f.arrivalCity,
            departureDate: f.departureDate,    
        }
        try {
            const response = axios.post("http://localhost:8585/api/flight/add", flt);
            const data = (await response).data;
            console.log('API success');
            console.log(data);
            this.setState({
                msg: "Flight Booked"
            })
            this.props.bookFlight(data);
          } catch (error) {
            this.setState({
                msg: 'Operation Failed'
            })
          }
    }

}

function mapStateToProps(state){
    return {
        bookFlight: state.flight
    }    
}

export default connect(mapStateToProps, {bookFlight})(BookFlight);