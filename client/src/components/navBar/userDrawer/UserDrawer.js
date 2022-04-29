import React, { useState, useEffect } from "react";
import "./UserDrawer.css";
// material-ui
import { Avatar, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMore";
import EditRoundedIcon from "@material-ui/icons/Edit";

const UserDrawer = ({ setUserState, setUserAnchor, userId, name, imgSrc, email }) => {
    return (
        <div className="userDrawer">
            <div className="userDrawer__head">
                <ArrowBackRoundedIcon onClick={() => { setUserState(false); setUserAnchor(false) }} />
                <p>{name}</p>
            </div>
            <Avatar src={imgSrc} />
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>User Id</AccordionSummary>
                <AccordionDetails>{userId}</AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>Email</AccordionSummary>
                <AccordionDetails>{email}</AccordionDetails>
            </Accordion>
        </div>
    );
};

export default UserDrawer;
