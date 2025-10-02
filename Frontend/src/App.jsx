import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import "react-toastify/ReactToastify.css"
import ReportCrueltyForm from './components/NGO comp/ReportCrueltyForm'
import ScrollAnimations from './components/ScrollAnimations'
import MainLayout from './Layout/admin/AdminLayout'
import About from './Pages/admin/about'
import AppointmentSuccess from './Pages/admin/vets/components/AppointmentSuccess'
import CareTaker from './Pages/admin/services/components/CareTaker'
import Contact from './Pages/admin/contact'
import Dictionary from './Pages/admin/guide/Dictionary'
import GroomerBook from './Pages/admin/services/GroomerBook'
import Home from './Pages/admin/home'
import Login from './Pages/auth/login'
import News from './Pages/admin/news'
import NewsPage from './Pages/admin/news/NewsPage'
import PetServices from './Pages/admin/services'
import ProductDirectory from './Pages/admin/product/ProductDirectory'
import SignUp2 from './Pages/auth/signin/SignUp2'
import UserDashboard from './Pages/admin/profile/UserDashboard'
import VetBook from './Pages/admin/vets/VetBook'
import VetDocs from './Pages/admin/vets/VetDocs'
import VetHome from "./Pages/admin/vets"
import Volunteer from "./Pages/admin/ngo/Volunteer"
import Adopt from './Pages/admin/ngo/Adopt'
import Nearby from './Pages/admin/ngo/Nearby'
import Donate from './Pages/admin/ngo/Donate'
import AllCampaigns from './Pages/admin/ngo/AllCampaigns'
import List from './Pages/admin/List'
// For smooth scrolling
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Guide1 from './Pages/admin/guide/Guide1'
import GS from './Pages/admin/guide/Guide'
import GuideDisplay from './Pages/admin/guide/GuideDisplay'
import NGO from './Pages/admin/ngo'



gsap.registerPlugin(ScrollTrigger);
function App() {

    const router = createBrowserRouter(createRoutesFromElements(
      <>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='sign-up' element={<SignUp2/>}></Route>
      <Route path='sample' element={<ScrollAnimations/>}></Route>
      {/* <Route path="/guide" element={<Guide/>}></Route> */}
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home/>}></Route>
        <Route  path="/shopping" element={<ProductDirectory/>}></Route>
        <Route path="/list" element={<List/>}></Route>
        <Route path='/dashboard/:option' element={<UserDashboard/>}></Route>
        <Route path="/guide/:id" element={<Guide1/>}></Route>
        <Route path="/gs" element={<GS/>}></Route>
        <Route path="/vet" element={<VetHome/>}></Route>
        <Route path="/vet-docs" element={<VetDocs/>}></Route>
        <Route path="/vet-book/:id" element={<VetBook/>}></Route>
        <Route path="/appointment-success" element={<AppointmentSuccess/>}></Route>
        <Route path="/guide" element={<Dictionary/>}></Route>
        <Route path="/groomer-book" element={<GroomerBook/>}></Route>
        <Route path="/volunteer" element={<Volunteer/>}></Route>
        <Route path="/ngo/adopt" element={<Adopt/>}></Route>
        <Route path="/ngo/nearby" element={<Nearby/>}></Route>
        <Route path="/ngo/donate" element={<Donate/>}></Route>
        <Route path="/ngo/campaigns" element={<AllCampaigns/>}></Route>
        <Route path="/news" element={<News/>}></Route>
        <Route path='/news/:id' element={<NewsPage/>}></Route>
        <Route path="/services" element={<PetServices/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route  path="/care-taker-book" element={<CareTaker/>}></Route>
        <Route path="/ngo" element={<NGO/>}/>
        <Route path="/guide-list" element={<GuideDisplay/>}/>
        <Route path="/report-cruelty" element={<ReportCrueltyForm/>}/>
      </Route>
    </>
    )
  ,
  {
    basename:"/petopia"
  }
  );
  
    return <>
      <RouterProvider router={router}/> 
    </>
}

export default App
