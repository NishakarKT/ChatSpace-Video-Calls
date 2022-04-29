import React from 'react';
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            <p>Images used are from <a href={"http://unsplash.com"} target="_blank" rel="noreferrer">Unsplash </a>- The internet’s source of freely-usable images.</p>
            <div className="footer__contact">
                <a href={"http://www.facebook.com/IITKgp/"} target="_blank" rel="noreferrer"><img src={"/images/facebook-logo.png"} alt="" /></a>
                <a href={"http://www.instagram.com/iit.kgp/"} target="_blank" rel="noreferrer"><img src={"/images/instagram-logo.png"} alt="" /></a>
                <a href={"http://in.linkedin.com/school/indian-institute-of-technology-kharagpur/"} target="_blank" rel="noreferrer"><img src={"/images/linkedin-logo.png"} alt="" /></a>
                <a href={"http://twitter.com/IITKgp"} target="_blank" rel="noreferrer"><img src={"/images/twitter-logo.png"} alt="" /></a>
            </div>
        </div>
    );
};

export default Footer;
