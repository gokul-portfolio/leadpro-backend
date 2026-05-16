    const express = require("express");

const router =
  express.Router();


// ==========================
// CONTROLLERS
// ==========================
const {
  createClient,
  convertLeadToClient,
  getClients,
  getSingleClient,
  updateClient,
  deleteClient,
} = require(
  "./client.controller"
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
// CREATE CLIENT
// ==========================
router.post(
  "/create",
  protect,
  createClient
);


// ==========================
// CONVERT LEAD
// ==========================
router.post(
  "/convert/:leadId",
  protect,
  convertLeadToClient
);


// ==========================
// GET ALL CLIENTS
// ==========================
router.get(
  "/",
  protect,
  getClients
);


// ==========================
// GET SINGLE CLIENT
// ==========================
router.get(
  "/:id",
  protect,
  getSingleClient
);


// ==========================
// UPDATE CLIENT
// ==========================
router.put(
  "/:id",
  protect,
  updateClient
);


// ==========================
// DELETE CLIENT
// ==========================
router.delete(
  "/:id",
  protect,
  deleteClient
);


module.exports = router;