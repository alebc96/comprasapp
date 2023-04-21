"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
router.post("/products", product_controller_1.createProduct);
router.get("/products", product_controller_1.getProducts);
router.get("/products-id", product_controller_1.getProductById);
router.put("/products", product_controller_1.updateProductById);
router.delete("/products", product_controller_1.deleteProductById);
router.get("/products-list", product_controller_1.getAllProductsByList);
exports.default = router;
