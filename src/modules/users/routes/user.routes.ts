import { Router, Request, Response } from "express";
import { UserController } from "../controllers";

const router = Router();

router.post(
  "/",
  async (req: Request, res: Response) =>
    await UserController.createUser(req, res)
);

router.put(
  "/:id",
  async (req: Request, res: Response) =>
    await UserController.updateUser(req, res)
);

router.delete(
  "/:id",
  async (req: Request, res: Response) =>
    await UserController.deleteUser(req, res)
);

router.get(
  "/",
  async (req: Request, res: Response) =>
    await UserController.getAllUsers(req, res)
);

router.get(
  "/:id",
  async (req: Request, res: Response) =>
    await UserController.getUserById(req, res)
);

export { router as userRoutes };
