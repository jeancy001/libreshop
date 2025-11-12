import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "./NavBar";
import SingleProduct from "../screens/SingleProduct";
import CartPage from "../screens/CartPage";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import RecoveryAccount from "../pages/RecoveryAccount";
import RedirectPage from "../pages/RedirectPage";
import ProfilePage from "../components/ProfilePage";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Dashboard from "../dashboard/Dashboard";
import Shopping from "../components/Shopping";
import Contact from "../components/Contact";

const AppRoute: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      {/* Page container with flex layout */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* Main content area grows to push footer down */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
            {user && <Route path="/profile" element={<ProfilePage />} />}
            {user && <Route path="/shop" element={<Shopping />} />}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/recovery" element={<RecoveryAccount />} />
            <Route path="/redirect" element={<RedirectPage />} />
            {user && user.role === "admin" && (
              <Route path="/dash" element={<Dashboard />} />
            )}
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        {/* Footer stays at bottom */}
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoute;
