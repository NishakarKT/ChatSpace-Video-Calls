import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../contexts/FirebaseContext";

const useAuthListener = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("chatspace-auth")));
    const { firebase } = useContext(FirebaseContext);
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged(authUser => {
            if (authUser)
                localStorage.setItem("chatspace-auth", JSON.stringify(authUser));
            else {
                localStorage.removeItem("chatspace-auth");
                setUser(null);
            }
        });
        return () => listener();
    }, [firebase]);
    return { user };
};

export default useAuthListener;