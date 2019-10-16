import {combineReducers} from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as notifReducer } from 'redux-notifications';

import { serviceReducer } from "./appReducers";

const rootReducer = combineReducers({
    form: formReducer,
    notifs: notifReducer,
    service: serviceReducer,
});

export default rootReducer;
