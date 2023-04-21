import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProductsByList,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/product.controller";

const router = Router();

router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/products-id", getProductById);
router.put("/products", updateProductById);
router.delete("/products", deleteProductById);
router.get("/products-list", getAllProductsByList);

export default router;