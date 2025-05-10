import { Router, Request, Response } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  async (req: Request, res: Response) => await AuthController.login(req, res)
);

export { router as authRoutes };
