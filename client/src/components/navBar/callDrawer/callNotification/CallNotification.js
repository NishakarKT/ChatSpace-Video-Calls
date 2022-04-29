import React, { useState, useContext } from "react";
import "./CallNotification.css";
// contexts
import SocketContext from "../../../../contexts/SocketContext";
// material-ui
import { Button } from "@material-ui/core";
import CallEndRoundedIcon from "@material-ui/icons/CallEndRounded";

function CallNotification() {
    const { name, answerCall, leaveCall, call, callAccepted } = useContext(SocketContext);

    return call.isReceivedCall && !callAccepted ?
        <div className="callNotification">
            <div className="callNotification__box">
                <div className="callNotification__callerInfo">
                    <CallEndRoundedIcon />
                    <p>{name} is calling...</p>
                </div>
                <div className="callNotification__buttons">
                    <Button onClick={() => leaveCall()} color="secondary">Decline</Button>
                    <Button onClick={() => answerCall()} color="primary">Accept</Button>
                </div>
            </div>
        </div>
        : null

};

export default CallNotification;
