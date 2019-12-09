import React, { Component } from "react";
import ServiceBox from "./ServiceBox";
import TextInput from "./../elements/TextInput";
import YesNoCheckbox from "./../elements/YesNoCheckbox";
import LabeledCheckbox from "../elements/LabeledCheckbox";
import { connect } from "react-redux";

class Other extends Component {
    constructor(props) {
        super(props);
        this.additionalWorkChange = this.additionalWorkChange.bind(this);
        this.state = {
            additionalWorkEnabled: props.data.inspectionWithAdditionalWork || false
        }
    }

    additionalWorkChange({yes, no}) {
        this.setState({ additionalWorkEnabled: yes && !no });
    }

    render() {
        return (
            <ServiceBox>
                <div className="input-holder">
                    <label className="strong">Nächster Service</label>
                </div>
                <TextInput property="nextServiceDate" value={this.props.data.nextServiceDate} showLabel={true} labelClass="indented" text="Datum"/> 
                <TextInput property="nextServiceDistance" value={this.props.data.nextServiceDistance} showLabel={true} labelClass="indented" text="km-Stand"/> 
            </ServiceBox>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        data: state.data.wrapping,
        dataWrapping: state.data // only there to get updates
    }
}
export default connect(mapStateToProps, {})(Other);