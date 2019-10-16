import 'redux-notifications/lib/styles.css';
import "./styles/style.css"
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import history from "./utils/historyUtils";
import App from "./components/App";


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
    , document.getElementById("root"));
