const express = require("express");

const {
  getAllRecipes, getOneRecipeById
} = require("./controller");

const router = express.Router();

router.get("/", getAllRecipes);

router.get("/:id", getOneRecipeById);

module.exports = router;
