import Footer from "@/components/Shared/Footer";
import NavBar from "@/components/Shared/Header/NavBar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
