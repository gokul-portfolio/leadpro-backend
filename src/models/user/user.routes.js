const express = require("express");

const router = express.Router();

const {
  login,
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("./user.controller");

const validate = require("../../middleware/validate.middleware");

const {
  protect,
  adminOnly,
} = require("../../middleware/auth.middleware");

// router.post("/register", createUser);


// LOGIN
router.post(
  "/login",
  validate,
  login
);

// CREATE USER
router.post(
  "/create",
  protect,
  adminOnly,
  createUser
);

// GET ALL USERS
router.get(
  "/",
  protect,
  adminOnly,
  getUsers
);

// GET SINGLE USER
router.get(
  "/:id",
  protect,
  adminOnly,
  getSingleUser
);

// UPDATE USER
router.put(
  "/:id",
  protect,
  adminOnly,
  updateUser
);


// DELETE USER
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteUser
);

module.exports = router;