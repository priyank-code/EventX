const User = require("../models/user.model.js");
const Event = require("../models/event.model.js");
const Ticket = require("../models/ticket.model.js");

// APPROVE EVENT
exports.approveEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) return res.json({ msg: "Event not found" });

    event.status = "approved";
    await event.save();

    res.json({ msg: "Event approved", event });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// REJECT EVENT
exports.rejectEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) return res.json({ msg: "Event not found" });

    event.status = "rejected";
    await event.save();

    res.json({ msg: "Event rejected", event });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({"role": "user"}).select("-password");
    res.json(users);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// GET ALL ORGANIZERS
exports.getAllOrganizers = async (req, res) => {
  try {
    const users = await User.find({"role": "organizer"}).select("-password");
    res.json(users);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// GET ALL EVENTS (Pending/Approved/Rejected)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizerId", "name email");
    res.json(events);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// PLATFORM ANALYTICS
exports.getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalOrganizers = await User.countDocuments({ role: "organizer" });
    const totalEvents = await Event.countDocuments();
    const approvedEvents = await Event.countDocuments({ status: "approved" });
    const rejectedEvents = await Event.countDocuments({ status: "rejected" });
    const pendingEvents = await Event.countDocuments({ status: "pending" });

    const totalSales = await Ticket.countDocuments();
    const revenue = await Ticket.aggregate([
      { $group: { _id: null, total: { $sum: "$amountPaid" } } }
    ]);

    res.json({
      totalUsers,
      totalOrganizers,
      totalEvents,
      approvedEvents,
      rejectedEvents,
      pendingEvents,
      totalSales,
      totalRevenue: revenue[0]?.total || 0
    });

  } catch (err) {
    res.json({ error: err.message });
  }
};
