import React, { Component } from "react";
import ImageSelector from "./elements/ImageSelector";
import { connect } from "react-redux";
import { data } from "./../action/index";

class ImageRow extends Component {
    render() {
        return (
            <div className="row">
                <ImageSelector src={this.props.src} selectImg={img => this.selectImg(img)}/>
            </div>
        )
    }

    selectImg(img) {
        this.props.setData("imgSrc", img)
    }
}

const mapStateToProps = function(state) {
    return {
        src: state.data.wrapping.imgSrc,
        data: state.data // to get updates
    }
}

const mapDispatchToprops = {
    setData: data
}
export default connect(mapStateToProps, mapDispatchToprops)(ImageRow);