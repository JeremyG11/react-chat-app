import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { socket } from "./socket";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Chat from "./components/Chat/Chat";
import Login from "./components/auth/Login";
import FourOfour from "./components/FourOfour";
import { useUserStore } from "./hooks/auth";

function App() {
  const { user, isAuthenticated } = useUserStore();
  console.log(user, isAuthenticated);
  socket.on("connect", () => {
    console.log("off connected");
  });
  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("off disconnected");
    });

    return () => {
      socket.off("connect", () => {
        console.log("off connected");
      });
      socket.off("disconnect", () => {
        console.log("disconnected");
      });
    };
  }, [user, isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="chat" element={<Chat />} />
        <Route path="*" element={<FourOfour />} />
      </Route>
    </Routes>
  );
}

export default App;
