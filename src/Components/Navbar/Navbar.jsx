import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between border-b border-b-slate-300 bg-slate-50 px-4 py-6">
      <div>
        <Link to="/">Blog</Link>
      </div>
      <div>
        <Link
          className="m-2 rounded-4xl border border-blue-500 bg-blue-400 px-4 py-2 text-white shadow"
          to="/create"
        >
          New Post
        </Link>
        <Link
          className="m-2 rounded-4xl border px-4 py-2 text-blue-400"
          to="/login"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
