import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Menubar from "../../components/Menubar/Menubar";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import navbarVariants from "../../variants/MenubarVariants";
import Mainbar from "../../components/MainBar/Mainbar";

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        varient={pathname === "/" ? navbarVariants.transparent : ""}
      /> */}
      {/* <Menubar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> */}

      <Mainbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
