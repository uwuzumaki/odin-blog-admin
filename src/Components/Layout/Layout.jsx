import { Outlet, useRouteLoaderData } from "react-router-dom";
import { AuthProvider } from "../../Contexts/AuthContext";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  const { user } = useRouteLoaderData("root");
  return (
    <div className="flex flex-1 flex-col">
      <AuthProvider initialUser={user}>
        <Navbar />
        <Outlet />
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default Layout;
