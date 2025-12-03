import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);

        // Select first ticket with remaining seats
        const firstAvailable = res.data.tickets.find(
          (t) => t.remainingSeats > 0
        );
        setSelectedTicket(firstAvailable || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!event) return <p className="text-center py-10">Event not found</p>;

  // SOLD OUT CHECK
  const allSoldOut = event.tickets.every((t) => t.remainingSeats === 0);

  // Max quantity allowed = remaining seats
  const maxQty = selectedTicket?.remainingSeats || 0;

  const isBookDisabled = allSoldOut || !selectedTicket || maxQty === 0;
  const total = selectedTicket ? selectedTicket.price * qty : 0;

  return (
    <div className="pt-24 pb-20">

      {/* Banner */}
      <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-2xl">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="w-full h-full object-cover brightness-75"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* SOLD OUT BADGE */}
        {allSoldOut && (
          <div className="absolute top-6 left-6 bg-red-600 text-white px-5 py-2 rounded-xl text-lg font-bold shadow-xl tracking-wide animate-pulse">
            SOLD OUT
          </div>
        )}

        <div className="absolute bottom-6 left-8 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-xl">
            {event.title}
          </h1>
          <p className="text-lg opacity-90">{event.category}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 mt-10 grid md:grid-cols-3 gap-10">

        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-6">

          {/* Event Info */}
          <div className="p-6 rounded-2xl bg-white shadow-xl backdrop-blur-lg">
            <h2 className="text-xl font-bold mb-4">Event Information</h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <Calendar className="text-blue-600" />
                <span>{format(new Date(event.date), "MMMM dd, yyyy")}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-purple-600" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 rounded-2xl bg-white shadow-xl">
            <h2 className="text-xl font-bold mb-3">About This Event</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {event.description}
            </p>
          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6 md:sticky md:top-28">

          <div className="p-6 rounded-2xl bg-white shadow-2xl border border-gray-100">

            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Ticket size={20} /> Tickets
            </h2>

            {/* Tickets Grid */}
            <div className="grid gap-4">
              {event.tickets.map((t) => {
                const isSoldOut = t.remainingSeats === 0;
                const isSelected = selectedTicket?._id === t._id;

                return (
                  <div
                    key={t._id}
                    onClick={() => {
                      if (!isSoldOut) {
                        setSelectedTicket(t);
                        setQty(1);
                      }
                    }}
                    className={`relative p-5 rounded-2xl border transition-all cursor-pointer select-none 
                    backdrop-blur-lg  
                    ${isSoldOut
                      ? "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed"
                      : isSelected
                        ? "border-blue-600 bg-blue-50 shadow-xl scale-[1.02]"
                        : "border-gray-300 hover:border-blue-400 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-lg">{t.type}</p>
                        <p className="text-gray-600 text-sm">₹{t.price}</p>
                      </div>

                      <span
                        className={`text-sm font-medium ${isSoldOut ? "text-red-600" : "text-green-600"}`}
                      >
                        {isSoldOut ? "Sold Out" : `${t.remainingSeats} seats`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantity Selector */}
            {selectedTicket && !allSoldOut && (
              <div className="mt-6">
                <p className="font-semibold mb-2">Select Quantity</p>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    className="w-10 h-10 rounded-xl border shadow-sm text-xl flex items-center justify-center hover:bg-gray-100"
                  >
                    –
                  </button>

                  <span className="text-xl font-bold w-8 text-center">{qty}</span>

                  <button
                    onClick={() => qty < maxQty && setQty(qty + 1)}
                    className={`w-10 h-10 rounded-xl border shadow-sm text-xl flex items-center justify-center 
                    ${qty === maxQty ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                  >
                    +
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Available: {maxQty} seats
                </p>
              </div>
            )}

            {/* Total */}
            <div className="mt-6 p-4 bg-gray-100 rounded-xl flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span className="text-blue-600 font-bold text-xl">₹{total}</span>
            </div>

            {/* Book Button */}
            <button
              disabled={isBookDisabled}
              className={`mt-6 w-full py-3 rounded-xl text-lg font-semibold transition-all shadow-xl
              ${isBookDisabled
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              {allSoldOut ? "Sold Out" : "Book Now"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
