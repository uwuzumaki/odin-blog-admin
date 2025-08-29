import axios from "axios";
import { redirect } from "react-router-dom";

const protectedLoader = async () => {
  const url = `${import.meta.env.VITE_URL}/auth/verify`;
  try {
    const res = await axios.get(url, { withCredentials: true });
    if (res.statusText != "OK") {
      return redirect("/login");
    }
    const user = res.data.user;
    return { user };
  } catch (err) {
    console.log(err);
    return redirect("/login");
  }
};

export default protectedLoader;
