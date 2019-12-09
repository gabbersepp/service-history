import React, { Component } from "react";
import ServiceBox from "./ServiceBox";
import TextInput from "./../elements/TextInput";
import LabeledCheckbox from "../elements/LabeledCheckbox";
import YesNoCheckbox from "./../elements/YesNoCheckbox";
import { connect } from "react-redux";

class Break extends Component {
    render() {
        this.options = [
            "alle 30.000 km", "alle 60.000 km", "alle 90.000 km", "alle 120.000 km", "alle 180.000 km", "alle 210.000 km"
        ]
        
        return (
            <ServiceBox>
                <h1>Ölwechsel-Service</h1>
                <div className="yesno-holder">
                    <label>&nbsp;</label><label>ja</label><label>nein</label>
                </div>
                <YesNoCheckbox  label="Ölwechsel-Service" property="oilChangeService" checked={this.props.data.oilChangeService}/>
                <YesNoCheckbox  label="Ölwechsel-Service (flexibel)" property="oilChangeServiceFlex" checked={this.props.data.oilChangeServiceFlex}/>
                
                <div className="distance"></div>
                <h1>Inspektion</h1>
                <div className="yesno-holder">
                    <label>&nbsp;</label><label>ja</label><label>nein</label>
                </div>
                <YesNoCheckbox  label="Inspektion" property="inspection" checked={this.props.data.inspection}/>
                <YesNoCheckbox label="Inspektion alle 12 Monate" checked={this.props.data.inspection12Month} className="strong" property="inspection12Month"/>
                <YesNoCheckbox label="Inspektion mit Zusatzarbeiten" 
                     showSelect={true} selectOptions={this.options}
                     selectProperty="inspectionWithAdditionalWork_select"
                     selectValue={this.props.data.inspectionWithAdditionalWork_select}
                     checked={this.props.data.inspectionWithAdditionalWork} 
                     property="inspectionWithAdditionalWork" 
                     onChange={this.additionalWorkChange}/>
             </ServiceBox>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        data: state.data.wrapping,
        dataWrapping: state.data // only there to get updates
    };
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Break);