import React, { useState } from "react";
import "./Login.css";
// services
import { doesEmailExist, loginWithEmailAndPassword, signInWithGoogle, addUserData } from "../../../services/Firebase";
// material-ui
import { TextField, Button, Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBack";
// components
import Loading from "../../loading/Loading";

const Login = ({ setLoginState, setSignupState, setMenuAnchor }) => {
    const [openAlert, setOpenAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    // input states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // input errors
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        setEmailErr(!email ? true : false);
        setPasswordErr(!password ? true : false);
        if (email && password) {
            try {
                await loginWithEmailAndPassword(email, password);
                window.location.reload();
            } catch (err) { setError(err.message); setOpenAlert(true); };
            setPassword("");
        }
        setLoading(false);
    };

    const handleSignInWithGoogle = async (e) => {
        setLoading(true);
        try {
            const { user } = await signInWithGoogle(email, password);
            const emailExists = await doesEmailExist(user.email);
            if (!emailExists) {
                const data = {
                    userId: user.uid,
                    name: user.displayName,
                    email: user.email,
                    imgSrc: user.photoURL
                };
                await addUserData(data);
            }
            window.location.reload();
            setLoading(false);
        } catch (err) { setError(err.message); setOpenAlert(true); setLoading(false); };
    };

    return (
        <div className="login">
            <Loading open={loading} />
            <ArrowBackRoundedIcon className="login__back" onClick={() => { setLoginState(false); setMenuAnchor(null); }} />
            <form className="login__box" noValidate autoComplete="off" onSubmit={handleLogin}>
                <TextField label="Email" autoFocus error={emailErr} helperText={emailErr ? "Where's your Email ?" : ""} value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" type="password" error={passwordErr} helperText={passwordErr ? "Where's your Password ?" : ""} value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button className="login__loginBtn" type="submit">Log In</Button>
                <Button className="login__googleBtn" onClick={handleSignInWithGoogle}><img src="/images/googleLogo.svg" alt="" />Sign In With Google</Button>
                <Button className="login__signupBtn" onClick={() => { setLoginState(false); setSignupState(true); }}>Don't Have An Account?</Button>

                {/* alert popup */}
                <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
                    <DialogTitle>ChatSpace says:</DialogTitle>
                    <DialogContent>{error}</DialogContent>
                    <DialogActions><Button onClick={() => setOpenAlert(false)} color="primary">Ok</Button></DialogActions>
                </Dialog>
            </form>
        </div>
    );
};

export default Login;
