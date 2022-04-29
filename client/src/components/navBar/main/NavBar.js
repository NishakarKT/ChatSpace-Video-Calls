import React, { useState, useContext } from "react";
import "./NavBar.css";
// contexts
import SocketContext from "../../../contexts/SocketContext";
import { signout } from "../../../services/Firebase";
// components
import UserDrawer from "../userDrawer/UserDrawer";
import CallDrawer from "../callDrawer/main/CallDrawer";
import Login from "../login/Login";
import SignUp from "../signup/Signup";
import Loading from "../../loading/Loading";
// material-ui
import { IconButton, Avatar, Menu, Drawer } from "@material-ui/core";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

const NavBar = ({ userId, name, imgSrc, email }) => {
    const [loading, setLoading] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [userAnchor, setUserAnchor] = useState(null);
    const [userState, setUserState] = useState(false);
    const [callState, setCallState] = useState(false);
    const [loginState, setLoginState] = useState(false);
    const [signupState, setSignupState] = useState(false);
    const { setStream } = useContext(SocketContext);

    const handleLogout = async () => {
        setLoading(true);
        await signout();
        window.location.reload();
    };

    return (
        <div className="navBar">
            <Loading open={loading} />
            <div className="navBar__title">
                <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}><MenuRoundedIcon /></IconButton>
                <p>ChatSpace</p>
            </div>
            {userId ? <IconButton onClick={(e) => setUserAnchor(e.currentTarget)}><Avatar src={imgSrc} alt="" /></IconButton> : null}

            {/***** Menus *****/}
            <Menu anchorEl={menuAnchor} keepMounted open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                {!userId ? <p className="navBar__menuItem" onClick={() => setLoginState(true)} >Login</p> : null}
                {!userId ? <p className="navBar__menuItem" onClick={() => setSignupState(true)} >Signup</p> : null}
                <p className="navBar__menuItem" onClick={() => setCallState(true)}>Make A Call</p>
            </Menu>
            <Menu anchorEl={userAnchor} keepMounted open={Boolean(userAnchor)} onClose={() => setUserAnchor(null)}>
                <p className="navBar__menuItem" onClick={() => setUserState(true)} >Profile</p>
                <p className="navBar__menuItem" onClick={() => handleLogout()} >Logout</p>
            </Menu>
            {/***** Menus *****/}

            {/***** Drawers *****/}
            <Drawer anchor="left" open={Boolean(callState)} onClose={() => { setCallState(false); setMenuAnchor(false); setStream(false); }}>
                <CallDrawer setCallState={setCallState} setMenuAnchor={setMenuAnchor} name={name} />
            </Drawer>
            <Drawer anchor="right" open={Boolean(userState)} onClose={() => setUserState(false)}>
                <UserDrawer setUserState={setUserState} setUserAnchor={setUserAnchor} userId={userId} name={name} imgSrc={imgSrc} email={email} />
            </Drawer>
            <Drawer anchor="top" open={Boolean(loginState)} onClose={() => { setLoginState(false); setMenuAnchor(false); setStream(false); }}>
                <Login setLoginState={setLoginState} setSignupState={setSignupState} setMenuAnchor={setMenuAnchor} />
            </Drawer>
            <Drawer anchor="bottom" open={Boolean(signupState)} onClose={() => { setSignupState(false); setMenuAnchor(false); setStream(false); }}>
                <SignUp setLoginState={setLoginState} setSignupState={setSignupState} setMenuAnchor={setMenuAnchor} />
            </Drawer>
            {/***** Drawers *****/}
        </div>
    );
};

export default NavBar;
