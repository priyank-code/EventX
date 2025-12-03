const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role: "user",
    });

    res.status(201).json({ msg: "Registered", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
    });

    res.json({ msg: "Logged in", token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Use ID from auth middleware (JWT) instead of email
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    const { name, password } = req.body;

    if (name) user.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    // Exclude password from response
    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      msg: "User updated successfully",
      user: userData,
    });
  } catch (err) {
    console.error("Update Account Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  res.json({ msg: "Logged out successfully" });
};

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all tickets of the user
    const tickets = await Ticket.find({ userId });

    if (!tickets || tickets.length === 0) {
      return res.status(200).json({
        msg: "No tickets found",
        data: {
          totalTickets: 0,
          totalSpent: 0,
          activeTickets: 0,
          usedTickets: 0,
        },
      });
    }

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
    res.status(500).json({ msg: err.message });
  }
};
