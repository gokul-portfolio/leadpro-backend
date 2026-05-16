const userService = require(
  "./user.service"
);


// ==========================
// LOGIN
// ==========================
const login = async (
  req,
  res,
  next
) => {

  try {

    const data =
      await userService.login(
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Login successful",
      data,
    });

  } catch (err) {

    next(err);
  }
};


// ==========================
// CREATE USER
// ==========================
const createUser = async (
  req,
  res,
  next
) => {

  try {

    const user =
      await userService.createUser(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "User created successfully",
      data: user,
    });

  } catch (err) {

    next(err);
  }
};


// ==========================
// GET ALL USERS
// SEARCH + FILTER + SORT
// ==========================
const getUsers = async (
  req,
  res,
  next
) => {

  try {

    const users =
      await userService.getUsers(
        req.query
      );

    res.status(200).json({
      success: true,
      count:
        users.length,
      data: users,
    });

  } catch (err) {

    next(err);
  }
};


// ==========================
// GET SINGLE USER
// ==========================
const getSingleUser = async (
  req,
  res,
  next
) => {

  try {

    const user =
      await userService.getSingleUser(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (err) {

    next(err);
  }
};


// ==========================
// UPDATE USER
// ==========================
const updateUser = async (
  req,
  res,
  next
) => {

  try {

    const updatedUser =
      await userService.updateUser(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "User updated successfully",
      data: updatedUser,
    });

  } catch (err) {

    next(err);
  }
};


// ==========================
// DELETE USER
// ==========================
const deleteUser = async (
  req,
  res,
  next
) => {

  try {

    const result =
      await userService.deleteUser(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message:
        result.message,
    });

  } catch (err) {

    next(err);
  }
};


// ==========================
// EXPORTS
// ==========================
module.exports = {
  login,
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};