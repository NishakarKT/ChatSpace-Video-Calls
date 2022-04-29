import React, { useState, useContext } from "react";
import "./VideoPlayer.css";
// contexts
import SocketContext from "../../../../contexts/SocketContext";
// components
import CallNotification from "../callNotification/CallNotification";
// material-ui
import { Button, Drawer, TextField } from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBack";
import CallRoundedIcon from "@material-ui/icons/CallRounded";
import CallEndRoundedIcon from "@material-ui/icons/CallEndRounded";

function VideoPlayer({ name }) {
    const { myVideo, setName, userVideo, stream, callAccepted, callEnded, callUser, leaveCall } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState("");

    return (
        <Drawer anchor="bottom" open={stream} >
            <ArrowBackRoundedIcon className="videoPlayer__back" onClick={() => window.location.reload()} />
            <div className="videoPlayer">
                <div className="videoPlayer__options">
                    {callAccepted && !callEnded ? <Button onClick={() => { leaveCall(); }} className="videoPlayer__callEndBtn"><CallEndRoundedIcon /></Button> : <><TextField label="Friend's Key" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} /><Button onClick={() => { setName(name); callUser(idToCall); }}><CallRoundedIcon /></Button></>}
                </div>
                <div className="videoPlayer__videosContainer">
                    {stream ? <video playsInline ref={myVideo} muted autoPlay className="videoPlayer__myVideo" /> : null}
                    {callAccepted && !callEnded ? <video playsInline ref={userVideo} autoPlay className="videoPlayer__callVideo" /> : null}
                </div>
            </div>
            <CallNotification />
        </Drawer>
    );
};

export default VideoPlayer;
