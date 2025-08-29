import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
  const location = useLocation();
  const [post, setPost] = useState("");
  const [comments, setComments] = useState("");
  const [visibility, setVisibility] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);
  const [updating, setUpdating] = useState(false);

  const getPost = async (currentLocation) => {
    const url = `${import.meta.env.VITE_URL}/post/${currentLocation}`;
    try {
      setLoadingPost(true);
      const data = await axios.get(url);
      setVisibility(data.data.status);
      setPost(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPost(false);
    }
  };

  const getComments = async (currentLocation) => {
    const url = `${import.meta.env.VITE_URL}/comment/${currentLocation}`;
    try {
      const data = await axios.get(url);
      setComments(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVis = async (currentLocation) => {
    const url = `${import.meta.env.VITE_URL}/post/${currentLocation}`;
    try {
      setUpdating(true);
      const data = await axios.put(url, {}, { withCredentials: true });
      setPost(data.data);
      setVisibility(!visibility);
    } catch (err) {
      console.log(err);
    } finally {
      setUpdating(false);
    }
  };

  const deleteComment = async (commentID) => {
    const url = `${import.meta.env.VITE_URL}/comment/${commentID}`;
    try {
      await axios.delete(url, { withCredentials: true });
      const newComments = comments.filter(
        (comment) => comment.id !== commentID,
      );
      setComments(newComments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost(location.pathname.split("/")[2]);
    getComments(location.pathname.split("/")[2]);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="py-4">
        <Link className="m-4" to="/">
          &lsaquo;-Back
        </Link>
      </div>
      <div className="flex h-1/1 flex-1 items-center justify-center">
        <div className="m-4 flex max-h-[40vh] min-h-[40vh] max-w-[40%] min-w-[40%] flex-col rounded-2xl border-blue-400 bg-slate-50 shadow shadow-blue-800">
          {loadingPost ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="animate-pulse">Loading Post...</p>
            </div>
          ) : (
            <>
              <p className="border-b-1 border-blue-400 px-4 py-2">
                {post.title}
              </p>
              <p className="flex-1 overflow-y-auto p-4">{post.content}</p>
            </>
          )}
          <div className="flex items-center justify-between justify-self-end border-t-1 border-blue-400 pt-4 pb-2">
            <p className="px-4">
              {" "}
              Status: {visibility ? "Published" : "Hidden"}
            </p>
            {updating ? (
              <div className="mx-4 my-2 flex cursor-not-allowed items-center justify-center rounded border border-blue-500 bg-blue-400 px-2 py-1 font-bold">
                {" "}
                <div className="mr-2 ml-1 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {visibility ? (
                  <p className="font-bold text-white">Hiding...</p>
                ) : (
                  <p className="font-bold text-white">Publishing...</p>
                )}
              </div>
            ) : (
              <div
                className="mx-4 my-2 max-w-full cursor-pointer self-start rounded border border-blue-500 bg-blue-400 px-2 py-1 font-bold text-white"
                onClick={() => toggleVis(location.pathname.split("/")[2])}
              >
                {visibility ? "Hide" : "Publish"}
              </div>
            )}
          </div>
        </div>
        <div className="m-4 flex max-h-[40vh] min-h-[40vh] max-w-[40%] min-w-[40%] flex-col gap-[1px] overflow-y-auto rounded-2xl border-blue-400 bg-slate-500 shadow shadow-blue-800">
          <div className="mb-[-1px] border-b-1 border-blue-400 bg-slate-50 px-4 py-2">
            Comments
          </div>
          {comments.length > 0 ? (
            <>
              {comments.map((comment) => (
                <div
                  className="flex items-center justify-between bg-slate-50"
                  key={comment.id}
                >
                  <div className="pt-2 pl-2">
                    <p className="font-bold">{comment.name}</p>
                    <p className="px-4 py-2">{comment.content}</p>
                  </div>

                  <button
                    className="cursor-pointer rounded-4xl border border-red-500 bg-red-400 px-4 py-2 text-white"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </>
          ) : (
            <p>This post has no comments</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PostPage;
