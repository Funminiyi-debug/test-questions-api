const router = require("express").Router();
const dasboard = require("../controllers/dashboard.controller");

router.get("/metrics", dasboard.dashboardMetrics);

module.exports = router;
