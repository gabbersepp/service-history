import React, { Component } from "react";
import * as audi from "./../images/audi.png";
import * as seat from "./../images/seat.png";
import * as vw from "./../images/vw.png";
import * as skoda from "./../images/skoda.png";
import * as vwaudi from "./../images/vwaudi.png";

import "./../style/imagelist.css";

export default class ImageList extends Component {
    render() {
        return (
            <div className="container image-list">       
                <div>
                <div style={{backgroundImage: "url(\'" + audi.default + "\')"}}/>
                <div style={{backgroundImage: "url(\'" + vw.default + "\')"}}/>
            
                </div>
                <div>
                <div style={{backgroundImage: "url(\'" + skoda.default + "\')"}}/>
                
                <div style={{backgroundImage: "url(\'" + seat.default + "\')"}}/>
                
                </div>

                <div>
                <div style={{backgroundImage: "url(\'" + vwaudi.default + "\')"}}/>
                
                </div>
            </div>
        )
    }
}