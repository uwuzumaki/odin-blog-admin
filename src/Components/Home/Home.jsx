import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const getPosts = async () => {
    const url = `${import.meta.env.VITE_URL}/post?page=${currentPage}`;
    try {
      setLoading(true);
      const posts = await axios.get(url);
      setAllPosts(posts.data.posts);
      setPage({ page: posts.data.page, totalPages: posts.data.totalPages });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
    //eslint-disable-next-line
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex max-h-[50vh] min-h-[50vh] w-[80%] flex-col overflow-y-auto rounded-2xl border border-blue-400 bg-slate-50 shadow shadow-blue-800">
          <div className="my-2 flex justify-between border-b-1 border-blue-400 pr-4">
            <div className="flex-1 pl-4 text-2xl font-bold">Title</div>
            <div className="flex flex-1 justify-between">
              <div className="text-2xl font-bold">Created</div>
              <div className="pr-4 text-2xl font-bold">Status</div>
            </div>
          </div>
          {loading ? (
            <div className="flex flex-1 items-center justify-center">
              <div className="mr-2 ml-1 h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"></div>
              <p className="animate-pulse">Loading...</p>
            </div>
          ) : (
            <>
              {allPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`flex w-full justify-between py-2 pr-4 ${index + 1 < allPosts.length ? `border-b-1 border-b-blue-400/30` : ``}`}
                >
                  <Link className="flex-1" to={`/post/${post.id}`}>
                    <p className="pl-4">{post.title}</p>
                  </Link>
                  <div className="flex flex-1 justify-between">
                    <p>{moment(post.createAt).format("MMMM Do, YYYY")}</p>
                    <p className="pr-4">
                      {" "}
                      {post.status ? "Displayed" : "Hidden"}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="mt-4 flex gap-2 text-2xl">
          <button
            className={`${page.page == 1 ? `cursor-not-allowed` : `cursor-pointer`}`}
            disabled={page.page == 1}
            onClick={() => setSearchParams({ page: page.page - 1 })}
          >
            &larr;
          </button>
          <p className="mx-1">{page.page}</p>
          <button
            className={`${page.page == page.totalPages ? `cursor-not-allowed` : `cursor-pointer`}`}
            disabled={page.page == page.totalPages}
            onClick={() => setSearchParams({ page: page.page + 1 })}
          >
            &rarr;
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
