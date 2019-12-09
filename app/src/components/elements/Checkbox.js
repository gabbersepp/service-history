import React, { Component } from "react";
import PropTypes from "prop-types";
import "./../../style/checkbox-component.css";

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            checked: props.checked
        }
    }

    render() {
        return (
            <div className="checkbox-component">
                <div className={"chk " + (this.state.disabled ? ' chk-disabled ' : '') + (this.state.checked ? 'chk-checked' : '')} onClick={() => this.onClick()}/>
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (this.props.disabled !== prevProps.disabled || this.props.checked !== prevProps.checked) {
            this.setState({
                disabled: this.props.disabled,
                checked: this.props.checked
            });
        }
    }

    onClick() {
        if (!this.state.disabled) {
            let val = !this.state.checked;
            this.setState({
                disabled: false,
                checked: val
            });
            this.props.onChange(val);
        }
    }
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}