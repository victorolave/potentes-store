import { Router, Request, Response } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
} from "./user.controller";

const router = Router();

router.post(
  "/",
    async (req: Request, res: Response) => await createUser(req, res)
);

router.put(
  "/:id",
  async (req: Request, res: Response) => await updateUser(req, res)
);

router.delete(
  "/:id",
  async (req: Request, res: Response) => await deleteUser(req, res)
);

router.get(
  "/",
  async (req: Request, res: Response) => await getAllUsers(req, res)
);

router.get(
  "/:id",
  async (req: Request, res: Response) => await getUserById(req, res)
);

export { router as userRoutes };