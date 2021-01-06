const router = require("express").Router();
const questions = require("../controllers/questions.controller");

// get all questions
router.get("/", questions.getAllQuestions);

// get one question
router.get("/:id", questions.getOneQuestion);

// update one question
router.put("/:id", questions.updateQuestion);

// delete one question
router.delete("/:id", questions.deleteQuestion);

//create one question
router.post("/", questions.createQuestion);

module.exports = router;
