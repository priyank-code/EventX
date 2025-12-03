import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function BookTicket() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/all");
        setEvents(res.data);

        const initialQuantities = {};
        res.data.forEach((event) => {
          event.tickets.forEach((ticket) => {
            initialQuantities[ticket._id] = 1;
          });
        });
        setQuantities(initialQuantities);
      } catch {
        toast.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const addToCart = (event, ticket) => {
    const quantity = quantities[ticket._id] || 1;
    if (quantity > ticket.remainingSeats) {
      toast.error("Not enough seats available");
      return;
    }

    const existingIndex = cart.findIndex(
      (c) => c.eventId === event._id && c.ticketId === ticket._id
    );

    if (existingIndex >= 0) {
      const newCart = [...cart];
      const newQty = newCart[existingIndex].quantity + quantity;
      if (newQty > ticket.remainingSeats) {
        toast.error("Not enough seats available");
        return;
      }
      newCart[existingIndex].quantity = newQty;
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        {
          eventId: event._id,
          ticketId: ticket._id,
          eventName: event.title,
          ticketType: ticket.type,
          price: ticket.price,
          quantity,
        },
      ]);
    }
    toast.success(`${ticket.type} added to cart`);
  };

  const removeFromCart = (ticketId) => {
    setCart(cart.filter((item) => item.ticketId !== ticketId));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return toast.error("Cart is empty");

    try {
      for (const item of cart) {
        await axios.post(
          "http://localhost:5000/api/tickets/buy",
          {
            eventId: item.eventId,
            ticketType: item.ticketType,
            quantity: item.quantity,
          },
          { withCredentials: true }
        );
      }
      toast.success("Tickets booked successfully!");
      setCart([]);
      setIsCartOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Booking failed");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-700">Loading events...</div>
    );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-10">
      {/* Page Header + Cart Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Book Your Tickets
        </h1>

        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg px-4 py-2 transition-all duration-300 flex"
        >
          Cart {cart.length}
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="relative h-40 sm:h-48">
              <img
                src={event.bannerUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-white/90 px-3 py-0.5 rounded-full text-gray-900 font-semibold text-xs">
                {new Date(event.date).toLocaleDateString("en-GB")}
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {event.title}
                </h2>
                <p className="text-gray-500 text-sm truncate">{event.venue}</p>
                <p className="text-gray-400 text-sm line-clamp-2 mt-1">
                  {event.description}
                </p>
              </div>

              {/* Tickets */}
              <div className="mt-3 space-y-2">
                {event.tickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="flex justify-between items-center border border-gray-200 rounded-lg p-2 hover:shadow transition"
                  >
                    {/* Ticket Info */}
                    <div className="text-sm flex-1">
                      <div className="font-semibold text-gray-900">
                        {ticket.type}
                      </div>
                      <div className="text-gray-500">₹{ticket.price}</div>
                      <div className="text-gray-400 text-xs">
                        {ticket.remainingSeats} left
                      </div>
                    </div>

                    {/* Quantity + Add Button */}
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={ticket.remainingSeats}
                        value={quantities[ticket._id] || 1}
                        onChange={(e) =>
                          setQuantities({
                            ...quantities,
                            [ticket._id]: Math.min(
                              ticket.remainingSeats,
                              Math.max(1, parseInt(e.target.value) || 1)
                            ),
                          })
                        }
                        className="w-12 border border-gray-300 rounded-md p-1 text-center text-sm"
                      />

                      <button
                        onClick={() => addToCart(event, ticket)}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 flex justify-end">
          <div className="bg-white h-full w-full max-w-md p-6 shadow-2xl rounded-l-2xl flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-900 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-600 mt-4">Your cart is empty</p>
            ) : (
              <>
                <ul className="space-y-2 flex-1">
                  {cart.map((item) => (
                    <li
                      key={item.ticketId}
                      className="flex justify-between items-center border border-gray-200 rounded-lg p-2 text-sm"
                    >
                      <span className="text-gray-900">
                        {item.eventName} — {item.ticketType} x {item.quantity}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-xs"
                          onClick={() => removeFromCart(item.ticketId)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex justify-between items-center flex-col sm:flex-row gap-3">
                  <span className="font-bold text-lg text-gray-900">
                    Total: ₹{totalAmount}
                  </span>

                  <button
                    onClick={handleCheckout}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold text-sm"
                  >
                    Book Tickets
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
