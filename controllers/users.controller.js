const User = require("../models/user");
const bcrypt = require("bcrypt");

// get all users
const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate("subject");
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

  const response = {
    email: user.email,
    subjects: user.subjects,
    name: user.name,
  };
  return res.status(200).json({ user: response, success: true });
};

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: "all required fields must be filled", success: false });
  }

  const exists = await User.findOne({ name, email });
  if (exists) {
    return res
      .status(409)
      .json({ message: "User already exists", success: false });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });

  await user.save();
  const tosend = {
    name: user.name,
    email: user.email,
    subjects: user.subjects,
  };
  return res.status(201).json({ user: tosend, success: true });
};

const addSubjectToUser = async (req, res) => {
  const { subject, name, email } = req.body;
  console.log(req.body);

  const user = await User.findOne({ name, email });

  // const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ message: "you have to be logged in", success: false });
  }

  if (!subject || !subject.subject) {
    return res.status(400).json({
      message: "subject cannot be null",
      success: false,
    });
  }
  try {
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res
    //     .status(404)
    //     .json({ message: "user does not exist", success: false });
    // }

    user.subjects.push(subject);
    await user.save();

    const tosend = {
      name: user.name,
      email: user.email,
      subjects: user.subjects.sort((a, b) => a.updatedAt > b.updatedAt),
    };
    return res
      .status(200)
      .json({ user: tosend, message: "subject added", success: true });
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
