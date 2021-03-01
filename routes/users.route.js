const router = require("express").Router();
const users = require("../controllers/users.controller");

router.get("/", users.getAllUsers);
router.get("/:userId", users.getUser);
router.post("/", users.addUser);
router.post("/add-subject-to-user", users.addSubjectToUser);
router.delete("/:id", users.deleteUser);
router.post("/save-progress", users.saveProgress);
router.post("/reset-password", users.resetPassword);

module.exports = router;
