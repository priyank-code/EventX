import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Hero from "./Hero";
import EventCard from "../components/EventCard";
import OrganizerForm from "./OrganizerForm";
import CategorySection from "./CategorySection";
import { fetchEvents } from "../features/events/eventsSlice";
import { Link } from "react-router-dom";
import UserReviews from "./UserReviews";

export default function Home() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Only first 6 events
  const limitedEvents = events.slice(0, 6);

  return (
    <>
      {/* HERO SECTION */}
      <Hero />

      {/* UPCOMING EVENTS SECTION */}
      <section className="max-w-7xl mx-auto p-6 mt-10 mb-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Upcoming Events
        </h1>

        {loading && <p className="text-gray-600">Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {limitedEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        {events.length > 6 && (
          <div className="text-center mt-8">
            <Link
              to="/events"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold
                         hover:bg-blue-700 transition-all duration-300 shadow-md"
            >
              View All Events
            </Link>
          </div>
        )}
      </section>

      {/* Category Section */}
      <CategorySection events={events} />

      {/* Organize Event Form */}
      <OrganizerForm />

      {/* Testimonial  */}
      <UserReviews />
    </>
  );
}
