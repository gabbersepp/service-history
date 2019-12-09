import React, { Component } from "react";
import { connect } from "react-redux";
import { data } from "./../../action/index";
import PropTypes from "prop-types";
import Checkbox from "./Checkbox";
import Input from "./Input";
import SearchBox from "./SearchBox";

class YesNoCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yes: props.checked || false
        }
    }
    render() {
        const input = this.props.showInput ? (
            <Input placeholder={this.props.inputPlaceholder} onChange={e => this.props.data(this.props.inputProperty, e)} value={this.props.inputValue}/>
        ) : null;

        const select = this.props.showSelect ? (
            <SearchBox items={this.props.selectOptions} value={this.props.selectValue} selectionChange={(val) => this.props.data(this.props.selectProperty, val)}/>
        ) : null;

        return (
            <div className={`yesno-holder ${(this.props.showInput || this.props.showSelect) ? "inputable" : ""}`}>
                <label className={this.props.className}>{this.props.label}</label>{input || select}<Checkbox checked={this.state.yes} onChange={val => this.yes(val)}/><Checkbox checked={!this.state.yes} onChange={val => this.no(val)}/>
            </div>
        )
    }

    yes(val) {
        this.setState({ yes: val });
        this.props.data(this.props.property, val);

        if (this.props.onChange) {
            this.props.onChange({yes: val, no: !val});
        }
    }

    no(val) {
        this.setState({ yes: !val });
        this.props.data(this.props.property, !val);

        if (this.props.onChange) {
            this.props.onChange({yes: !val, no: val});
        }
    }

}

const mapStateToProps = function(state) {
    return {}
}

const mapDispatchToProps = {
    data: data
}

export default connect(mapStateToProps, mapDispatchToProps)(YesNoCheckbox);

YesNoCheckbox.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    showInput: PropTypes.bool,
    inputPlaceholder: PropTypes.string,
    inputProperty: PropTypes.string,
    inputValue: PropTypes.string,
    showSelect: PropTypes.string,
    selectProperty: PropTypes.string,
    selectValue: PropTypes.string,
    selectOptions: PropTypes.string
}