import { Router } from "express";
import {
  signup,
  signin,
  getAllUsers,
  updateUser,
  deleteUser,
  toggleBlockUser,
  getUsers,
  promoteToAdmin,
} from "../controllers/auth.js";
import { checkAdmin, checkAuth } from "../middleware/checkAuth.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", checkAuth, checkAdmin, getAllUsers);
router.get("/users/:userId", checkAuth, getUsers);
router.put("/users/:userId", checkAuth, updateUser);
router.delete("/users/:userId", checkAuth, checkAdmin, deleteUser);
router.patch(
  "/users/:userId/toggle-block",
  checkAuth,
  checkAdmin,
  toggleBlockUser
);
router.patch("/users/:userId/promote", checkAuth, checkAdmin, promoteToAdmin);

export default router;
