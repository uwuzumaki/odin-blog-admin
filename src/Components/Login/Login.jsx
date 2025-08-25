import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const { setUser, user } = useAuth();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const url = `http://localhost:3000/auth/login`;
    try {
      const res = await axios.post(url, data, { withCredentials: true });
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  useEffect(() => {
    user ? navigate("/") : null;
    //eslint-disable-next-line
  }, [user]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <form
        className="flex flex-col items-center justify-center rounded-xl border border-blue-500 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="m-4 border-b-1 transition duration-500 ease-in-out focus:border-blue-500 focus:outline-none"
          autoComplete="off"
          placeholder="Username"
          {...register("username")}
        />
        <input
          className="m-4 border-b-1 transition duration-500 ease-in-out focus:border-blue-500 focus:outline-none"
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <input
          className="m-2 w-fit cursor-pointer rounded-4xl border border-blue-500 bg-blue-400 px-4 py-2 text-white shadow"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Login;
