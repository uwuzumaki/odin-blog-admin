import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="flex justify-between border-b border-b-slate-300 bg-slate-50 px-4 py-6">
      <div>
        <Link to="/">
          <p className="text-2xl font-bold text-blue-400 text-shadow-2xs">
            BlogSpace
          </p>
        </Link>
      </div>

      <div className="flex items-center justify-center">
        {user ? (
          <div className="mx-6 flex items-center rounded-4xl border px-4 py-2 text-xl text-blue-400">
            <div className="mr-4 h-6 w-6 rounded-full bg-blue-400"></div>
            <p>{user}</p>
          </div>
        ) : null}

        <Link
          className="m-2 rounded-4xl border border-blue-500 bg-blue-400 px-4 py-2 text-white shadow"
          to="/create"
        >
          New Post
        </Link>
        {user ? (
          <Link
            className="m-2 rounded-4xl border px-4 py-2 text-blue-400"
            onClick={logout}
          >
            Logout
          </Link>
        ) : (
          <Link
            className="m-2 rounded-4xl border px-4 py-2 text-blue-400"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
