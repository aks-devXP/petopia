import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Guide from './pages/Guide'
import Home from './pages/Home'
import News from './pages/News'
import NewsPage from './pages/NewsPage'
import Signup from './pages/Signup'
import VetHome from "./pages/VetHome"
import VetDocs from './Pages/VetDocs'
import Volunteer from "./pages/Volunteer"
import UserDashboard from './Pages/UserDashboard'
import VetBook from './Pages/VetBook'
import Dictionary from "./pages/Dictionary"
import Login from './Pages/Login'
import Trainer from './Pages/Trainer'
import TrainerBooking from './Pages/TrainerBooking'
// import ScrollToTop from './Components/ScrollToTop'
import ScrollAnimations from './Components/ScrollAnimations'

import "react-toastify/ReactToastify.css";
// For smooth scrolling
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect } from 'react'

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
      <Route path='sign-up' element={<Signup/>}></Route>
      <Route path='sample' element={<ScrollAnimations/>}></Route>
      
      
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='/dashboard' element={<UserDashboard/>}></Route>

        <Route path="/home" element={<Home/>}></Route>
        <Route path="/guide" element={<Guide/>}></Route>
        <Route path="/vet" element={<VetHome/>}></Route>
        <Route path="/vet-docs" element={<VetDocs/>}></Route>
        <Route path="/vet-book" element={<VetBook/>}></Route>
        <Route path="/dictionary" element={<Dictionary/>}></Route>
        <Route path="/volunteer" element={<Volunteer/>}></Route>
        <Route path='/book-trainer' element={<TrainerBooking/>}></Route>
        <Route path="/news" element={<News/>}></Route>
        <Route path='/news2' element={<NewsPage/>}></Route>
        <Route path="/trainer" element={<Trainer/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Route>
    </>
    ));
  
    return <>
      <RouterProvider router={router}/> 
    </>
}

export default App
