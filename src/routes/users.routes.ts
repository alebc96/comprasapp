import { Router } from "express";
import {
  activatedUser,
  createUser,
  deleteUserById,
  desactivateUser,
  getUserByEmail,
  getUserById,
  getUsers,
  login,
  updateUserById,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.post("/users/login", login);
router.get("/users-id", getUserById);
router.delete("/users", deleteUserById);
router.put("/users", updateUserById);
router.patch("/users/activate", activatedUser);
router.patch("/users/desactivate", desactivateUser);
router.get("/users-by-email", getUserByEmail);

export default router;