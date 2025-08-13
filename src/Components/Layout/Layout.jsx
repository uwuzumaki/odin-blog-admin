import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className="flex flex-1 flex-col">
      <nav>
        Nav <Link to="/login">Login</Link>
        <Link to="/Create">New Post</Link>
      </nav>
      <div>Layout</div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
