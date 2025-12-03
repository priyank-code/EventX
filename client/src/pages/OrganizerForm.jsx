import React from "react";

export default function OrganizerForm() {
  return (
    <section className="mt-16 px-6 mb-10">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-200">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
          Organize Your Event
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Fill the form below and our team will contact you for event onboarding.
        </p>

        {/* Form */}
        <form className="flex flex-col gap-6">

          {/* Grid: Desktop → 2 rows × 2 cols, Mobile → stacked */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input label="Name" placeholder="John Doe" />
            <Input label="Email" placeholder="email@example.com" type="email" />
            <Input label="Phone" placeholder="+91 9876543210" />
            <Input label="Organization" placeholder="Company / NGO" />
          </div>

          {/* Event Details */}
          <div>
            <label className="text-gray-700 font-medium">Event Details (Optional)</label>
            <textarea
              rows="4"
              className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Describe your event"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
                       shadow-lg hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}

// Reusable Input component
function Input({ label, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
