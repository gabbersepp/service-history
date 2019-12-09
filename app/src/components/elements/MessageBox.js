import React, { Component } from "react";
import "./../../style/msgbox.css";

export function showYesNo(text, yesCb, noCb) {
    msgBoxInstance.setState({
        hide: false,
        text: text,
        yesCb: yesCb || (() => {}),
        noCb: noCb || (() => {})
    });
}

let msgBoxInstance;

export default class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            text: "",
            yesCb: null,
            noCb: null
        };
        msgBoxInstance = this;
        this.yes = this.yes.bind(this);
        this.no = this.no.bind(this);
    }
    render() {
        return (
            <div id="msg-box" className={this.state.hide ? "inactive" : "active"}>
                <div id="msg-box-container">
                    <div className="service">
                        <span>{this.state.text}</span>
                        <div>
                            <button onClick={this.yes}>Ja</button><button onClick={this.no}>Nein</button>
                        </div>
                    </div>
                </div>
                <div id="msg-box-overlay"></div>
            </div>
        );
    }

    yes() {
        this.state.yesCb();
        this.hide();
    }

    no() {
        this.state.noCb();
        this.hide();
    }

    hide() {
        this.setState({ hide: true });
    }
}