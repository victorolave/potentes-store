import { Request, Response, Router } from "express";
import {
  createcoupon,
  updateCoupon,
  deleteCoupon,
  getCouponById,
  getAllCoupons,
} from "./coupon.controller";
const router = Router();

router.post(
  "/",
  async (req: Request, res: Response) => await createcoupon(req, res)
);

router.put(
  "/:id",
  async (req: Request, res: Response) => await updateCoupon(req, res)
);

router.delete(
  "/:id",
  async (req: Request, res: Response) => await deleteCoupon(req, res)
);

router.get(
  "/",
  async (req: Request, res: Response) => await getAllCoupons(req, res)
);

router.get(
  "/:id",
  async (req: Request, res: Response) => await getCouponById(req, res)
);

export { router as couponRoutes };
