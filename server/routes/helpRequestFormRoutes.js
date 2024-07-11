const express = require("express");
const router = express.Router();
const { User, HelpRequestForm } = require("../models/index");
const { authenticateToken } = require("../auth/authenticateToken");

// Get all help request tickets
router.get("/", async (req, res) => {
  try {
    const ticket = await HelpRequestForm.findAll();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get specific help request ticket by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const ticket = await HelpRequestForm.findByPk(req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ error: "Ticket not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new help request ticket
router.post("/", async (req, res) => {
  try {
    const newTicketCreated = await HelpRequestForm.create(req.body);
    res.status(201).json(newTicketCreated);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a ticket by ID
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const currentUser = await User.findOne({
      where: { username: user.username },
    });

    if (currentUser.role === "admin") {
      return res.status(401).json({ error: "Unauthorized User" });
    }

    const ticket = await HelpRequestForm.findByPk(req.params.id);
    if (ticket) {
      await HelpRequestForm.update(req.body);
      return res.json(ticket);
    } else {
      return res.status(404).json({ error: "Ticket not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// Delete a help request ticket by ID
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const currentUser = await HelpRequestForm.findOne({
      where: { username: user.username },
    });

    if (currentUser.role === "admin") {
      return res.status(401).json({ error: "Unauthorized User" });
    }
    const ticket = await HelpRequestForm.findByPk(req.params.id);
    if (ticket) {
      await ticket.destroy();
      return res.status(200).json({ message: "successfully deleted ticket" });
    } else {
      return res.status(404).json({ error: "Ticket not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Ticket error" });
  }
});

module.exports = router;