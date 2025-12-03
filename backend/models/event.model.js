const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  type: String,
  price: Number,
  totalSeats: Number,
  remainingSeats: {
    type: Number,
    default: function () {
      return this.totalSeats;
    }
  }
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  date: Date,
  time: String,
  venue: String,
  bannerUrl: String,
  organizerId: { type: mongoose.Types.ObjectId, ref: "User" },
  tickets: [ticketSchema],
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
