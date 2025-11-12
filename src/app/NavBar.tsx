import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, ShoppingBag  } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaCog, FaLifeRing } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store/store';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModalUser, setOpenModalUser] = useState<boolean>(false);
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleModalUser = () => {
    setOpenModalUser(!openModalUser);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
<div
  onClick={() => navigate('/')}
  className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
>
  <ShoppingBag className="w-8 h-8 text-pink-600" strokeWidth={2.5} />
  <span className="text-2xl font-bold text-pink-600">LibreShop</span>
</div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="text-gray-700 hover:text-pink-600 transition">Home</a>
          <a href="/shop" className="text-gray-700 hover:text-pink-600 transition">Shop</a>
          {user && user.role === "admin" ? (
            <a href="/dash" className="text-gray-700 hover:text-pink-600 transition">Dashboard</a>
          ) : (
            <a href="/contact" className="text-gray-700 hover:text-pink-600 transition">Contact</a>
          )}

          <div className="relative flex items-center cursor-pointer">
            <ShoppingCart
              onClick={() => navigate('/cart')}
              className="w-6 h-6 text-gray-700 hover:text-pink-600 transition"
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>

          <User
            onClick={handleModalUser}
            className="w-6 h-6 text-gray-700 hover:text-pink-600 cursor-pointer transition"
          />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-sm">
          <a href="/" className="block text-gray-700 hover:text-pink-600">Home</a>
          <a href="/shop" className="block text-gray-700 hover:text-pink-600">Shop</a>
          <a href="/contact" className="block text-gray-700 hover:text-pink-600">Contact</a>
          <div className="flex items-center space-x-4 pt-2">
            <div className="relative">
              <ShoppingCart
                onClick={() => navigate('/cart')}
                className="w-6 h-6 text-gray-700 hover:text-pink-600 cursor-pointer"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
            <User
              onClick={handleModalUser}
              className="w-6 h-6 text-gray-700 hover:text-pink-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* User Menu Modal */}
      {openModalUser && (
        <>
          {/* Mobile View Modal */}
          <div className="fixed inset-0 z-50 bg-white p-6 md:hidden overflow-y-auto shadow-xl">
            <div className="flex items-center space-x-4 mb-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user?.profileUrl ? user.profileUrl : "/profile.png"}
                alt={user?.username}
              />
              <a href="#" className="text-lg font-semibold text-gray-800 hover:border-b-2 border-pink-600">{user?.username}</a>
              <a href={user ? "/profile" : "/login"} className="text-pink-600 hover:underline">Profile</a>
            </div>

            <div className="flex flex-col space-y-4 text-gray-700 text-base">
              <span className="flex items-center gap-3 hover:text-pink-600 cursor-pointer">
                <FaCog /> Settings
              </span>
              <span className="flex items-center gap-3 hover:text-pink-600 cursor-pointer">
                <FaLifeRing /> Support
              </span>
              {user ? (
                <span
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                  className="flex items-center gap-2 hover:text-pink-600 cursor-pointer"
                >
                  <FaSignInAlt /> Logout
                </span>
              ) : (
                <span
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 hover:text-pink-600 cursor-pointer"
                >
                  <FaSignInAlt /> Login
                </span>
              )}
            </div>
            <button
              onClick={() => setOpenModalUser(false)}
              className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>

          {/* Desktop Dropdown */}
          <div className="hidden md:block absolute top-16 right-4 z-50 bg-white shadow-lg rounded-lg w-72 p-5 border">
            <div className="flex items-center space-x-4 mb-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user?.profileUrl ? user.profileUrl : "/profile.png"}
                alt={user?.username}
              />
              <a href="#" className="text-lg font-semibold text-gray-800 hover:border-b-2 border-pink-600">{user?.username}</a>
              <a href={user ? "/profile" : "/login"} className="text-pink-600 hover:underline">Profile</a>
            </div>

            <div className="flex flex-col space-y-3 text-gray-700 text-sm">
              <span className="flex items-center gap-2 hover:text-pink-600 cursor-pointer">
                <FaCog /> Settings
              </span>
              <span className="flex items-center gap-2 hover:text-pink-600 cursor-pointer">
                <FaLifeRing /> Support
              </span>
              {user ? (
                <span
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                  className="flex items-center gap-2 hover:text-pink-600 cursor-pointer"
                >
                  <FaSignInAlt /> Logout
                </span>
              ) : (
                <span
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 hover:text-pink-600 cursor-pointer"
                >
                  <FaSignInAlt /> Login
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
