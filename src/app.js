// ==================================================
// IMPORTS
// ==================================================

const express = require("express");
const cors = require("cors");
const path = require("path");

// ==================================================
// MIDDLEWARE
// ==================================================

const errorMiddleware = require(
  "./middleware/error.middleware"
);

// ==================================================
// ROUTES IMPORT
// ==================================================

const authRoutes = require(
  "./models/auth/auth.routes"
);

const userRoutes = require(
  "./models/user/user.routes"
);

const leadRoutes = require(
  "./models/lead/lead.routes"
);

const projectRoutes = require(
  "./models/project/project.routes"
);

const clientRoutes = require(
  "./models/client/client.routes"
);

const dashboardRoutes = require(
  "./models/dashboard/dashboard.routes"
);

const reportRoutes = require(
  "./models/reports/report.routes"
);

const followRoutes = require(
  "./models/followup/follow.routes"
);


// ==================================================
// APP
// ==================================================

const app = express();

// ==================================================
// CORS
// ==================================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// ==================================================
// BODY PARSER
// ==================================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ==================================================
// STATIC FOLDER
// ==================================================

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

// ==================================================
// API ROUTES
// ==================================================

/* AUTH ROUTES */

app.use(
  "/api/auth",
  authRoutes
);

/* USER ROUTES */

app.use(
  "/api/users",
  userRoutes
);

/* LEAD ROUTES */

app.use(
  "/api/leads",
  leadRoutes
);

/* PROJECT ROUTES */

app.use(
  "/api/projects",
  projectRoutes
);



/* CLIENT ROUTES */

app.use(
  "/api/clients",
  clientRoutes
);

/* DASHBOARD ROUTES */

app.use(
  "/api/dashboard",
  dashboardRoutes
);

/* REPORT ROUTES */

app.use(
  "/api/reports",
  reportRoutes
);

/* FOLLOWUP ROUTES */

app.use(
  "/api/followups",
  followRoutes
);
app.use(
'/api/users',
userRoutes
)

// ==================================================
// TEST ROUTE
// ==================================================

app.get(
  "/",
  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        "Server Running Successfully 🚀",

    });

  }
);

// ==================================================
// 404 ROUTE HANDLER
// ==================================================

app.use(
  (req, res) => {

    res.status(404).json({

      success: false,

      message:
        "Route Not Found",

    });

  }
);

// ==================================================
// GLOBAL ERROR HANDLER
// ==================================================

app.use(
  errorMiddleware
);

// ==================================================
// EXPORT APP
// ==================================================

module.exports = app;