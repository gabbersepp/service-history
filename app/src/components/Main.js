import React, { Component } from "react";
import ServiceRows from "./services/ServiceRows";
import CommonRow from "./CommonRow";
import ImageRow from "./ImageRow";
import { connect } from "react-redux";
import { deleteItem, dataAll, save } from "./../action/index";
import { showYesNo } from "./elements/MessageBox";
import "./../style/grid.css";

class Main extends Component {
    render() {
        return (
            <div className="container">
                <ImageRow/>
                <CommonRow/>
                <ServiceRows/>

                <div className="row button-row">
                    <button onClick={() => this.props.save()} id="save">Speichern</button>
                    <button onClick={() => this.print()}>Drucken</button>
                    <button onClick={() => this.delete()} id="delete">Löschen</button>
                    
                </div>
            </div>
        )
    }

    delete() {
        const yesCb = () => {
            this.props.deleteItem(this.props.items, this.props.id);
            this.props.dataAll({});
            this.props.save();
        }
        showYesNo(`Möchtest du den Eintrag '${this.props.name}' wirklich löschen?`, yesCb.bind(this));
    }

    print() {
        let fn = null;

        if (window) {
            fn = window.print;
        } else {
            fn = () => {
                const { remote } = require('electron')
                const currentWindow = remote.getCurrentWindow()
                let contents = currentWindow.webContents;
                contents.print({printBackground: true}, () => document.dispatchEvent(new Event("print-end")));
            }
        }

        fn();
    }
}

const mapStateToProps = function(state) {
    return {
        id: state.data.wrapping.id,
        items: state.items,
        name: state.data.wrapping.name
    }
}
const mapStateToDispatch = {
    deleteItem: deleteItem,
    dataAll: dataAll,
    save: save
}

export default connect(mapStateToProps, mapStateToDispatch)(Main);