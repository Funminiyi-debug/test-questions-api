const User = require("../models/user");

// get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.json({ users });
};

// add one user by id
const getUser = async (req, res) => {
  const { name, email } = req.query;
  const user = await User.find({ name: name, email: email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "user does not exist", success: false });
  }

  return res.status(200).json({ user, success: true });
};

const addUser = async (req, res) => {
  const { name, email, subjects } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "all required fields must be filled",
      success: false,
    });
  }
  try {
    const exists = await User.find({ name, email });
    if (exists) {
      return res
        .status(409)
        .json({ message: "user already exist", success: false });
    }

    const user = await User.create({
      name,
      email,
    });

    subjects.forEach((subject) => {
      user.subjects.push(subject);
    });

    await user.save();

    return res
      .status(201)
      .location("/users/" + user._id)
      .json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

const addSubjectToUser = async (req, res) => {
  const { name, email, subject } = req.body;
  if (!name || !email) {
    return res.status(400).json({
      message: "all required fields must be filled",
      success: false,
    });
  }
  try {
    const user = await User.find({ name, email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user does not exist", success: false });
    }

    user.subjects.push(subject);
    await user.save();

    return res
      .status(200)
      .json({ user, message: "subject added", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something happened with the server", success: false });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  addSubjectToUser,
};
