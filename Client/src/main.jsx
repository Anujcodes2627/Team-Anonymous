import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "leaflet/dist/leaflet.css";

import { Provider } from "react-redux";
import store from "./redux/store.js";

import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Layout from "./Layout.jsx";

import LoginPage from "./Pages/LoginPage.jsx";

// Updated SignUp routes
import CitizenSignUp from "./Pages/Signup/CitizenSignUp.jsx";
import OrganizationSignUp from "./Pages/Signup/OrganizationSignUp.jsx";
import PolicyMakerSignUp from "./Pages/Signup/PolicyMakerSignUp.jsx";

import Dashboard from "./Pages/Dashboard.jsx";
import BlogsPage from "./Pages/BlogsPage.jsx";
import WasteClassification from "./Pages/WasteClassification.jsx";
// import Contact from "./Pages/Contact.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<LoginPage />} />

      {/* Signup Routes */}
      <Route path="Signup/citizen" element={<CitizenSignUp />} />
      <Route path="Signup/organization" element={<OrganizationSignUp />} />
      <Route path="Signup/policymaker" element={<PolicyMakerSignUp />} />

      {/* Other Routes */}
      <Route path="blogs" element={<BlogsPage />} />
      <Route path="waste" element={<WasteClassification />} />
      {/* <Route path="contact" element={<Contact />} /> */}
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
