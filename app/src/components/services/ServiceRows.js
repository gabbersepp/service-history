import React, { Component } from "react";
import Break from "./Break";
import General from "./General";
import Inspection from "./Inspection";
import Other from "./Other";
import AdditionalImages from "./../AdditionalImages";

class ServiceRows extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <General/>
                    <Break/>
                </div>

                <div className="row">
                    <Other/>
                    <Inspection/> 
                </div>

                <div className="row">
                    <AdditionalImages/>
                </div>
            </div>
        )
    }
}

export default ServiceRows;