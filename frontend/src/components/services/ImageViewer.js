import React, { Component } from "react";
import { connect } from "react-redux"
import PropTypes from "prop-types";
import { Image, Input } from "react-bootstrap";
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { getImages, verifyImage, rejectImage } from "../../actions/serviceActions";
import { ServiceTypes } from "../../constants/actionTypes";
import store from '../../store'


class ImageViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberImages: 16,
            currentImage: 0,
            pageNumber: 1
        }
    }

    static propTypes = {
        getImages: PropTypes.func.isRequired,
        verifyImage: PropTypes.func.isRequired,
        rejectImage: PropTypes.func.isRequired,
        images: PropTypes.object,
        verified: PropTypes.bool,
        rejected: PropTypes.bool
    }

    componentWillMount() {
        this.props.getImages(this.state.pageNumber);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.verified) {
            this.nextImage();
            store.dispatch({
                type:ServiceTypes.VERIFIED,
                payload: false
            })
        }
        if(nextProps.rejected) {
            this.nextImage();
            store.dispatch({
                type:ServiceTypes.REJECTED,
                payload: false
            })
        }
    }

    previousPage(){
        const minusOne = this.state.pageNumber - 1;
        this.props.getImages(minusOne);
        this.setState({pageNumber: minusOne, currentImage:0});
    }
    
    nextPage(){
        const plusOne = this.state.pageNumber + 1
        this.setState({pageNumber: plusOne, currentImage:0});
        this.props.getImages(plusOne)
    }

    previousImage(){
        const currentImage = this.state.currentImage;
        if(currentImage > 0) {
            this.setState( prevState => ({
                currentImage: prevState.currentImage - 1
            }))
        } else {
            if(this.props.images.previous) {
                this.previousPage()
            }
        }
    }

    nextImage(){
        const currentImage = this.state.currentImage;
        const pageSize = this.props.images.results.length;
        if(currentImage < pageSize-1) {
            this.setState( prevState => ({
                currentImage: prevState.currentImage + 1
            }))
        } else {
            if(this.props.images.next) {
                this.nextPage()
            }
        }
    }

    handleKeyDown(key, e){
        if (key ==='left') {
            this.previousImage()
        } else if (key==='right') {
            this.nextImage()
        } else if (key==='x') {
            const imageId = this.props.images.results[this.state.currentImage].id;
            this.rejectImage(imageId);
        } else if (key==='p') {
            const imageId = this.props.images.results[this.state.currentImage].id;
            this.verifyImage(imageId);
        }
    }

    verifyImage(imageId) {
        this.props.verifyImage(imageId);
    }

    rejectImage(imageId) {
        this.props.rejectImage(imageId);
    }

    render() {
        const images = this.props.images;
        if(images && images.results.length) {
            const image = images.results[this.state.currentImage];
            return (
                [
                    <KeyboardEventHandler
                        key={1}
                        handleKeys={['left', 'right', 'x', 'p']}
                        onKeyEvent={(key, e) => this.handleKeyDown(key, e)} />,
                    <Image key={2} src={image.image} fluid='true' />
                ]
                    )
        }
        return <div></div>
    }
}

function mapStateToProps(state) {
    return {
        images: state.service.images,
        verified: state.service.verified,
        rejected: state.service.rejected
    };
}

export default connect(mapStateToProps, { verifyImage, rejectImage, getImages } )(ImageViewer);
