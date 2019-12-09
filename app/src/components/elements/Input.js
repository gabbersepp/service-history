import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * add state again if we use Input anywhere where no rerendering on redux store change happens!
 */
export default class Input extends Component {
    render() {
        return (
            <input type="text" onChange={e => this.onChange(e.target.value)} value={this.props.value} placeholder={this.props.placeholder}/>
        )
    }

    onChange(val) {
        this.props.onChange(val);
    }
}

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}