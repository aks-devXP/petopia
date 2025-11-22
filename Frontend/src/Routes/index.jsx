import { Navigate, Route } from "react-router-dom";

// Layout
import MainLayout from "../Layout/admin/AdminLayout";

// Auth
import SignIn from "@/Pages/auth";
// Common
import About from "@/Pages/admin/about";
import Appointment from "@/Pages/admin/appointment";
import Contact from "@/Pages/admin/contact";
import Home from "@/Pages/admin/home";
import Welcome from "@/Pages/admin/welcome";
// Vets
import VetHome from "@/Pages/admin/vets";
import VetBook from "@/Pages/admin/vets/VetBook";
import VetDocs from "@/Pages/admin/vets/VetDocs";
import AppointmentSuccess from "@/Pages/admin/vets/components/AppointmentSuccess";

// Services
import ProviderBooking from "@/Pages/admin/booking/ProviderBooking";
import PetServices from "@/Pages/admin/petservice";
import ServiceDetailPage from "@/Pages/admin/petservice/ServiceDetailPage";
import ServiceListPage from "@/Pages/admin/petservice/ServiceListPage";
import GroomerBook from "@/Pages/admin/services/GroomerBook";
import CareTaker from "@/Pages/admin/services/components/CareTaker";

// NGO
import NGO from "@/Pages/admin/ngo";
import Adopt from "@/Pages/admin/ngo/Adopt";
import AllCampaigns from "@/Pages/admin/ngo/AllCampaigns";
import Donate from "@/Pages/admin/ngo/Donate";
import Nearby from "@/Pages/admin/ngo/Nearby";
import Volunteer from "@/Pages/admin/ngo/Volunteer";
import ReportCrueltyForm from "../components/NGO comp/ReportCrueltyForm";

// News
import News from "@/Pages/admin/news";
import NewsPage from "@/Pages/admin/news/NewsPage";

//  Breed Info 
import BreedInfo from "@/Pages/admin/breedInfo";
import BreedList from "@/Pages/admin/breedList";
import NGO_Home from "@/Pages/admin/ngo/NGO_Home";
import UserEditor from "@/Pages/admin/usereditor";
import RequireAuth from "./RequireAuth";

const routes = (
  <>
    {/* Auth Routes */}
    <Route path="/sign-in" element={<SignIn />} />



    <Route path="/groomer-book" element={<GroomerBook />} />
    <Route path="/care-taker-book" element={<CareTaker />} />
    

    {/* Main Layout Routes */}
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Navigate to="/welcome" replace />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/sample" element={<NGO_Home />} />
      
      
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* User */}
      {/* <Route path="/dashboard/:option" element={<UserDashboard />} /> */}

      {/* Breed Info */}
      <Route path="/breed-info" element={<BreedList />} />
      <Route path="/breed-info/:slug" element={<BreedInfo />} />

      {/* Vets */}
      <Route path="/vet" element={<VetHome />} />
      <Route path="/vet-docs" element={<VetDocs />} />
      <Route path="/vet-book/:id" element={<VetBook />} />

      {/* Services */}
      <Route path='/pet-services' element={<PetServices />} />
      <Route path="/pet-services/:type" element={<ServiceListPage />} />
      <Route path="/pet-services/:type/:id" element={<ServiceDetailPage />} />
      <Route path="/book/:type/:id" element={<ProviderBooking />} />

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
      {/* Protected Routes */}
      <Route element={<RequireAuth/>}>
      <Route path="/appointment-success" element={<AppointmentSuccess />} />
      <Route path="/appointments" element={<Appointment />} />
      <Route path="/home" element={<Home />} />
      <Route path="/edit-user" element={<UserEditor />} />
      </Route>
    </Route>
  </>
);

export default routes;
