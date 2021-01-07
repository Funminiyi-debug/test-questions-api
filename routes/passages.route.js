const router = require("express").Router();
const passages = require("../controllers/passages.controller");

// get all questions
router.get("/", passages.getAllPassages);

// get one question
router.get("/:id", passages.getOnePassage);

// update one question
router.put("/:id", passages.updatePassage);

// delete one question
router.delete("/:id", passages.deletePassage);

//create one question
router.post("/", passages.createPassage);

module.exports = router;
