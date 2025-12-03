import React from "react";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background Video */}
      <video
        src="https://www.pexels.com/download/video/2022395/"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>

      {/* Mobile Nav Blur (Only mobile) */}
      <div className="
        absolute top-0 left-0 w-full h-16
        bg-black/30 backdrop-blur-xl
        md:bg-transparent md:backdrop-blur-0
      "></div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">

        {/* Title */}
        <h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl animate-fade-in"
        >
          Discover Unforgettable Events
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg md:text-xl max-w-2xl opacity-90 leading-relaxed animate-fade-in delay-200">
          Explore concerts, festivals, stand-up shows and exclusive experiences happening near you.
        </p>

        {/* CTA Button */}
        <a
          href="/events"
          className="mt-8 bg-blue-600 hover:bg-blue-700 
                     px-8 py-3 text-lg rounded-xl font-semibold 
                     shadow-xl transition-all duration-300
                     animate-fade-in delay-300"
        >
          Explore Events
        </a>

        {/* Floating Search Box */}
        <div
          className="mt-10 bg-white/10 backdrop-blur-xl border border-white/20 
                     rounded-2xl px-4 py-3 w-full max-w-lg flex items-center gap-3 
                     shadow-2xl animate-fade-in delay-500"
        >
          <Search className="text-white opacity-80" size={22} />
          <input
            type="text"
            placeholder="Search events, concerts, categories..."
            className="w-full bg-transparent outline-none text-white placeholder-white/60"
          />
        </div>

      </div>
    </div>
  );
}
