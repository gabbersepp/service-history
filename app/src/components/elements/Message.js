import React, { Component } from "react";
import "./../../style/message.css";

let msgInstance = null;

export function showMessage(type, text) {
    msgInstance.setState({
        text: text,
        type: type,
        hide: false,
        display: "block"
    });
    msgInstance.initTimeout();
}

class Message extends Component {
    constructor(props) {
        super(props);
        msgInstance = this;
        this.state = {
            text: "",
            type: "",
            hide: true,
            display: "none"
        }
    }

    initTimeout() {
        setTimeout(() => {
            this.setState({text: this.state.text, type: this.state.type, hide: true, display: "block"});
        }, 2000);
        setTimeout(() => {
            this.setState({display: "none"});
        }, 3000);        
    }

    render() {
        return (
            <div id="message" className={this.state.hide ? "inactive" : "active"} style={{display: this.state.display}}>
                <div className={this.state.type}>
                    {this.state.text}
                </div>
            </div>
        )
    }
}

export default Message;