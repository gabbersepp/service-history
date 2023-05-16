import React, { Component } from "react";
import { connect } from "react-redux";
import { data } from "./../action/index";
import Input from "./../components/elements/Input";
import SearchBox from "./../components/elements/SearchBox";
import "./../style/commonrow.css";

class CommonRow extends Component {    
    render() {
        return (
            <div className="row" id="global-config">
                <div id="name-field">
                    <label>Name:</label>
                    <Input value={this.props.name} onChange={val => this.props.setData("name", val)} />
                </div>
                <div id="category-field">
                    <label>Kategorie:</label>
                    <SearchBox items={this.props.items.map(x => x.category)} value={this.props.category} selectionChange={val => this.props.setData("category", val)}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        name: state.data.wrapping.name,
        category: state.data.wrapping.category,
        dataWrapping: state.data, // only there to get updates
        items: state.items
    }
}
const mapDispatchToProps = {
    setData: data
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonRow);