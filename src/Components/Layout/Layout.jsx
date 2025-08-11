import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        Nav <Link to="/login">Login</Link>
      </nav>
      <div>Layout</div>
      <Outlet />
      <footer>footer</footer>
    </>
  );
};

export default Layout;
