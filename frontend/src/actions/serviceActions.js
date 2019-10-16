import axios from "axios";
import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;
import { ServiceTypes } from "../constants/actionTypes";
import { ServiceUrls } from "../constants/urls";


function setImages(payload) {
    return {
        type: ServiceTypes.LIST,
        payload: payload
    };
}

const setError = (payload) =>{
	return {
		type: ServiceTypes.ERROR,
		payload: payload
	};
}

export function getImages(page) {
    return function(dispatch) {
        let url = ServiceUrls.LIST;
	axios.get(url, {
				params: {page: page}
			}).then(response => {
		dispatch(setImages(response.data))
	}).catch((error) => {
		console.log(error.response.data)
		});
	};
}

function setUploaded(payload) {
    return {
        type: ServiceTypes.UPLOAD,
        payload: payload
    };
}

export function uploadImage(image) {
    return function(dispatch) {
		axios.post(ServiceUrls.UPLOAD, 
			image, { 
			headers: {
				'Content-Type': 'multipart/form-data'
			}
			}).then(response => {

			dispatch(setUploaded(1));
			dispatch(notifSend({
				message: "Image uploaded successfully",
				kind: "success",
				dismissAfter: 5000
			}))
	}).catch((error) => {
		dispatch(notifSend({
			message: "Uploading image failed",
			kind: "danger",
			dismissAfter: 5000
			}))
		dispatch(setError(error.response.data))
		});
	};	
}

function setVerified(payload) {
    return {
        type: ServiceTypes.VERIFIED,
        payload: payload
    };
}

export function verifyImage(image_id) {
    return function(dispatch) {
        let url = ServiceUrls.VERIFY;
	axios({ method: 'post', 
	    url: url,
	    data:{ id: image_id }
	}).then(response => {
		dispatch(setVerified(true));
		dispatch(notifSend({
			message: "Image verified successfully",
			kind: "info",
			dismissAfter: 5000
		}))
		//console.log(response.data);

	}).catch((error) => {
		console.log(error.response.data)
	});
    };
}

function setRejected(payload) {
    return {
        type: ServiceTypes.REJECTED,
        payload: payload
    };
}

export function rejectImage(image_id) {
    return function(dispatch) {
        let url = ServiceUrls.REJECT;
	axios({ method: 'post', 
	    url: url,
	    data:{ id: image_id }
	}).then(response => {
		dispatch(setRejected(true))
		dispatch(notifSend({
			message: "Image rejected successfully",
			kind: "info",
			dismissAfter: 5000
		}))

	}).catch((error) => {
		console.log(error.response.data)
	});
    };
}
