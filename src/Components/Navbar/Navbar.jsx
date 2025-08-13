import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <div>
        <Link to="/">Blog</Link>
      </div>
      <div>
        <Link to="/create">New Post</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
