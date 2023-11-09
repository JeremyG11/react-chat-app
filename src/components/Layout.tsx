import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const isProfilePage = pathname.startsWith("/profile");

  return (
    <>
      {isProfilePage || pathname === "/login" || pathname === "/register" ? (
        <Outlet />
      ) : (
        <>
          {" "}
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Layout;
