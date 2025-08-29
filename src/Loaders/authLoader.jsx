import axios from "axios";

const authLoader = async () => {
  const url = `${import.meta.env.VITE_URL}/auth/verify`;
  try {
    const res = await axios.get(url, { withCredentials: true });
    if (res.statusText == "OK") {
      const user = res.data.user;
      return { user, authenticated: true };
    }
    return { user: null, authenticated: false };
  } catch (err) {
    console.log(err);
    return { user: null, authenticated: false };
  }
};

export default authLoader;
