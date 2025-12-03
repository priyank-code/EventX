import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tickets/my", {
          withCredentials: true,
        });
        setTickets(res.data.tickets || []);
      } catch (err) {
        toast.error("Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const downloadPDF = async (ticket) => {
    const quantity = ticket.quantity || 1; // fallback to 1
    const container = document.createElement("div");
    container.style.width = "500px";
    container.style.padding = "20px";
    container.style.background = "#FDFDFD";
    container.style.color = "#1F2937";
    container.style.fontFamily = "'Inter', sans-serif";
    container.style.borderRadius = "12px";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";

    // Banner
    const banner = document.createElement("img");
    banner.src = ticket.eventId.bannerUrl;
    banner.crossOrigin = "anonymous";
    banner.style.width = "100%";
    banner.style.borderRadius = "10px";
    banner.style.objectFit = "cover";
    container.appendChild(banner);
    await new Promise((resolve) => (banner.onload = resolve));

    // Title
    const title = document.createElement("h2");
    title.innerText = ticket.eventId.title;
    title.style.margin = "15px 0 5px 0";
    title.style.fontSize = "22px";
    title.style.fontWeight = "700";
    container.appendChild(title);

    // Badge: Type • Amount • Quantity
    const badge = document.createElement("div");
    badge.innerText = `${ticket.ticketType} • ₹${ticket.amountPaid} • Qty: ${quantity}`;
    badge.style.margin = "5px 0 10px 0";
    badge.style.padding = "6px 14px";
    badge.style.backgroundColor = "#3B82F6";
    badge.style.color = "#fff";
    badge.style.fontWeight = "600";
    badge.style.borderRadius = "9999px";
    container.appendChild(badge);

    // Event Details
    const details = document.createElement("p");
    details.innerText = `Category: ${ticket.eventId.category}
Venue: ${ticket.eventId.venue}
Address: ${ticket.eventId.address || "—"}
Date: ${new Date(ticket.eventId.date).toLocaleDateString()} | Time: ${
      ticket.eventId.time
    }`;
    details.style.whiteSpace = "pre-line";
    details.style.margin = "10px 0";
    details.style.textAlign = "center";
    details.style.color = "#4B5563";
    container.appendChild(details);

    // QR
    if (ticket.qrCodeUrl) {
      const qrContainer = document.createElement("div");
      qrContainer.style.width = "220px";
      qrContainer.style.height = "220px";
      qrContainer.style.border = "2px dashed #3B82F6";
      qrContainer.style.borderRadius = "12px";
      qrContainer.style.display = "flex";
      qrContainer.style.alignItems = "center";
      qrContainer.style.justifyContent = "center";
      qrContainer.style.marginTop = "20px";

      const qr = document.createElement("img");
      qr.src = ticket.qrCodeUrl;
      qr.crossOrigin = "anonymous";
      qr.style.width = "190px";
      qr.style.height = "190px";

      qrContainer.appendChild(qr);
      container.appendChild(qrContainer);

      await new Promise((resolve) => (qr.onload = resolve));
    }

    document.body.appendChild(container);

    const canvas = await html2canvas(container, { scale: 4, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save(`${ticket.eventId.title}_${ticket.ticketType}.pdf`);

    document.body.removeChild(container);
  };

  if (loading)
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  if (!tickets.length)
    return (
      <div className="text-center mt-20 text-gray-600">No tickets found</div>
    );

  return (
    <div className="p-4 grid grid-cols-1 gap-4">
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden border border-gray-200"
        >
          {/* LEFT - BANNER */}
          <div className="md:w-1/3 w-full h-40 md:h-auto">
            <img
              src={ticket.eventId.bannerUrl}
              alt={ticket.eventId.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* MIDDLE - DETAILS */}
          <div className="md:w-1/2 w-full p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-widest font-semibold text-gray-400">
                EVENT TICKET
              </p>

              <h1 className="text-xl font-bold mt-1 text-gray-800 leading-tight">
                {ticket.eventId.title}
              </h1>

              <span className="inline-block bg-blue-500 text-white font-semibold px-3 py-1 rounded-full mt-2 text-sm">
                {ticket.ticketType} • ₹{ticket.amountPaid} • Qty: {ticket.quantity || 1}
              </span>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p className="font-semibold">{ticket.eventId.venue}</p>
                <p>Category: {ticket.eventId.category}</p>

                <p className="text-gray-500">
                  {ticket.eventId.description.length > 80
                    ? ticket.eventId.description.slice(0, 80) + "..."
                    : ticket.eventId.description}
                </p>

                <div className="flex justify-between mt-2 border-t border-gray-200 pt-2">
                  <span className="font-bold text-blue-600">
                    {(() => {
                      const d = new Date(ticket.eventId.date);
                      return `${String(d.getDate()).padStart(2, "0")}-${String(
                        d.getMonth() + 1
                      ).padStart(2, "0")}-${d.getFullYear()}`;
                    })()}
                  </span>

                  <span>{ticket.eventId.time}</span>
                </div>
              </div>
            </div>

            <p
              className={`font-semibold mt-4 text-sm ${
                ticket.isUsed ? "text-red-600" : "text-green-600"
              }`}
            >
              Status: {ticket.isUsed ? "Used" : "Valid"}
            </p>
          </div>

          {/* RIGHT - QR */}
          <div className="md:w-1/4 w-full p-5 flex flex-col items-center bg-gray-50 relative border-l border-gray-200">
            <div className="absolute left-0 top-0 h-full border-dotted border-r-2 border-gray-300"></div>

            <img
              src={ticket.qrCodeUrl}
              alt="QR Code"
              className="w-24 h-24 rounded-lg border-2 border-blue-400 mt-2"
            />

            <button
              onClick={() => downloadPDF(ticket)}
              className="mt-5 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              Download Ticket
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
