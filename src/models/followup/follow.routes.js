// ==================================================
// FOLLOW ROUTES
// FILE: routes/follow.routes.js
// ==================================================

const express = require("express");

const router = express.Router();

// ==================================================
// IMPORT CONTROLLER
// ==================================================

const {
  createFollowup,
  getAllFollowups,
  getSingleFollowup,
  getUpcomingFollowups,
  getTodayFollowups,
  getOverdueFollowups,
  updateFollowup,
  completeFollowup,
  deleteFollowup,
} = require(
  "../followup/follow.controller"
);

// ==================================================
// FOLLOWUP ROUTES
// ==================================================

// CREATE FOLLOWUP
router.post(
  "/",
  createFollowup
);

// GET ALL FOLLOWUPS
router.get(
  "/",
  getAllFollowups
);

// GET UPCOMING FOLLOWUPS
router.get(
  "/upcoming",
  getUpcomingFollowups
);

// GET TODAY FOLLOWUPS
router.get(
  "/today",
  getTodayFollowups
);

// GET OVERDUE FOLLOWUPS
router.get(
  "/overdue",
  getOverdueFollowups
);

// GET SINGLE FOLLOWUP
router.get(
  "/:id",
  getSingleFollowup
);

// UPDATE FOLLOWUP
router.put(
  "/:id",
  updateFollowup
);

// COMPLETE FOLLOWUP
router.patch(
  "/complete/:id",
  completeFollowup
);

// DELETE FOLLOWUP
router.delete(
  "/:id",
  deleteFollowup
);

// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;