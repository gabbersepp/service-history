import React, { Component } from "react";
import { connect } from "react-redux";
import { data } from "./../../action/index";
import PropTypes from "prop-types";
import Input from "./Input";

class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ""
        }
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div className="input-holder">
                {this.props.showLabel ? (<label className={this.props.labelClass}>{this.props.text}</label>) : null}
                <Input value={this.state.value} onChange={this.onChange} placeholder={this.props.placeholder} />
            </div>
        )
    }

    onChange(val) {
        this.setState({
            value: val
        });
        this.props.config(this.props.property, val);
    }
}

const mapStateToProps = function() {
    return {};
}

const mapDispatchToProps = {
    config: data
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInput);

TextInput.propTypes = {
    config: PropTypes.func.isRequired,
    property: PropTypes.string.isRequired,
    showLabel: PropTypes.bool,
    text: PropTypes.string.isRequired,
    labelClass: PropTypes.string,
    value: PropTypes.string
}