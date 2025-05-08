import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import "react-toastify/ReactToastify.css"
import ScrollAnimations from './Components/ScrollAnimations'
import MainLayout from './Layout/MainLayout'
import About from './Pages/About'
import AppointmentSuccess from './Pages/AppointmentSuccess'
import CareTaker from './Pages/CareTaker'
import Contact from './Pages/Contact'
import Dictionary from './Pages/Dictionary'
import GroomerBook from './Pages/GroomerBook'
import Home from './Pages/Home'
import Login from './Pages/Login'
import News from './Pages/News'
import NewsPage from './Pages/NewsPage'
import PetServices from './Pages/PetServices'
import ProductDirectory from './Pages/ProductDirectory'
import SignUp2 from './Pages/SignUp2'
import UserDashboard from './Pages/UserDashboard'
import VetBook from './Pages/VetBook'
import VetDocs from './Pages/VetDocs'
import VetHome from "./Pages/VetHome"
import Volunteer from "./Pages/Volunteer"

// For smooth scrolling
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Guide1 from './Pages/Guide1'
import GuideDisplay from './Pages/GuideDisplay'
import NGO from './Pages/NGO'
import Testing from './Pages/Testing'

gsap.registerPlugin(ScrollTrigger);
function App() {

  // useEffect(() => {
  //   // Initialize Lenis for smooth scrolling
  //   const lenis = new Lenis();

  //   // Synchronize Lenis scrolling with GSAP's ScrollTrigger
  //   lenis.on('scroll', ScrollTrigger.update);

  //   // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  //   });

  //   // Disable GSAP's lag smoothing
  //   gsap.ticker.lagSmoothing(0);

  //   return () => {
  //     gsap.ticker.remove((time) => {
  //       lenis.raf(time * 1000);
  //     });
  //     lenis.destroy(); // Cleanup on unmount
  //   };
  // }, []);

    const router = createBrowserRouter(createRoutesFromElements(
      <>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='sign-up' element={<SignUp2/>}></Route>
      <Route path='sample' element={<ScrollAnimations/>}></Route>
      <Route path="/testing" element={<Testing/>}></Route>
      {/* <Route path="/guide" element={<Guide/>}></Route> */}
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route  path="/shopping" element={<ProductDirectory/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path='/dashboard/:option' element={<UserDashboard/>}></Route>
        <Route path="/guide/:id" element={<Guide1/>}></Route>
        <Route path="/vet" element={<VetHome/>}></Route>
        <Route path="/vet-docs" element={<VetDocs/>}></Route>
        <Route path="/vet-book/:id" element={<VetBook/>}></Route>
        <Route path="/appointment-success" element={<AppointmentSuccess/>}></Route>
        <Route path="/dictionary" element={<Dictionary/>}></Route>
        <Route path="/groomer-book" element={<GroomerBook/>}></Route>
        <Route path="/volunteer" element={<Volunteer/>}></Route>
        <Route path="/news" element={<News/>}></Route>
        <Route path='/news2/:id' element={<NewsPage/>}></Route>
        <Route path="/trainer" element={<PetServices/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route  path="/care-taker-book" element={<CareTaker/>}></Route>
        <Route path="/ngo" element={<NGO/>}/>
        <Route path="/dictionary-list" element={<GuideDisplay/>}/>
        
      </Route>
    </>
    ));
  
    return <>
      <RouterProvider router={router}/> 
    </>
}

export default App



