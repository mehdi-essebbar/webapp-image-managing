import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getImages } from "../../actions/serviceActions";
import ImageCard from "./ImageCard";
import {Pager, Grid, Row, Col } from "react-bootstrap";

class ListImages extends Component {

    constructor(props){
        super(props)
        this.state={
            pageNumber: 1
        };
    }
    
    static propTypes = {
        getImages: PropTypes.func.isRequired,
        images: PropTypes.object
    };

    componentWillMount() {
        this.props.getImages(this.state.pageNumber);
    }
    
    componentDidUpdate() {
      //ReactDOM.findDOMNode(this).scrollTop = 0;
      window.scrollTo(0, 0);
    }
    
    handlePrevious(){
        const minusOne = this.state.pageNumber - 1;
        this.setState({pageNumber: minusOne});
        this.props.getImages(minusOne);
    }
    
    handleNext(){
        const plusOne = this.state.pageNumber + 1
        this.setState({pageNumber: plusOne});
        this.props.getImages(plusOne)
    }
    
    renderImages() {
        const images = this.props.images;
        const numberItemsByRow = 4; // 2, 3, 4, 6
        if (images) {
            
            const listItems = images.results.map( (image) => <ImageCard key={image.id} value={image} /> )
            
            let newList = []
            
            var colSize = parseInt(12/numberItemsByRow);
            var sizeList = parseInt(listItems.length/numberItemsByRow);
            var remains = listItems.length - sizeList*numberItemsByRow;
            
            // presentation
            for (var i=0; i< sizeList; i++){
                    let subList = [];
                    for (var j=0; j< numberItemsByRow; j++){
                        subList.push(<Col key={j} sm={colSize} md={colSize}>{listItems[i*numberItemsByRow + j]}</Col>);
                    }
                    newList.push(<Row key={i} className="show-grid"> {subList} </Row>)
                }
            if(remains > 0){
                let remainList = []
                for(var i=sizeList*numberItemsByRow; i<listItems.length; i++){
                    remainList.push(<Col key={i} sm={colSize} md={colSize}>{listItems[i]}</Col>);
                }
                newList.push(<Row key={listItems.length} className="show-grid">{remainList}</Row>);
            }
            
            return newList;
        }
        
        return null;
    }
    
    renderPagination(){
        let pages = [];
        
        if (this.props.images){
            if( this.props.images.previous){
                pages.push(<Pager.Item key={1} previous onClick={()=> this.handlePrevious()}>&larr; Previous</Pager.Item>);
            }
            pages.push(<span key={2}> {this.state.pageNumber} </span>)
            if( this.props.images.next){
                pages.push(<Pager.Item key={3} next onClick={()=> this.handleNext()}>Next &rarr;</Pager.Item>)
            }
        }
        if (pages)
            return <Pager> {pages} </Pager>;
    }

    render() {
        return ([
            <Grid key={1}>
                {this.renderImages()}
            </Grid>,
            <div key={2}>
                {this.renderPagination()}
            </div>]
        );
    }
}

function mapStateToProps(state) {
    
    return {
        images: state.service.images
    };
}

export default connect(mapStateToProps, { getImages } )(ListImages);