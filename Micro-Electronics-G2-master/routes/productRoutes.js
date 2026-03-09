const express = require("express");

const router = express.Router();

const {
  addProductController,
  getAllProductsController,
  searchProductController,
} = require("../controllers/productController");

router.post("/product", addProductController);

module.exports = router;
