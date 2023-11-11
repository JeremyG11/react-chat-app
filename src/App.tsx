import { pick } from "lodash";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./App.css";
import { ActiveUser, User } from "./types";
import { socket } from "./socket";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Chat from "./components/Chat/Chat";
import Login from "./components/auth/Login";
import FourOfour from "./components/FourOfour";
import { useUserStore } from "./hooks/auth";
import UserProfile from "./components/Profile";
import { authFetcher } from "./utils/authInstance";
import PrivateRoutes from "./utils/protectedRoute";
import UserProfileInfo from "./components/UserProfileInfo";

function App() {
  const { isAuthenticated, user, setUser } = useUserStore();
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);

  useEffect(() => {
    // get the user
    const getUser = async () => {
      const data = await authFetcher<User | null>(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/user`,
        { withCredentials: true }
      );
      setUser(data, data ? true : false);
      const auth = data;
      socket.auth = { user: data };
      socket.connect();
      return user;
    };
    getUser();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("private message", (arg) => {
      console.log(arg);
    });
    socket.emit("user-connected", user?.id);
    socket.on("active-users", (users) => {
      console.log("Active Users", users);
      setActiveUsers((prev) => [...prev, ...users]);
    });

    // socket.on("session", (arg) => {
    //   console.log(arg);
    // });
    socket.on("disconnect", () => {
      console.log("off disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("active-users");
      socket.off("disconnect");
    };
  }, [socket, activeUsers, isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<FourOfour />} />
        <Route element={<PrivateRoutes />}>
          <Route
            path="profile/*"
            element={
              <UserProfile>
                <Routes>
                  <Route
                    path="/"
                    element={<UserProfileInfo activeUsers={activeUsers} />}
                  />
                  <Route path="chat/:receiverId" element={<Chat />} />
                </Routes>
              </UserProfile>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
