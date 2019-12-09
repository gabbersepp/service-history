import React, { Component } from "react";
import { saveImage, getImageDir, deleteImage } from "./../logic/DataStore";
import ServiceBox from "./services/ServiceBox";
import "./../style/additionalimages.css";
import { connect } from "react-redux";
import { data, save } from "./../action/index";
import FileUpload from "./elements/FileUpload";
import { applyImageViewer } from "./../logic/Utils";


function Img(props) {
    return (
      <div className="image-holder">
          <img src={props.source} onClick={e => applyImageViewer(e.target)}/>
          <span onClick={() => props.delete(props.source, props.name)}></span>
      </div>
    )
  }

class AdditionalImages extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    render() {
        const images = this.props.images || [];
        return (
            <ServiceBox className="additional-images displayable">
                <FileUpload onChange={file => this.addImage(file)}/>
                <div className="images">
                    {images.map(i => (<Img key={i} delete={this.delete} name={i} source={`${getImageDir()}${i}`}/>))}
                </div>
            </ServiceBox>
        )
    }

    addImage(path) {
        const fileName = saveImage(path);
        var images = this.props.images || [];
        images.push(fileName);
        this.props.setData("images", images);
        this.props.save();
    }

    delete(path, name) {
        if (deleteImage(path)) {
            var images = this.props.images.filter(x => x !== name);
            this.props.setData("images", images);
            this.props.save();
        }
    }
}

const mapDispatchToProps = {
    setData: data,
    save: save
}

const mapStateToProps = function(state) {
    return {
        images: state.data.wrapping.images,
        dataWrapping: state.data // only there to get updates
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdditionalImages);