import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./components/auth/Register";
import Service from "./components/services/Service";
import AddService from "./components/services/AddService";
import AddTeam from "./components/Team/AddTeam";
import Team from "./components/Team/Team";
import Products from "./components/products/Products";
import AddProduct from "./components/products/AddProduct";
import AboutUs from "./components/common/AboutUs";
import ContactUs from "./components/common/ContactUs";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Touch from "./components/common/Touch";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className=" my-5 container border d-flex flex-column justify-content-center align-items-center"
          style={{ height: "20rem" }}
        >
          <h1 className="fs-3  text-center"> Welcome to Shree Tech</h1>
          <h1 className="fs-3 text-center">
            Innovating your ideas with technology solutions
          </h1>
        </section>
        {/* About Us */}
        <section className="py-12 bg-white">
          <AboutUs />
        </section>

        {/* Services */}
        <section className="py-12 bg-gray-100">
          <Service />
        </section>

        {/* Team */}
        <section className="py-12 bg-white">
          <Team />
        </section>

        {/* Products */}
        <section className="py-12 bg-gray-100">
          <Products />
        </section>

        {/* Contact Us */}
        <section className="py-12 bg-white">
          <ContactUs />
        </section>

        {/* Get In Touch */}
        <section className="py-12 bg-gray-100">
          <Touch />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
