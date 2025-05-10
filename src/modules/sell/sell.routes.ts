import { Router, Request, Response } from "express";
import {
    createSell,
    updateSell,
    deleteSell,
    getSellById,
    getAllSells,
} from "./sell.controller";
const router = Router();

router.post(
  "/",
    async (req: Request, res: Response) => await createSell(req, res)
);

router.put(
  "/",
  async (req: Request, res: Response) => await updateSell(req, res)
);

router.delete(
  "/",
  async (req: Request, res: Response) => await deleteSell(req, res)
);

router.get(
  "/",
  async (req: Request, res: Response) => await getAllSells(req, res)
);

router.get(
  "/:id",
  async (req: Request, res: Response) => await getSellById(req, res)
);

export { router as sellRoutes };