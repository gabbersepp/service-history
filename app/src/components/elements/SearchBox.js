import React, { Component } from "react";
import "./../../style/searchbox.css";
import { distinct } from "./../../logic/Utils";

export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items || [],
            currentInput: props.value || "",
            filtered: props.items || []
        };
    }

    render() {
        return (
            <div className="search-box">
                <input type="text" value={this.state.currentInput} onChange={(e) => this.onChange(e.target.value)} />
                <div className="sb-search-results">
                    {distinct(this.state.filtered).map(i => (<div className="sb-result-item" key={i} onClick={() => this.select(i)}>{i}</div>))}
                </div>
            </div>
        )
    }

    onChange(value) {
        const filtered = this.state.items.filter(x => x.indexOf(value) > -1) || [];
        filtered.push(value);
        this.setState({ items: this.state.items, currentInput: value, filtered: filtered });
    }

    select(item) {
        const items = [item].concat(this.state.items);
        
        this.setState({
            items: items,
            currentInput: item,
            filtered: []
        });
        this.props.selectionChange(item);
    }
}