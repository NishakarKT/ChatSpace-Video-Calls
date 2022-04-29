import React, { useState, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./CallDrawer.css";
// components
import VideoPlayer from "../videoPlayer/VideoPlayer";
import Loading from "../../../loading/Loading";
// contexts
import SocketContext from "../../../../contexts/SocketContext";
// material-ui
import { Accordion, AccordionSummary, AccordionDetails, Button } from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import CallRoundedIcon from '@material-ui/icons/Call';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMore';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';

const CallDrawer = ({ name, setCallState, setMenuAnchor }) => {
    const { me, myVideo, setStream } = useContext(SocketContext);
    const [myVideoCam, setMyVideoCam] = useState(true);
    const [loading, setLoading] = useState(false);

    const setMyVideo = async () => {
        setLoading(true);
        try {
            // video & audio permissions
            const currentStream = myVideoCam ? await navigator.mediaDevices.getUserMedia({ video: true, audio: true }) : null;
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
            setMyVideoCam(!myVideoCam);
        } catch (err) { console.log(err) };
        setLoading(false);
    };

    return (
        <div className="callDrawer">
            <Loading open={loading} />
            <div className="callDrawer__head">
                <ArrowBackRoundedIcon onClick={() => { setCallState(false); setMenuAnchor(false) }} />
                <p>Call Options</p>
            </div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}><div className="callDrawer__accSummary"><VpnKeyRoundedIcon />Get Key</div></AccordionSummary>
                <AccordionDetails>
                    <div className="callDrawer__copyId">
                        <CopyToClipboard text={me}>
                            <Button>Copy Secret Key</Button>
                        </CopyToClipboard>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary onClick={() => setMyVideo()} expandIcon={<ExpandMoreRoundedIcon />}><div className="callDrawer__accSummary"><CallRoundedIcon />Make a call</div></AccordionSummary>
                <AccordionDetails><div className="callDrawer__call">Starting...<VideoPlayer name={name} /></div></AccordionDetails>
            </Accordion>
        </div>
    );
};

export default CallDrawer;
