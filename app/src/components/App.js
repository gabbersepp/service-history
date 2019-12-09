import React, { Component } from "react";
import Navigation from "./Navigation";
import Main from "./Main";
import Message from "./elements/Message";
import { load } from "./../logic/DataStore";
import { connect } from "react-redux";
import { addItems } from "./../action/index";
import ImageList from "./ImageList";
import MessageBox from "./elements/MessageBox";

class App extends Component {
    constructor(props) {
        super(props);
        this.props.addItems((load() || {}).items || []);
    }

    render() {
        return (
            <div>
                <Navigation/>
                { this.props.data.wrapping.id ? (                
                <Main key={this.props.data.wrapping.id}/>
                ) : (
                    <ImageList/>
                ) }
                <Message />
                <MessageBox/>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        data: state.data
    };
}

const mapDispatchToProps = {
    addItems: addItems
}

export default connect(mapStateToProps, mapDispatchToProps)(App);