import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import routes from "./Routes";
import "react-toastify/ReactToastify.css";

gsap.registerPlugin(ScrollTrigger);

const router = createBrowserRouter(createRoutesFromElements(routes), {
  basename: "/petopia",
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
