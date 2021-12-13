const express = require("express");

const {
  getAllRecipes
} = require("./controller");

const router = express.Router();

router.get("/", getAllRecipes);

module.exports = router;
