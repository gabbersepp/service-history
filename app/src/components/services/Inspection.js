import React, { Component } from "react";
import ServiceBox from "./ServiceBox";
import LabeledCheckbox from "../elements/LabeledCheckbox";
import { connect } from "react-redux";
import { data } from "./../../action/index";
import NewLabeledCheckbox from "./../../components/elements/NewLabeledCheckbox";
import YesNoCheckbox from "./../elements/YesNoCheckbox";
import TextInput from "./../elements/TextInput";
import { newObjFrom } from "./../../logic/Utils";
import "./../../style/inspection.css";

class Inspection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: newObjFrom(props.data.additionalFields) || {}
        }
    }
    render() {
        return (
            <ServiceBox className="inspection">
                <h1>Zusatzarbeiten</h1>
                <div className="add-btn" onClick={() => this.addExtraRow()}></div>
                
                <div className="yesno-holder">
                    <label>&nbsp;</label><label>ja</label><label>nein</label>
                </div>
                <YesNoCheckbox inputProperty="breakFluidChange_input" inputValue={this.props.data.breakFluidChange_input} showInput={true} inputPlaceholder="Nächste Fälligkeit am" label="Bremsflüssigkeit" property="breakFluidChange" checked={this.props.data.breakFluidChange}/>
                <YesNoCheckbox label="Zündkerzen" property="sparkPlugChange" checked={this.props.data.sparkPlugChange}/>
                <YesNoCheckbox label="Staub- und Pollenfilter" property="dustAndPollenFilterChange" checked={this.props.data.dustAndPollenFilterChange}/>
                <YesNoCheckbox label="Multitronic: Öl" property="multitronicOilChange" checked={this.props.data.multitronicOilChange}/>
                <YesNoCheckbox label="Zahnriemen" property="toothedBeltChange" checked={this.props.data.toothedBeltChange}/>
                <YesNoCheckbox label="Luftfilter" property="airFilterChange" checked={this.props.data.airFilterChange}/>
                <YesNoCheckbox label="Kraftstofffilter" property="fuelFilterChange" checked={this.props.data.fuelFilterChange}/>
                <YesNoCheckbox label="Haldex: Öl" property="haldexOilChange" checked={this.props.data.haldexOilChange}/>
                <YesNoCheckbox label="S tronic: Öl und Filter" property="stronicOilFilterChange" checked={this.props.data.stronicOilFilterChange}/>
                
                <div id="additional-items">
                    {Object.keys(this.state.fields).map(key => {
                        const field = this.state.fields[key];

                        return (
                            <NewLabeledCheckbox key={key} name={field.name} checked={field.checked} id={key} onChange={val => this.setValue(key, val)}/>
                        )
                        })}

                </div>
            </ServiceBox>
        )
    }

    setValue(id, value) {
        if (value && value.name !== "") {
            this.props.setData("additionalFields." + id, value);
        }
    }

    addExtraRow() {
        const fields = this.state.fields;
        fields[(Object.keys(this.state.fields).length + 1).toString()] = {};
        this.setState({
            fields: fields
        });
    }
}

const mapStateToProps = function(state) {
    return {
        data: state.data.wrapping,
        dataWrapping: state.data // only there to get updates
    }
}

const mapDispatchToProps = {
    setData: data
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspection);