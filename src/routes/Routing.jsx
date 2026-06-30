import { Route, Routes, useLocation } from "react-router-dom";
import Blogs from "../pages/Blogs/Blogs";
import Blog from "../pages/Blog/Blog";
import Testimonials from "../pages/Testimonials/Index";
import JobsList from "../pages/Jobs/JobsList";
import About from "../pages/About";
import Careers from "../pages/Careers";
import Layout from "../layout/MainLayout";
import PlaneAnimation from "../components/ui/FormPlaneAnimation/PlaneAnimation";
import Gallery from "../pages/Gallery/Gallery";
import ContactUs from "../pages/ContactUs";
import JobDetails from "../components/Careers/JobDetails/JobDetails";
import Home from "../pages/Home/Index";
import CarrierJobForm from "../components/Careers/CarrierJobForm/CarrierJobForm";
import Notfound from "../pages/NotFound/Notfound";
import GetEstimatePage from "../pages/GetEstimate";
// import Login from "../components/login/Login";
import InteriorEstimate from "../components/GetEstimate/InteriorEstimate/InteriorEstimate";
import Privacy from "../components/PrivacyPolicy/Privacy";
import Terms from "../components/TermsOfUse/Terms";
import Profile from "../components/UserProfile/Profile";
import UserDetails from "../components/UserProfile/UserDetails/UserDetails";
import UserGallery from "../components/UserProfile/UserGallery/UserGallery";
import UserLeads from "../components/UserProfile/UserLeads/UserLeads";
import LeadDetails from "../components/UserProfile/LeadDetails/LeadDetails";
import UploadedFiles from "../components/UserProfile/UploadedFiles/UploadedFiles";
import UserBlogs from "../components/UserProfile/UserBolgs/UserBlogs";
import BlogView from "../components/UserProfile/UserBolgs/Blog/BlogView";
import ProtectedRoute from "./ProtectedRoute";

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/user" element={<UserDetails />} />
          <Route path="/profile/gallery" element={<UserGallery />} />
          <Route path="/profile/blogs" element={<UserBlogs />} />
          <Route path="/profile/blogs/:id" element={<BlogView />} />
          <Route path="/profile/generated-leads" element={<UserLeads />} />
          <Route
            path="/profile/generated-leads/:id"
            element={<LeadDetails />}
          />
          <Route
            path="/profile/generated-leads/:id/uploaded-files"
            element={<UploadedFiles />}
          />
        </Route>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/testmonials" element={<Testimonials />} />
        <Route path="/job-list" element={<JobsList />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/verified" element={<PlaneAnimation />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/apply-now/:id" element={<CarrierJobForm />} />
        <Route path="/get-estimate" element={<GetEstimatePage />} />
        <Route path="/interior-estimate/:id" element={<InteriorEstimate />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-use" element={<Terms />} />
      </Route>
    </Routes>
  );
};
