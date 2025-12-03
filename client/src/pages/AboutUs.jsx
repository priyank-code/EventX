import React from "react";
import { FaUsers, FaCalendarAlt, FaTicketAlt, FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="w-full bg-gray-50 text-gray-800 pt-20">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-700 text-white py-24 px-6 text-center shadow-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          About <span className="text-yellow-300">EventX</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mt-6 opacity-90 leading-relaxed">
          A next-generation platform redefining event management, ticketing, and attendee engagement with cutting-edge technology.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-14">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To empower creators and organizations with seamless event management tools, enabling effortless planning, promotion,
            and ticketing — all while ensuring the best possible experience for attendees worldwide.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To become the most trusted and innovative global event tech platform, celebrated for reliability, user-centric design,
            and a commitment to transforming experiences.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white border-y">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          What We Provide
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          {[
            {
              icon: <FaUsers className="text-5xl text-blue-600" />,
              title: "User Management",
              text: "Manage organizers, attendees, profiles, and permissions seamlessly."
            },
            {
              icon: <FaCalendarAlt className="text-5xl text-purple-600" />,
              title: "Smart Event Scheduling",
              text: "Create, schedule, and promote events with streamlined automation."
            },
            {
              icon: <FaTicketAlt className="text-5xl text-green-600" />,
              title: "Advanced Ticketing",
              text: "Sell tickets securely with real-time analytics and payment insights."
            },
            {
              icon: <FaHandsHelping className="text-5xl text-red-600" />,
              title: "Dedicated Support",
              text: "End-to-end customer support with tools that drive engagement."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-10 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Meet Our Leadership
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              img: "https://i.pravatar.cc/150?img=68",
              name: "Priyank Vaghani",
              role: "CEO & Founder"
            },
            {
              img: "https://i.pravatar.cc/150?img=33",
              name: "Anjali Mehta",
              role: "CTO"
            },
            {
              img: "https://i.pravatar.cc/150?img=34",
              name: "Rohit Sharma",
              role: "Head of Design"
            }
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-md"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-10 mb-5 px-6 bg-gradient-to-br from-blue-700 to-purple-700 text-white text-center rounded-3xl mx-6 md:mx-auto max-w-5xl shadow-2xl mt-20">
        <h2 className="text-4xl font-bold mb-4">Ready to Build Your Event?</h2>
        <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">
          Join EventX today — make your event management simple, smart, and powerful.
        </p>

        <div className="flex justify-center gap-4">

          {/* Contact Us Button */}
          <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-xl text-lg hover:bg-white hover:text-blue-700 transition">
            <Link to="/contact">Contact Us</Link>
          </button>
        </div>
      </section>
    </div>
  );
}
