import { firebase, googleAuthProvider } from "../lib/Firebase";

export const loginWithEmailAndPassword = async (email, password) => {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    return res;
};

export const signInWithGoogle = async () => {
    const res = await firebase.auth().signInWithPopup(googleAuthProvider);
    return res;
};

export const signupWithEmailAndPassword = async (email, password) => {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return res;
};

export const doesEmailExist = async (email) => {
    const res = await firebase.firestore().collection("users").where("email", "==", email).limit(1).get();
    return res.docs.length ? true : false;
};

export const addUserData = async (data) => {
    await firebase.firestore().collection("users").add(data);
};

export const getUserDataWithUserId = async (userId) => {
    const res = await firebase.firestore().collection("users").where("userId", "==", userId).limit(1).get();
    const userData = {
        docId: res.docs[0].id,
        ...res.docs[0].data()
    }
    return userData;
};

export const signout = async () => {
    await firebase.auth().signOut();
};