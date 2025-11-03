import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/ReactToastify.css";
import routes from "./Routes";

gsap.registerPlugin(ScrollTrigger);

const router = createBrowserRouter(createRoutesFromElements(routes), {
  basename: "/petopia",
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
