import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const isHeroPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll bg for md and larger screens
      if (window.innerWidth >= 768) {
        setScrolled(window.scrollY > window.innerHeight - 80); 
        // Hero section approx height => can adjust
      } else {
        setScrolled(false); // mobile stays normal
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      {/* Background Dynamic */}
      <div
        className={`transition-all duration-300 
          ${
            isHeroPage
              ? scrolled
                ? "bg-black/40 backdrop-blur-lg"   // after scroll (md+ only)
                : "bg-white/20 backdrop-blur-lg"  // before scroll
              : "bg-white shadow-md"              // other pages
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            className={`text-2xl font-bold cursor-pointer
              ${
                isHeroPage
                  ? scrolled
                    ? "text-white"
                    : "text-white drop-shadow" // hero default
                  : "text-black"
              }
            `}
          >
            EventX
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setOpen(!open)}
            className={`text-3xl md:hidden 
              ${isHeroPage ? "text-white" : "text-black"}
            `}
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <ul
            className={`hidden md:flex gap-8 font-semibold items-center 
              ${
                isHeroPage
                  ? scrolled
                    ? "text-white"
                    : "text-white"
                  : "text-black"
              }
            `}
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>

            <Link to="/register">
              <button className="bg-blue-600 px-4 py-2 rounded-lg text-white font-bold">
                Register
              </button>
            </Link>
          </ul>

        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-white shadow-xl">
            <ul className="flex flex-col gap-5 p-6 text-black font-semibold">
              <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setOpen(false)}>About Us</Link></li>
              <li><Link to="/events" onClick={() => setOpen(false)}>Events</Link></li>
              <li><Link to="/contact" onClick={() => setOpen(false)}>Contact Us</Link></li>

              <Link to="/register" onClick={() => setOpen(false)}>
                <button className="bg-black w-full text-white py-2 rounded-lg font-bold">
                  Register
                </button>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
