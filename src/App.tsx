import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./App.css";
import { User } from "./types";
import { socket } from "./socket";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Chat from "./components/Chat/Chat";
import Login from "./components/auth/Login";
import FourOfour from "./components/FourOfour";
import { useUserStore } from "./hooks/auth";
import UserProfile from "./components/Profile";
import { authFetcher } from "./utils/authInstance";

function App() {
  const { user, setUser } = useUserStore();
  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await authFetcher<User | null>(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/user`
      );
      setUser(data, data ? true : false);

      if (isSuccess) {
        setUser(data, data ? true : false);
      } else if (isError) {
        setUser(null, false);
      }
      return user;
    },
  });

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
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="chat" element={<Chat />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="*" element={<FourOfour />} />
      </Route>
    </Routes>
  );
}

export default App;
