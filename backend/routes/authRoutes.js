const router = require("express").Router();
const {
  register,
  login,
  logout,
  updateUser,
} = require("../controllers/authController.js");
const User = require("../models/user.model.js");
const Ticket = require("../models/ticket.model.js");
const { auth } = require("../middleware/auth.js");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Get logged-in user info
router.get("/me", auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("ME Route Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Logout
router.post("/logout", logout);

// New Dashboard Stats
router.get("/dashboard", auth(), async (req, res) => {
  try {
    const userId = req.user.id;

    const tickets = await Ticket.find({ userId });

    const totalTickets = tickets.length;
    const totalSpent = tickets.reduce((acc, t) => acc + t.amountPaid, 0);
    const activeTickets = tickets.filter((t) => !t.isUsed).length;
    const usedTickets = tickets.filter((t) => t.isUsed).length;

    res.status(200).json({
      msg: "Dashboard stats fetched",
      data: {
        totalTickets,
        totalSpent,
        activeTickets,
        usedTickets,
      },
    });
  } catch (err) {
    console.error("Dashboard Route Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/update", auth(), updateUser);

module.exports = router;
