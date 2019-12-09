import React, { Component } from "react";
import "./../../style/servicebox.css";

export default class ServiceBox extends Component {
    render() {
        return (
            <div className={`service ${this.props.className || ""}`}>
                {this.props.children}
            </div>
        )
    }
}