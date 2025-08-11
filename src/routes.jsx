import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import PostPage from "./Components/PostPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/post/:post_id", element: <PostPage /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];

export default routes;
