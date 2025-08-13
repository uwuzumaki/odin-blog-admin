import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const url = "http://localhost:3000/post";
    try {
      const posts = await axios.get(url);
      setAllPosts(posts.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="flex-1">
        <p>Posts</p>
        <div>
          {allPosts.map((post) => (
            <Link
              to={`/post/${post.id}`}
              className="border border-black"
              key={post.id}
            >
              {post.title}
              <p> {post.status ? "Displayed" : "Hidden"}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
