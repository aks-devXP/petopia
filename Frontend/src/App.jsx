import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Dictionary from "./pages/Dictionary"
import Guide from './pages/Guide'
import Home from './pages/Home'
import Login from './Pages/Login'
import News from './pages/News'
import NewsPage from './pages/NewsPage'
import SignUp2 from './pages/SignUp2'
import PetServices from './Pages/PetServices'
import UserDashboard from './Pages/UserDashboard'
import VetBook from './Pages/VetBook'
import VetDocs from './Pages/VetDocs'
import VetHome from "./pages/VetHome"
import Volunteer from "./pages/Volunteer"
import GroomerBook from './Pages/GroomerBook'
import ScrollAnimations from './Components/ScrollAnimations'
import ProductDirectory from './Pages/ProductDirectory'
import CareTaker from './Pages/CareTaker'
import "react-toastify/ReactToastify.css"

// For smooth scrolling
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'
import NGO from './Pages/NGO'
import Testing from './Pages/Testing'

gsap.registerPlugin(ScrollTrigger);
function App() {

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis();

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable GSAP's lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy(); // Cleanup on unmount
    };
  }, []);

    const router = createBrowserRouter(createRoutesFromElements(
      <>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='sign-up' element={<SignUp2/>}></Route>
      <Route path='sample' element={<ScrollAnimations/>}></Route>
      <Route path="/testing" element={<Testing/>}></Route>
      <Route path='/dashboard' element={<UserDashboard/>}></Route> 
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route  path="/shopping" element={<ProductDirectory/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
 
        <Route path="/guide" element={<Guide/>}></Route>
        <Route path="/vet" element={<VetHome/>}></Route>
        <Route path="/vet-docs" element={<VetDocs/>}></Route>
        <Route path="/vet-book" element={<VetBook/>}></Route>
        <Route path="/dictionary" element={<Dictionary/>}></Route>
        <Route path="/groomer-book" element={<GroomerBook/>}></Route>
        <Route path="/volunteer" element={<Volunteer/>}></Route>
        <Route path="/news" element={<News/>}></Route>
        <Route path='/news2' element={<NewsPage/>}></Route>
        <Route path="/trainer" element={<PetServices/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route  path="/care-taker-book" element={<CareTaker/>}></Route>
      </Route>
    </>
    ));
  
    return <>
      <RouterProvider router={router}/> 
    </>
}

export default App
