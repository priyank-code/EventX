const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const { createEvent, getAllApproved, getSingle } = require("../controllers/eventController");

// Organizer creates event (with banner upload)
router.post("/create", auth(["organizer"]), upload.single("banner"), createEvent);

// Public: get approved events
router.get("/all", getAllApproved);

// Get single event details
router.get("/:id", getSingle);

module.exports = router;