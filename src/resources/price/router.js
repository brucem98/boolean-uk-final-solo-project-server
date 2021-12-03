const express = require("express");

const { getPrice } = require("./controller")

const router = express.Router();

router.get("/", getPrice)

module.exports = router;