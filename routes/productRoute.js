const express = require("express");
const router = express.Router();

const createProduct = require("../controlers/productControler");
router.route("/products/new").post(createProduct);