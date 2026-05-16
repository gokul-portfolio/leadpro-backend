const express = require("express");

const router =
  express.Router();


// ==========================
// CONTROLLERS
// ==========================
const {
  createProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  assignMembers,
} = require(
  "./project.controller"
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
// CREATE PROJECT
// ==========================
router.post(
  "/create",
  protect,
  createProject
);


// ==========================
// GET ALL PROJECTS
// SEARCH + FILTER + SORT
//
// Examples:
//
// /api/projects?search=crm
//
// /api/projects?status=Pending
//
// /api/projects?priority=High
//
// /api/projects?sort=newest
//
// /api/projects?search=crm&status=In Progress
// ==========================
router.get(
  "/",
  protect,
  getProjects
);


// ==========================
// GET SINGLE PROJECT
// ==========================
router.get(
  "/:id",
  protect,
  getSingleProject
);


// ==========================
// UPDATE PROJECT
// ==========================
router.put(
  "/:id",
  protect,
  updateProject
);


// ==========================
// DELETE PROJECT
// ==========================
router.delete(
  "/:id",
  protect,
  deleteProject
);


// ==========================
// ASSIGN MEMBERS
// ==========================
router.put(
  "/assign/:id",
  protect,
  assignMembers
);


// ==========================
// EXPORT ROUTER
// ==========================
module.exports = router;