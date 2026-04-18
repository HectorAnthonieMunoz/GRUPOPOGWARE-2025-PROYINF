const express = require("express");
const router = express.Router();

const { getRecommendation } = require("../controllers/recommendation.controller");

router.post("/recommendation", getRecommendation);

module.exports = router; // 🔴 ESTO ES LO IMPORTANTE