import React from "react";
import "./Body.css";

const Body = () => {
    return (
        <div className="body">
            <img src="/images/home-bg.gif" alt="" />
            <h1 className="body__title">Welcome to ChatSpace</h1>
            <p className="body__quote">Let's chat...</p>
            <p className="body__para">ChatSpace is a free-to-use platform where you can get access to free unlimited video chat sessions with your friends and family, anytime and anywhere! Have fun :)</p>
        </div>
    );
};

export default Body;
