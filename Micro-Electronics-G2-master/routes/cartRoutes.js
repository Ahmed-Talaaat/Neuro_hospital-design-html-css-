const express = require("express");

const router = express.Router();

const { addCart } = require("../controllers/cartController");

router.post("/cart", addCart);

module.exports = router;
