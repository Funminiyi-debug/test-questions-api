const router = require("express").Router();
const dashboard = require("../controllers/dashboard.controller");

router.get("/metrics", dashboard.dashboardMetrics);

router.get("/subjects/metrics", dashboard.subjectMetrics);

router.get("/users/metrics", dashboard.userMetrics);

module.exports = router;
