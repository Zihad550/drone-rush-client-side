import Footer from "@/components/Shared/Footer";
import NavBar from "@/components/Shared/Navbar/NavBar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
