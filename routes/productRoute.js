const express = require("express");
const router = express.Router();

const {createProduct} = require("../controlers/productControler");
router.post("/products/new",createProduct);


module.exports = router;