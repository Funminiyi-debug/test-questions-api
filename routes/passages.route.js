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

router.post("/add-many-passages", passages.addManyPassagesToSubject);
//create one question
router.post("/", passages.createPassage);

router.get("/get-by-subject/:subjectid", passages.getPassagesBySubject);

router.post(
  "/add-images/:passageid",
  require("../config/multer").single("passageImages"),
  passages.addImagesToPassage
);

module.exports = router;
