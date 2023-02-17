import { Component } from "react";
import { connect } from "react-redux";
import { BookFlight } from "./flight-components/bookFlight";
import { FlightList } from "./flight-components/FlightList";
import { listFlight } from "../store/action/flight"



export class Flight extends Component {
    constructor(props) {
        super(props);

        this.state = {
            componentNum: 0
        };
    }
    componentDidMount() {
        //this.props.FlightList();
    }
    render() {
        return (
            <div className="container-fliud">
                <div className="row">
                    <div className="col-sm-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <button className=" list-group-item flight-sidebar"
                                onClick={() => (this.setState({ componentNum: 1 }))}>
                                Show All Flight</button>
                            </li>
                            <li className="list-group-item">
                                <button className=" list-group-item flight-sidebar"
                                onClick={() => (this.setState({ componentNum: 2 }))}>
                                Book Flight</button>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-9">
                        {this.state.componentNum === 1 ?
                                <FlightList data= {this.props.flightList}/> : <BookFlight/>}
                    </div> 
                </div>
            </div>
        );
    }
};
function mapStateToProps(state) {
    return {
        flightList: state.flight,
        BookFlight: state.flight 
    };
}
export default connect(mapStateToProps, { listFlight })(Flight);
