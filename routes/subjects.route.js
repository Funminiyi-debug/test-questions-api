const router = require("express").Router();
const subjects = require("../controllers/subjects.controller");

// get all questions
router.get("/", subjects.getAllSubjects);

// get one question
router.get("/:id", subjects.getOneSubject);

// update one question
router.put("/:id", subjects.updateSubject);

// delete one question
router.delete("/:id", subjects.deleteSubject);

//create one question
router.post("/", subjects.createSubject);

module.exports = router;
