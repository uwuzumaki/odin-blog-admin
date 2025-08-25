import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const Login = () => {
  const { setUser } = useAuth();
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

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input {...register("username")} />
        <label>Password</label>
        <input type="password" {...register("password")} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
