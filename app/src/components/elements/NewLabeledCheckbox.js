import React, { Component } from "react";
import Checkbox from "./Checkbox";
import PropTypes from "prop-types";
import Input from "./Input";

export default class NewLabeledCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name || "",
            checked: props.checked || false
        };
    }
    render() {
        return (
            <div id={`new-item-${this.props.id}`}>
                <div className="new-labeled check-holder displayable">
                    <Input value={this.state.name} onChange={e => this.textChange(e)}/><Checkbox checked={this.state.checked} onChange={val => this.chkChange(val)}/>                 
                </div>
                <div className="new-labeled check-holder printable">
                    <div>{this.state.name}</div><Checkbox checked={this.state.checked} onChange={val => this.chkChange(val)}/>                 
                </div>
            </div>
        )
    }

    textChange(val) {
        const obj = {
            name: val,
            checked: this.state.checked
        };
        this.setState(obj);
        this.props.onChange(obj);
    }

    chkChange(val) {
        const obj = {
            name: this.state.name,
            checked: val
        };
        this.setState(obj);
        this.props.onChange(obj);
    }
}

NewLabeledCheckbox.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    checked: PropTypes.bool
}