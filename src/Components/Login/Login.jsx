import axios from "axios";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const url = `/login`;
    try {
      await axios.post(url, data);
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
