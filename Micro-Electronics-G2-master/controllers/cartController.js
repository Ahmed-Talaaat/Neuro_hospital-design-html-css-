const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

const addCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!productId || !quantity)
      return res.status(404).json({ msg: "Missing Data" });

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User Not Found" });

    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ msg: "Product Not Found" });

    if (quantity > product.stock) return res.json({ msg: "Your Order Large" });

    // Cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) cart = await Cart.create({ user: userId, items: [] });
    return console.log(cart);
  } catch (error) {}
};

module.exports = { addCart };
