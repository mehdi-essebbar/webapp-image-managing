import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadImage } from "../../actions/serviceActions";
import { renderError } from "../../utils/renderUtils"
import { ServiceTypes } from "../../constants/actionTypes"
import store from "../../store";

class UploadImage extends Component {
    constructor(props){
        super(props)
        this.state = { selectedImage: null };
    }
    
    static propTypes = {
        uploadImage: PropTypes.func.isRequired,
        uploaded: PropTypes.number,
	error: PropTypes.object
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.uploaded) {
            this.setState({ selectedImage: null});
            store.dispatch({
                type: ServiceTypes.ERROR,
                payload: null
            })
	    store.dispatch({
                type: ServiceTypes.UPLOAD,
                payload: null
            })
        }
    }

    onChangeHandler = event => {
        this.setState({
            selectedImage: event.target.files[0]
        })
    }

    onClickHandler = () => {
        if(this.state.selectedImage) {
            let formData = new FormData()
            formData.append('image', this.state.selectedImage)
            this.props.uploadImage(formData)
        }
    }

    render()
    {
        let error = this.props.error;
        if(error) {
            error = Object.values(error).join('\n');
        }
        return (
            <div className='files'>
                 <input type="file" name="file" onChange={this.onChangeHandler}/>
                 <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
                 { renderError(error) }
            </div>
        );
    }
}

function mapStateToProps(state) {
        return {
            uploaded: state.service.uploaded,
            error: state.service.error
        };
}

export default connect(mapStateToProps, { uploadImage } )(UploadImage);
