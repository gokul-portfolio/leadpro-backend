const User = require("./user.model");

const jwt = require("jsonwebtoken");


// ==========================
// GENERATE JWT TOKEN
// ==========================
const generateToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "1d",
    }
  );
};


// ==========================
// LOGIN
// ==========================
const login = async ({
  email,
  password,
}) => {

  // find user
  const user =
    await User.findOne({
      email,
    });

  if (!user) {

    throw new Error(
      "Invalid credentials"
    );
  }

  // check inactive user
  if (
    user.status ===
    "inactive"
  ) {

    throw new Error(
      "User account inactive"
    );
  }

  // check password
  const isMatch =
    await user.matchPassword(
      password
    );

  if (!isMatch) {

    throw new Error(
      "Invalid credentials"
    );
  }

  // generate token
  const token =
    generateToken(user);

  return {
    token,

    user: {
      id: user._id,

      name: user.name,

      email: user.email,

      phone: user.phone,

      role: user.role,

      department:
        user.department,

      designation:
        user.designation,

      employeeId:
        user.employeeId,

      profileImage:
        user.profileImage,

      status:
        user.status,
    },
  };
};


// ==========================
// CREATE USER
// ==========================
const createUser = async (
  data
) => {

  const {
    name,
    email,
    password,
    phone,
    role,
    department,
    designation,
    employeeId,
    profileImage,
    status,
  } = data;

  // ==========================
  // CHECK EMAIL
  // ==========================
  const existingUser =
    await User.findOne({
      email,
    });

  if (existingUser) {

    throw new Error(
      "User already exists"
    );
  }

  // ==========================
  // CHECK EMPLOYEE ID
  // ==========================
  const existingEmployee =
    await User.findOne({
      employeeId,
    });

  if (existingEmployee) {

    throw new Error(
      "Employee ID already exists"
    );
  }

  // ==========================
  // CREATE USER
  // ==========================
  const user =
    await User.create({

      name,

      email,

      password,

      phone,

      role,

      department,

      designation,

      employeeId,

      profileImage,

      status,
    });

  return {
    id: user._id,

    name: user.name,

    email: user.email,

    phone: user.phone,

    role: user.role,

    department:
      user.department,

    designation:
      user.designation,

    employeeId:
      user.employeeId,

    profileImage:
      user.profileImage,

    status:
      user.status,
  };
};


// ==========================
// GET ALL USERS
// SEARCH + FILTER + SORT
// ==========================
const getUsers = async (
  query
) => {

  const filter = {};

  // ==========================
  // ROLE FILTER
  // ==========================
  if (query.role) {

    filter.role =
      query.role;
  }

  // ==========================
  // DEPARTMENT FILTER
  // ==========================
  if (query.department) {

    filter.department =
      query.department;
  }

  // ==========================
  // STATUS FILTER
  // ==========================
  if (query.status) {

    filter.status =
      query.status;
  }

  // ==========================
  // SEARCH
  // ==========================
  if (
    query.search &&
    query.search.trim() !== ""
  ) {

    const searchRegex =
      new RegExp(
        query.search,
        "i"
      );

    filter.$or = [

      {
        name:
          searchRegex,
      },

      {
        email:
          searchRegex,
      },

      {
        phone:
          searchRegex,
      },

      {
        employeeId:
          searchRegex,
      },

      {
        designation:
          searchRegex,
      },

      {
        department:
          searchRegex,
      },
    ];
  }

  // ==========================
  // SORT
  // ==========================
  let sortOption = {
    createdAt: -1,
  };

  // newest
  if (
    query.sort ===
    "newest"
  ) {

    sortOption = {
      createdAt: -1,
    };
  }

  // oldest
  if (
    query.sort ===
    "oldest"
  ) {

    sortOption = {
      createdAt: 1,
    };
  }

  // name ascending
  if (
    query.sort ===
    "nameAsc"
  ) {

    sortOption = {
      name: 1,
    };
  }

  // name descending
  if (
    query.sort ===
    "nameDesc"
  ) {

    sortOption = {
      name: -1,
    };
  }

  // ==========================
  // GET USERS
  // ==========================
  const users =
    await User.find(filter)

      .select("-password")

      .sort(sortOption);

  return users;
};


// ==========================
// GET SINGLE USER
// ==========================
const getSingleUser =
  async (id) => {

    const user =
      await User.findById(id)
        .select("-password");

    if (!user) {

      throw new Error(
        "User not found"
      );
    }

    return user;
  };


// ==========================
// UPDATE USER
// ==========================
const updateUser = async (
  id,
  data
) => {

  const user =
    await User.findById(id);

  if (!user) {

    throw new Error(
      "User not found"
    );
  }

  // update fields
  user.name =
    data.name || user.name;

  user.email =
    data.email || user.email;

  user.phone =
    data.phone || user.phone;

  user.role =
    data.role || user.role;

  user.department =
    data.department ||
    user.department;

  user.designation =
    data.designation ||
    user.designation;

  user.employeeId =
    data.employeeId ||
    user.employeeId;

  user.profileImage =
    data.profileImage ||
    user.profileImage;

  user.status =
    data.status ||
    user.status;

  // optional password update
  if (data.password) {

    user.password =
      data.password;
  }

  const updatedUser =
    await user.save();

  return {
    id: updatedUser._id,

    name:
      updatedUser.name,

    email:
      updatedUser.email,

    phone:
      updatedUser.phone,

    role:
      updatedUser.role,

    department:
      updatedUser.department,

    designation:
      updatedUser.designation,

    employeeId:
      updatedUser.employeeId,

    profileImage:
      updatedUser.profileImage,

    status:
      updatedUser.status,
  };
};


// ==========================
// DELETE USER
// ==========================
const deleteUser = async (
  id
) => {

  const user =
    await User.findById(id);

  if (!user) {

    throw new Error(
      "User not found"
    );
  }

  await user.deleteOne();

  return {
    message:
      "User deleted successfully",
  };
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