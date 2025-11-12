import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-800 text-gray-300 px-4 sm:px-6 py-10 mb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-bold text-white">Libre-Shop</h2>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            Your trusted LibreShop partner for quality, reliability, and innovation in every device.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold text-white mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Laptops</a></li>
            <li><a href="#" className="hover:text-white transition">Phones</a></li>
            <li><a href="#" className="hover:text-white transition">Accessories</a></li>
            <li><a href="#" className="hover:text-white transition">Deals</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition">Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center sm:justify-start gap-3 hover:text-white transition">
              <FaFacebookF className="text-lg" />
              <a href="#">Facebook</a>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-3 hover:text-white transition">
              <FaTwitter className="text-lg" />
              <a href="#">Twitter</a>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-3 hover:text-white transition">
              <FaInstagram className="text-lg" />
              <a href="#">Instagram</a>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-3 hover:text-white transition">
              <FaLinkedin className="text-lg" />
              <a href="#">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-400 pt-6 text-center text-xs text-gray-300">
        &copy; {new Date().getFullYear()} Libre-Shop. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
