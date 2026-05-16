const express = require("express");

const router =
  express.Router();


// ==========================
// CONTROLLERS
// ==========================
const {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead,
  assignLead,
} = require(
  "./lead.controller"
);


// ==========================
// MIDDLEWARES
// ==========================
const {
  protect,
} = require(
  "../../middleware/auth.middleware"
);


// ==========================
// CREATE LEAD
// ==========================
router.post(
  "/create",
  protect,
  createLead
);


// ==========================
// GET ALL LEADS
// SEARCH + FILTER + SORT
//
// Examples:
//
// /api/leads?search=priya
//
// /api/leads?status=followup
//
// /api/leads?leadSource=facebook
//
// /api/leads?sort=budgetHigh
//
// /api/leads?search=priya&status=followup
// ==========================
router.get(
  "/",
  protect,
  getLeads
);


// ==========================
// GET SINGLE LEAD
// ==========================
router.get(
  "/:id",
  protect,
  getSingleLead
);


// ==========================
// UPDATE LEAD
// ==========================
router.put(
  "/:id",
  protect,
  updateLead
);


// ==========================
// DELETE LEAD
// ==========================
router.delete(
  "/:id",
  protect,
  deleteLead
);


// ==========================
// ASSIGN LEAD
// ==========================
router.put(
  "/assign/:id",
  protect,
  assignLead
);


// ==========================
// EXPORT ROUTER
// ==========================
module.exports = router;