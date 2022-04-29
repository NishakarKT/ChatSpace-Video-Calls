import React, { useState } from "react";
import "./Signup.css";
// services
import { signupWithEmailAndPassword, signInWithGoogle, doesEmailExist, addUserData } from "../../../services/Firebase";
// material-ui
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBack";
// compoenents
import Loading from "../../loading/Loading";

const SignUp = ({ setLoginState, setSignupState, setMenuAnchor }) => {
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    // input states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // input errors
    const [nameErr, setNameErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const handleSignup = async (e) => {
        setLoading(true);
        e.preventDefault();

        setNameErr(!name ? true : false);
        setEmailErr(!email ? true : false);
        setPasswordErr(!password ? true : false);

        if (name && email && password) {
            try {
                const { user } = await signupWithEmailAndPassword(email, password);
                const data = {
                    userId: user.uid,
                    name: name,
                    email: email,
                    imgSrc: user.photoURL
                };
                await addUserData(data);
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
        } catch (err) { setError(err.message); setOpenAlert(true); };
        setLoading(false);
    };

    return (
        <div className="signup" >
            <Loading open={loading} />
            <ArrowBackRoundedIcon className="signup__back" onClick={() => { setSignupState(false); setMenuAnchor(null); }} />
            <div className="signup__box">
                <form className="signup__box" noValidate autoComplete="off" onSubmit={handleSignup}>
                    <TextField label="Name" autoFocus error={nameErr} helperText={nameErr ? "Where's your uame ?" : ""} value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label="Email" error={emailErr} helperText={emailErr ? "Where's your email ?" : ""} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="Password" type="password" error={passwordErr} helperText={passwordErr ? "Where's your password ?" : ""} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button className="signup__signupBtn" type="submit">Sign Up</Button>
                    <Button className="signup__googleBtn" onClick={handleSignInWithGoogle}><img src="/images/googleLogo.svg" alt="" />Sign In With Google</Button>
                    <Button className="signup__loginBtn" onClick={() => { setLoginState(true); setSignupState(false); }}>Have An Account?</Button>

                    {/* alert popup */}
                    <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
                        <DialogTitle>ChatSpace says:</DialogTitle>
                        <DialogContent>{error}</DialogContent>
                        <DialogActions><Button onClick={() => setOpenAlert(false)} color="primary">Ok</Button></DialogActions>
                    </Dialog>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
