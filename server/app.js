require("dotenv").config();
const express = require("express");
const helpRequestFormRoutes = require("./routes/helpRequestFormRoutes");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");

//Allow CORS requests
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://library-management-ui.onrender.com",
  ], // replace with your React app's URLs
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

// logging middleware
app.use(morgan("dev"));
// parsing middleware for form input data & json
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, "../dist")));

// api router
app.use("/auth", auth);
app.use("/help-request-form", helpRequestFormRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send({
    error: "404 - Not Found",
    message: "No route found for the requested URL",
  });
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

module.exports = { app };

