// backend/modules/reports/report.routes.js

const express = require("express");

const router = express.Router();

const {
  getReports,
} = require("./report.controller");

const {
  protect,
} = require("../../middleware/auth.middleware");

// =========================
// REPORT ROUTE
// =========================

router.get(
  "/",
  protect,
  getReports
);

module.exports = router;