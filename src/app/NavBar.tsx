import React, { useState } from "react";
import { ShoppingCart, User, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaCog, FaLifeRing } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../features/store/store";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [openModalUser, setOpenModalUser] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed bg-white shadow-md sticky top-0 z-50 border-b-5  border-b-10 ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-4 items-center justify-between">

        {/* LEFT — COMPANY LOGO */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 cursor-pointer transition hover:scale-105"
        >
          <ShoppingBag className="w-8 h-8 text-pink-600" />
          <span className="text-2xl font-bold text-pink-600">LibreShop</span>
        </div>

        {/* CENTER — MENU LINKS (Always visible) */}
        <div className="flex items-center gap-6 text-gray-700 mx-auto">
          <a href="/" className="nav-link hover:text-pink-600 font-medium">Home</a>
          <a href="/shop" className="nav-link hover:text-pink-600 font-medium">Shop</a>

          {user?.role === "admin" ? (
            <a href="/dash" className="nav-link hover:text-pink-600 font-medium">Dashboard</a>
          ) : (
            <a href="/contact" className="nav-link hover:text-pink-600 font-medium">Contact</a>
          )}
        </div>

        {/* RIGHT — CART + USER */}
        <div className="flex items-center gap-6">

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-pink-600" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* USER */}
          <User
            onClick={() => setOpenModalUser(true)}
            className="w-6 h-6 cursor-pointer text-gray-700 hover:text-pink-600"
          />
        </div>
      </div>

      {/* USER MODAL */}
      {openModalUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl w-80 p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={user?.profileUrl || "/profile.png"}
                alt="profile"
              />
              <div>
                <p className="font-semibold text-gray-800">{user?.username}</p>
                <a href="/profile" className="text-pink-600 text-sm hover:underline">
                  View Profile
                </a>
              </div>
            </div>

            <div className="space-y-3 text-gray-700 text-sm">
              <button className="user-option"><FaCog /> Settings</button>
              <button className="user-option"><FaLifeRing /> Support</button>

              {user ? (
                <button
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                  className="user-option text-red-600"
                >
                  <FaSignInAlt /> Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="user-option"
                >
                  <FaSignInAlt /> Login
                </button>
              )}
            </div>

            <button
              onClick={() => setOpenModalUser(false)}
              className="mt-5 bg-pink-600 text-white w-full py-2 rounded-lg hover:bg-pink-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
