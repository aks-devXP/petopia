import React from "react";
import { Navigate, Route } from "react-router-dom";

// Layout
import MainLayout from "../Layout/admin/AdminLayout";

// Auth
import SignIn from "@/Pages/auth";
// Common
import ScrollAnimations from "../components/ScrollAnimations";
import List from "@/Pages/admin/List";
import Home from "@/Pages/admin/home";
import About from "@/Pages/admin/about";
import Contact from "@/Pages/admin/contact";
import ProductDirectory from "@/Pages/admin/product/ProductDirectory";
import UserDashboard from "@/Pages/admin/profile/UserDashboard";
import Welcome from "@/Pages/admin/welcome";
import Appointment from "@/Pages/admin/appointment";
import UserEditor from "@/Pages/admin/usereditor";
// Vets
import VetHome from "@/Pages/admin/vets";
import VetDocs from "@/Pages/admin/vets/VetDocs";
import VetBook from "@/Pages/admin/vets/VetBook";
import AppointmentSuccess from "@/Pages/admin/vets/components/AppointmentSuccess";

// Services
import Services from "@/Pages/admin/services";
import GroomerBook from "@/Pages/admin/services/GroomerBook";
import CareTaker from "@/Pages/admin/services/components/CareTaker";
import PetServices from "@/Pages/admin/petservice";
import ServiceListPage from "@/Pages/admin/petservice/ServiceListPage";
import ServiceDetailPage from "@/Pages/admin/petservice/ServiceDetailPage";

// NGO
import NGO from "@/Pages/admin/ngo";
import Adopt from "@/Pages/admin/ngo/Adopt";
import Nearby from "@/Pages/admin/ngo/Nearby";
import Donate from "@/Pages/admin/ngo/Donate";
import AllCampaigns from "@/Pages/admin/ngo/AllCampaigns";
import Volunteer from "@/Pages/admin/ngo/Volunteer";
import ReportCrueltyForm from "../components/NGO comp/ReportCrueltyForm";

// News
import News from "@/Pages/admin/news";
import NewsPage from "@/Pages/admin/news/NewsPage";

//  Breed Info 
import BreedList from "@/Pages/admin/breedList";
import BreedInfo from "@/Pages/admin/breedInfo"; 

const routes = (
  <>
    {/* Auth Routes */}
    <Route path="/sign-in" element={<SignIn />} />



    <Route path="/sample" element={<ScrollAnimations />} />
    <Route path="/groomer-book" element={<GroomerBook />} />
    <Route path="/care-taker-book" element={<CareTaker />} />
    

    {/* Main Layout Routes */}
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/appointments" element={<Appointment />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/edit-user" element={<UserEditor />} />

      {/* User */}
      <Route path="/dashboard/:option" element={<UserDashboard />} />

      {/* Breed Info */}
      <Route path="/breed-info" element={<BreedList />} />
      <Route path="/breed-info/:slug" element={<BreedInfo />} />

      {/* Vets */}
      <Route path="/vet" element={<VetHome />} />
      <Route path="/vet-docs" element={<VetDocs />} />
      <Route path="/vet-book/:id" element={<VetBook />} />
      <Route path="/appointment-success" element={<AppointmentSuccess />} />

      {/* Services */}
      <Route path='/pet-services' element={<PetServices />} />
      <Route path="/pet-services/:type" element={<ServiceListPage />} />
      <Route path="/pet-services/:type/:id" element={<ServiceDetailPage />} />

      {/* NGO */}
      <Route path="/ngo" element={<NGO />} />
      <Route path="/ngo/adopt" element={<Adopt />} />
      <Route path="/ngo/nearby" element={<Nearby />} />
      <Route path="/ngo/donate" element={<Donate />} />
      <Route path="/ngo/campaigns" element={<AllCampaigns />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/report-cruelty" element={<ReportCrueltyForm />} />

      {/* News */}
      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<NewsPage />} />
    </Route>
  </>
);

export default routes;
