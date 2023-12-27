import { createHashRouter } from "react-router-dom";
import Home from "./modules/home";
import Network from "./modules/network";
import Services from "./modules/services";
import Settings from "./modules/settings";
import About from "./modules/about";
import User from "./modules/user";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/network",
      element: <Network />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/user",
      element: <User />,
    },
  ],
  {}
);

export default router;
