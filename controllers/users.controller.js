const User = require("../models/user");
const { Subject } = require("../models/subject");
const bcrypt = require("bcrypt");

//  save current progress
const saveProgress = async (req, res) => {
  try {
    const { subject, name, email } = req.body;
    // console.log(req.body);

    const user = await User.findOne({ name, email });

    // const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ message: "you have to be logged in", success: false });
    }

    if (!subject || !subject.subject) {
      return res.status(400).json({
        message: "subject to save cannot be null",
        success: false,
      });
    }

    // const subjectExists = await Subject.find(subject.subject);
    if (user.subjectsSaved.length > 0) {
      const subjectExists = user.subjectsSaved.find(
        (element) => element.subject._id.valueOf() == subject.subject
      );

      console.log("at conditional", subjectExists);

      if (subjectExists) {
        user.subjectsSaved = user.subjectsSaved.filter(
          (element) => !element.subject._id.equals(subjectExists.subject._id)
        );
      }
    }
    console.log("subject.subject", subject.subject);
    const subjectId = subject.subject;

    subject.subject = await Subject.findOne({ _id: subjectId });
    console.log("the subject has changed to", subject.subject);
    console.log("the full subject", subject);
    user.subjectsSaved.push(subject);
    await user.save();

    const tosend = {
      name: user.name,
      email: user.email,
      subjectsSaved: user.subjectsSaved.sort(
        (a, b) => a.updatedAt > b.updatedAt
      ),
    };

    return res
      .status(200)
      .json({ user: tosend, message: "subject added", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("subject");

    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

// add one user by id
const getUser = async (req, res) => {
  // const { name, email } = req.query;
  const userId = req.params.userId;
  console.log(userId);
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ message: "user does not exist", success: false });
  }

  const response = {
    ...user,
    password: undefined,
  };

  return res.status(200).json({ user: user, success: true });
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
    _id: user._id,
    name: user.name,
    email: user.email,
    subjects: user.subjects,
    subjectsSaved: user.subjectsSaved,
  };
  return res.status(201).json({ user: tosend, success: true });
};

const addSubjectToUser = async (req, res) => {
  const { subject, name, email } = req.body;
  // console.log(req.body);

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
    if (user.subjects.length > 0) {
      const subjectExists = user.subjects.find(
        (element) => element.subject._id.valueOf() == subject.subject
      );

      if (subjectExists) {
        user.subjects = user.subjects.filter(
          (element) => !element.subject._id.equals(subjectExists.subject._id)
        );
      }
    }

    const subjectId = subject.subject;

    subject.subject = await Subject.findOne({ _id: subjectId });

    user.subjects.push(subject);
    await user.save();

    const tosend = {
      _id: user._id,
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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const operation = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

const resetPassword = async (req, res) => {
  const { oldPassword, newPassword, newPassword2, email } = req.body;
  if (!oldPassword || !newPassword || !newPassword2 || !email) {
    return res
      .status(422)
      .json({ message: "Please fill all fields", success: false });
  }
  if (newPassword != newPassword2) {
    return res
      .status(422)
      .json({ message: "Credentials do not match", success: false });
  }
  try {
    const user = await User.findOne({ email });
    console.log("reset password", user);
    if (!user)
      return res
        .status(404)
        .json({ message: "Credentials do not match", success: false });

    const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!oldPasswordMatch)
      return res
        .status(404)
        .json({ message: "Credentials do not match", success: false });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await User.findByIdAndUpdate(user._id, user, { new: true });

    return res.status(204).json({ message: "Updated!", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  addSubjectToUser,
  deleteUser,
  saveProgress,
  resetPassword,
};
