import axios from "axios";
import moment from "moment";
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
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-[80%] flex-col gap-1 rounded-2xl border border-blue-400 bg-slate-50 shadow-blue-800">
          <div className="my-2 flex justify-between border-b-1 border-blue-400">
            <div className="flex-1 pl-4 text-2xl font-bold">Title</div>
            <div className="flex flex-1 justify-between">
              <div className="text-2xl font-bold">Created</div>
              <div className="pr-4 text-2xl font-bold">Status</div>
            </div>
          </div>
          {allPosts.map((post, index) => (
            <div
              key={post.id}
              className={`flex w-full justify-between py-2 ${index + 1 < allPosts.length ? `border-b-1 border-b-blue-400/30` : ``}`}
            >
              <Link className="flex-1" to={`/post/${post.id}`}>
                <p className="pl-4">{post.title}</p>
              </Link>
              <div className="flex flex-1 justify-between">
                <p>{moment(post.createAt).format("MMMM Do, YYYY")}</p>
                <p className="pr-4"> {post.status ? "Displayed" : "Hidden"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
