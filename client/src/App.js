import React, { useState, useEffect } from "react";
import "./App.css";
// services
import ContextProvider from "./services/SocketContext";
import { getUserDataWithUserId } from "./services/Firebase";
// hooks
import useAuthListener from "./hooks/useAuthListener";
// components
import NavBar from "./components/navBar/main/NavBar";
import Body from "./components/body/Body";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";

function App() {
  const { user } = useAuthListener();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("chatspace-auth")) setLoading(true);

    const getUserData = async () => {
      const res = await getUserDataWithUserId(user.uid);
      setUserData(res);
      setLoading(false);
    }
    if (user?.uid)
      getUserData();
  }, [user]);

  return (
    <ContextProvider>
      <div className="App">
        <Loading open={loading} />
        <NavBar userId={userData?.userId} name={userData?.name} imgSrc={userData?.imgSrc} email={userData?.email} />
        <Body />
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;
