// ==================================================
// IMPORTS
// ==================================================

const express =
require("express");

const cors =
require("cors");

const path =
require("path");

const errorMiddleware =
require("./middleware/error.middleware");

// ==================================================
// APP
// ==================================================

const app =
express();

// ==================================================
// REPORT ROUTES IMPORT
// ==================================================

const reportRoutes =
require(
  "./models/reports/report.routes"
);

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

app.use(
  express.json()
);

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

/* AUTH */

app.use(

  "/api/auth",

  require(

    "./models/auth/auth.routes"

  )

);

/* USERS */

app.use(

  "/api/users",

  require(

    "./models/user/user.routes"

  )

);

/* LEADS */

app.use(

  "/api/leads",

  require(

    "./models/lead/lead.routes"

  )

);

/* PROJECTS */

app.use(

  "/api/projects",

  require(

    "./models/project/project.routes"

  )

);

/* CLIENTS */

app.use(

  "/api/clients",

  require(

    "./models/client/client.routes"

  )

);

/* DASHBOARD */

app.use(

  "/api/dashboard",

  require(

    "./models/dashboard/dashboard.routes"

  )

);

/* REPORTS */

app.use(

  "/api/reports",

  reportRoutes

);

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
// 404 HANDLER
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
// EXPORT
// ==================================================

module.exports = app;