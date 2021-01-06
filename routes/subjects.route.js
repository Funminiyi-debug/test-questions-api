const router = require("express").Router();
const subjects = require("../controllers/subjects");

// get all questions
router.get("/", subjects.getAllQuestions);

// get one question
router.get("/:id", subjects.getOneQuestion);

// update one question
router.put("/:id", subjects.updateQuestion);

// delete one question
router.delete("/:id", subjects.deleteQuestion);

//create one question
router.post("/", subjects.createQuestion);

module.exports = router;
