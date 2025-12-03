const Event = require("../models/event.model");
const { uploadToCloudinary } = require("../middleware/upload");

// Create Event (Organizer)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, date, time, venue, tickets } = req.body;

    if (!req.file) return res.status(400).json({ error: "Banner file required" });

    // Upload banner to Cloudinary
    const banner = await uploadToCloudinary(req.file.buffer);

    // Parse tickets if sent as JSON string
    let parsedTickets = tickets;
    if (typeof tickets === "string") parsedTickets = JSON.parse(tickets);

    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      venue,
      tickets: parsedTickets,
      bannerUrl: banner.secure_url,
      organizerId: req.user.id
    });

    res.json({ msg: "Event created", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all approved events
exports.getAllApproved = async (req, res) => {
  const events = await Event.find({ status: "approved" });
  res.json(events);
};

// Get single event
exports.getSingle = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
};