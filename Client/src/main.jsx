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
<<<<<<< HEAD
import LoginPage from "./Pages/LoginPage.jsx";
import SignUp from "./Pages/SignUp.jsx";
=======
import Dashboard from "./Pages/Dashboard.jsx";
// import Contact from "./Pages/Contact.jsx";
>>>>>>> 46a8894192006719efc9456473f42d5c37b1a3fe

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
<<<<<<< HEAD
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUp />} />
=======
      {/* <Route path="contact" element={<Contact />} /> */}
      <Route path="dashboard" element={<Dashboard />} />
>>>>>>> 46a8894192006719efc9456473f42d5c37b1a3fe
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
