import React from "react";
import "./MenuItem.css";

const MenuItem = ({ text }) => {
    return (
        <div className="menuItem">
            <p>{text}</p>
        </div>
    );
};

export default MenuItem;
