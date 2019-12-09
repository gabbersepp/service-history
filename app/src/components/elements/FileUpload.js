import React, { Component } from "react";
import "./../../style/fileupload.css";

export default class FileUpload extends Component {
    render() {
        return (
            <div className="file-upload">
                <input type="file" id="file" onChange={e => this.onChange(e.target.files)}></input>
                <label htmlFor="file">Bild auswählen</label>
            </div>
        )
    }

    onChange(files) {
        this.props.onChange(files[0].path);
    }
}