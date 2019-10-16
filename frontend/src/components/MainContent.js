import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Landing";
import UploadImage from "./services/UploadImage";
import ListImages from "./services/ListImages";
import ImageViewer from "./services/ImageViewer";
import NoMatch from "./NoMatch";


const MainContent = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/upload" component={UploadImage}/>
            <Route path="/list" component={ListImages}/>
            <Route path="/viewer" component={ImageViewer}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
);

export default MainContent;
