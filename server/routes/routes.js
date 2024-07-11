const express = require("express");

const router = express.Router();

router.use("/help-request-form", require("./helpRequestFormRoutes"));

router.use("/auth", require("./auth"));

module.exports = router;