import { ServiceTypes } from "../constants/actionTypes";

export function serviceReducer(state = {}, action) {
    switch(action.type) {
        case ServiceTypes.UPLOAD:
            return { ...state, uploaded: action.payload};
        case ServiceTypes.LIST:
            return { ...state, images: action.payload};
        case ServiceTypes.VERIFIED:
            return { ...state, verified: action.payload};
        case ServiceTypes.REJECTED:
            return { ...state, rejected: action.payload};
        case ServiceTypes.ERROR:
            return { ...state, error: action.payload};
    }
    return state;
}
