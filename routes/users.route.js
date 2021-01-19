const router = require("express").Router();
const users = require("../controllers/users.controller");

router.get("/", users.getAllUsers);
router.get("/get-user-by-name-and-email", users.getUser);
router.post("/", users.addUser);
router.post("/add-subject-to-user", users.addSubjectToUser);
router.delete("/:id", users.deleteUser);

module.exports = router;
