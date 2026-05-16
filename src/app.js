const express = require("express");

const cors = require("cors");

const app = express();


// ==============================
// MIDDLEWARES
// ==============================
app.use(cors());

app.use(express.json());

// AUTH ROUTES
app.use(
  "/api/auth",
  require("./models/auth/auth.routes")
);

// USER ROUTES
app.use(
  "/api/users",
  require("./models/user/user.routes")
);

// PROJECT ROUTES
app.use(
  "/api/projects",
  require("./models/project/project.routes")
);

// LEAD ROUTES
app.use(
  "/api/leads",
  require("./models/lead/lead.routes")
);

// CLIENT ROUTES
app.use(
  "/api/clients",
  require("./models/client/client.routes")
);

// dashboard ROUTES
app.use(
  "/api/dashboard",
  require("./models/dashboard/dashboard.routes")
);

// ==============================
// 404 ROUTE
// ==============================
app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found",
  });

});


// ==============================
// GLOBAL ERROR HANDLER
// ==============================
const errorMiddleware = require(
  "./middleware/error.middleware"
);

app.use(errorMiddleware);


module.exports = app;