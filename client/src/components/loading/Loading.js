import React from "react";
import "./Loading.css";
// material-ui
import { Backdrop, CircularProgress } from "@material-ui/core";

const Loading = ({ open }) => {
    return (
        <div className="loading">
            <Backdrop open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
};

export default Loading;
