import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
  const location = useLocation();
  const [post, setPost] = useState("");
  const [visibility, setVisibility] = useState("");

  const getPost = async (currentLocation) => {
    const url = `http://localhost:3000/post/${currentLocation}`;
    try {
      const data = await axios.get(url);
      setVisibility(data.data.status);
      setPost(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVis = async (currentLocation) => {
    const url = `http://localhost:3000/post/${currentLocation}`;
    try {
      const data = await axios.put(url, {}, { withCredentials: true });
      setPost(data.data);
      setVisibility(!visibility);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost(location.pathname.split("/")[2]);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="flex-1">
      <p>{location.pathname.split("/")[2]}</p>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <p> {visibility ? "Displayed" : "Hidden"}</p>
      <div
        className="cursor-pointer"
        onClick={() => toggleVis(location.pathname.split("/")[2])}
      >
        {visibility ? "Hide" : "Show"}
      </div>
    </div>
  );
};

export default PostPage;
