import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }) {
  
  // --- Safety Checks ---
  const tickets = event.tickets || [];

  const prices = tickets.length > 0 ? tickets.map(t => t.price) : [0];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // All sold out check
  const allSoldOut = tickets.length > 0 && tickets.every(t => t.totalSeats === 0);

  return (
    <Link
      to={`/events/${event._id}`}
      className="group block rounded-2xl overflow-hidden shadow-xl 
                 hover:shadow-2xl hover:-translate-y-1
                 transition-all duration-500 border border-gray-100 bg-white"
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-95" />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold
                         bg-white/90 backdrop-blur-md text-gray-900 tracking-wide shadow-md">
          {event.category}
        </span>

        {/* SOLD OUT Badge */}
        {allSoldOut && (
          <span className="absolute top-4 right-4 px-4 py-1.5 bg-red-600 text-white 
                           text-xs font-bold rounded-full shadow-lg animate-pulse">
            SOLD OUT
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">

        {/* Title */}
        <h2
          className="text-xl font-bold text-gray-900 truncate 
                     group-hover:text-blue-600 transition-colors duration-300"
          title={event.title}
        >
          {event.title}
        </h2>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Calendar size={17} className="text-blue-600" />
          <span>{new Date(event.date).toDateString()}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin size={17} className="text-red-500" />
          <span className="truncate">{event.venue}</span>
        </div>

        {/* Price */}
        <p className="text-lg font-extrabold text-gray-900 mt-2 tracking-tight">
          ₹{minPrice}
          {minPrice !== maxPrice && (
            <span className="text-gray-500 font-semibold"> – ₹{maxPrice}</span>
          )}
        </p>

        {/* CTA Button */}
        <button
          disabled={allSoldOut}
          className={
            `mt-3 w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide 
             transition-all duration-500 shadow-md ` +
            (allSoldOut
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:shadow-purple-300")
          }
        >
          {allSoldOut ? "Sold Out" : "Book Now"}
        </button>

      </div>
    </Link>
  );
}
