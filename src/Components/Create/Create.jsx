import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Create = () => {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [fullPost, setFullPost] = useState("");

  // const logpost = () => {
  //   console.log(post);
  //   console.log(title);
  // };

  const submitPost = async () => {
    const url = "http://localhost:3000/post";
    const data = { title: title, content: post };
    try {
      const post = await axios.post(url, data, { withCredentials: true });
      setFullPost(post);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(fullPost);
  }, [fullPost]);

  return (
    <div>
      <div>
        <div>Title</div>
        <input
          className="focus:outline-none"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
      </div>
      <ReactQuill
        className="container mx-auto rounded shadow"
        theme="snow"
        value={post}
        onChange={setPost}
      />
      {/* <div onClick={logpost}>LogPost</div> */}
      <div onClick={submitPost}>LogPost</div>
    </div>
  );
};

export default Create;
