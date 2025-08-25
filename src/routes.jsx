import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import PostPage from "./Components/Postpage/PostPage";
import Create from "./Components/Create/Create";
import authLoader from "./Loaders/authLoader";
import protectedLoader from "./Loaders/protectedLoader";

const routes = [
  {
    path: "/",
    element: <Layout />,
    loader: authLoader,
    id: "root",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/post/:post_id",
        loader: protectedLoader,
        element: <PostPage />,
      },
      { path: "/create", loader: protectedLoader, element: <Create /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/login/verify",
        element: <authLoader />,
      },
    ],
  },
];

export default routes;
