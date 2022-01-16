import React, { Component } from "react";
import "./../../style/imageselector.css";
import * as audi from "./../../images/audi.png";
import * as seat from "./../../images/seat.png";
import * as vw from "./../../images/vw.png";
import * as skoda from "./../../images/skoda.png";
import * as vwaudi from "./../../images/vwaudi.png";

import PropTypes from "prop-types";

export default class ImageSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOverlay: false
        }
        this.showGalery = this.showGalery.bind(this);
        this.images = [skoda.default, vw.default, seat.default, audi.default, vwaudi.default];
    }

    render() {
        const style = {};
        if (this.state.showOverlay) {
            style.display = "block";
        } else {
            style.display = "none";
        }

        const html = (
            <div id="is-overlay-container" style={style}>
                <div id="is-overlay-background"></div>
                <div id="is-overlay">
                    {this.images.map(img => (<div className="is-entry-logo" onClick={e => this.selectImg(e, img)} style={{backgroundImage: "url(\"" + img + "\""}}/>))}
                </div>
            </div>
        )

        return (
            <div className="image-selector" onClick={e => this.showGalery(e, true)}>
                {!this.images.find(x => x === this.props.src) ? (<div className="is-entry-logo">Kein Bild ausgewählt</div>) : (
                    <img src={this.props.src} className="is-entry-logo"/>
                )}
                {html}
                <div style={{display: "none"}}>
                <img src={audi.default}/>
                <img src={vw.default}/>
                <img src={skoda.default}/>
                <img src={seat.default}/>
                <img src={vwaudi.default}/>
                </div>
            </div>
        )
    }

    selectImg(e, img) {
        this.props.selectImg(img);
        this.showGalery(e, false);
    }

    showGalery(e, show = true) {
        // when clicked on a image, the click is bubbled to the overlay
        this.setState({ showOverlay: show });
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
}

ImageSelector.propTypes = {
    selectImg: PropTypes.func.isRequired
}