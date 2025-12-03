import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-white">EventX</h1>
          <p className="text-gray-400">
            The ultimate platform to manage and book events effortlessly.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-white transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact Us</h2>

          {/* Updated SURAT Address */}
          <p className="text-gray-400 font-semibold">Infinity Tower</p>

          <p className="text-gray-400">
            Lal Darwaja, Varachha, Surat, Gujarat 395008
          </p>

          <p className="text-gray-400 mt-3">Email: support@eventx.com</p>
          <p className="text-gray-400 mt-1">Phone: +91 98765 43210</p>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Newsletter</h2>
          <p className="text-gray-400 mb-4">
            Subscribe to get latest updates about events.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-lg focus:outline-none text-white border border-gray-400 border-r-0"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} EventX. All rights reserved.
      </div>
    </footer>
  );
}
