import React, { Component } from "react";
import ServiceBox from "./ServiceBox";
import { connect } from "react-redux";
import TextInput from "./../elements/TextInput";
import { data } from "./../../action/index";

class General extends Component {
    render() {
        return (
            <ServiceBox>
                <h1>Vermerk</h1>
                <TextInput showLabel={true} text="Datum" value={this.props.data.date} property="date" />
                <TextInput showLabel={true} text="km-Stand" value={this.props.data.distance} property="distance" />
                <TextInput showLabel={true} text="VIN" value={this.props.data.vin} property="vin" />
                <TextInput showLabel={true} text="MKB" value={this.props.data.mkb} property="mkb" />
                <TextInput showLabel={true} text="GKB" value={this.props.data.gkb} property="gkb" />
                
                <div className="input-holder displayable">
                    <label>Notizen</label>
                    <textarea placeholder="Notizen" value={this.props.data.notes} onChange={e => this.props.setData("notes", e.target.value)}></textarea>                
                </div>
                <div className="input-holder printable">
                    <label>Notizen</label>     
                    <div dangerouslySetInnerHTML={{__html:(this.props.data.notes || "").replace(/\n/g, "<br/>")}}></div>        
                </div>
            </ServiceBox>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        data: state.data.wrapping,
        dataWrapping: state.data // only there to get updates
    }
}
const mapDispatchToProps = {
    setData: data
}

export default connect(mapStateToProps, mapDispatchToProps)(General);