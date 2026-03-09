const Product = require("../models/Product");
const User = require("../models/User");

const addProductController = async (req, res) => {
  try {
    // Get Data From req.body
    const { name, price, stock, userId } = req.body;
    // Validation Data
    if (!name || !price || !stock)
      return res.status(404).json({ msg: "Missing Data" });
    // Check Admin Role
    const checkAdmin = await User.findById(userId);

    if (!checkAdmin) return res.status(404).json({ msg: "User Not Found" });
    // Check Role
    if (checkAdmin.role !== "admin") return res.json({ msg: "Access Denied" });
    // Create New Product
    const product = await Product.create({
      name,
      price,
      stock,
    });
    // Response

    res.status(201).json({
      msg: "Done Create Product",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const getAllProductsController = async (req, res) => {
  try {
  } catch (error) {}
};
const searchProductController = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  addProductController,
  getAllProductsController,
  searchProductController,
};
