import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/profile" ? (
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
