import React, { Component } from "react";
import { connect } from "react-redux";
import { data } from "../../action/index";
import Checkbox from "./Checkbox";
import PropTypes from "prop-types";

class LabeledCheckbox extends Component {
    render() {
        return (
            <div className="check-holder">
                <label className={this.props.className}>{this.props.label}</label><Checkbox checked={this.props.checked} disabled={this.props.disabled} onChange={val => this.props.data(this.props.property, val)}/>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {}
}

const mapDispatchToProps = {
    data: data
}

export default connect(mapStateToProps, mapDispatchToProps)(LabeledCheckbox);

LabeledCheckbox.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.bool
}