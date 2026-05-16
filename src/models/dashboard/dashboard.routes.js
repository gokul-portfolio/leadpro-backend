const express = require("express");

const router =
  express.Router();


// ==========================
// CONTROLLER
// ==========================
const {
  getDashboardData,
} = require(
  "./dashboard.controller"
);


// ==========================
// MIDDLEWARE
// ==========================
const {
  protect,
} = require(
  "../../middleware/auth.middleware"
);


// ==========================
// DASHBOARD DATA
// ==========================
//
// GET:
// /api/dashboard
//
// Dashboard Includes:
// - Total Leads
// - New Leads
// - Converted Clients
// - Total Projects
// - Active Projects
// - Total Users
// - Recent Leads
// - Recent Projects
// ==========================
router.get(
  "/",
  protect,
  getDashboardData
);


// ==========================
// EXPORT ROUTER
// ==========================
module.exports = router;