const router = require("express").Router();
const { auth } = require("../middleware/auth");

const {
  approveEvent,
  rejectEvent,
  getAllUsers,
  getAllOrganizers,
  getAllEvents,
  getAnalytics
} = require("../controllers/adminController");

// ADMIN ONLY ROUTES
router.put("/event/approve/:id", auth(["admin"]), approveEvent);
router.put("/event/reject/:id", auth(["admin"]), rejectEvent);

router.get("/users", auth(["admin"]), getAllUsers);
router.get("/organizers", auth(["admin"]), getAllOrganizers);

router.get("/events", auth(["admin"]), getAllEvents);
router.get("/analytics", auth(["admin"]), getAnalytics);

module.exports = router;
