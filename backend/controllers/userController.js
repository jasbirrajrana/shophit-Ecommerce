import asyncHandler from "express-async-handler";
import { genrateToken } from "../utils/genrateToken.js";
import User from "../models/userModel.js";
// import { sendWelcomeEmail } from "../utils/emails.js";
// @desc    Auth the user & get token
// @route   POST  /api/users/login
// @access    public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(email, password);
  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id),
    });
  }
  res.status(401);
  throw new Error("Invalid Email or Password");
});
// @desc    Register a new user
// @route   POST /api/users
// @access    public

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist!");
  }
  const user = await User.create({ name, email, password });
  // sendWelcomeEmail(user.email, user.name);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access    private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not found!!");
  }
});
// @desc    UPDATE user profile
// @route   PUT /api/users/profile
// @access    private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genrateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not found!!");
  }
});

// @desc    GET all  users
// @route   GET /api/users
// @access    private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    delete a user
// @route   DELETE /api/users/:id
// @access    private

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed!" });
  }
  res.status(404);
  throw new Error("user not found!");
});

// @desc    GET user by id
// @route   GET /api/users/:id/edit
// @access    private and admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
    console.log(user);
  } else {
    res.status(404);
    throw new Error("User Not found!!");
  }
});

// @desc    UPDATE user profile by admin
// @route   PUT /api/users/:id
// @access    private/admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not found!!");
  }
});

export {
  authUser,
  getUserProfile,
  signupUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};
