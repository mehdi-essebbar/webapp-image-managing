import React, { Component } from "react";
import {Thumbnail} from "react-bootstrap";


class ImageCard extends Component {
    constructor(props){
        super(props)
    }

    render()
    {
        const image = this.props.value;
        return (
            <div>
                <Thumbnail src={image.image} alt="Card image cap">
                    <p > <b>Verified:</b> {image.verified_flag.toString()}</p>
                    <p ><b>Rejected:</b> {image.rejected_flag.toString()}</p>                        
                    {" "}
                    <hr />
                </Thumbnail>
            </div>
        );
    }
}



export default ImageCard;