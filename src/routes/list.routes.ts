import { Router } from "express";
import {
  createList,
  deleteList,
  getAllList,
  getListById,
  getListByUserId,
  updateList,
} from "../controllers/list.controller";

const router = Router();

router.get("/lists", getAllList);
router.get("/lists-by-id", getListByUserId);
router.post("/lists", createList);
router.get("/lists-id", getListById);
router.delete("/lists", deleteList);
router.put("/lists", updateList);

export default router;
