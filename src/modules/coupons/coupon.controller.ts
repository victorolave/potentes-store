import { Request, Response } from "express";
import { createCouponSchema, updateCouponSchema } from "./coupon.validation";
import { Coupon } from "./coupon.model";
import { couponsService } from "./coupon.service";

const createcoupon = async (req: Request, res: Response) => {
  console.log("Creating coupon...", req.body);
  const result = createCouponSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error.errors });
    return;
  }

  const coupon = await couponsService.createCoupon(result.data);
  res.status(201).json(coupon);
};

const updateCoupon = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = updateCouponSchema.safeParse({ ...req.body, id });

  if (!result.success) {
    res.status(400).json({ error: result.error.errors });
    return;
  }

  const coupon = await couponsService.updateCoupon(result.data as Coupon);
  res.status(200).json(coupon);
};

const deleteCoupon = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Product ID is required" });
    return;
  }

  const coupon = await couponsService.deleteCoupon({ id } as Coupon);
  res.status(200).json(coupon);
};

const getCouponById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Product ID is required" });
    return;
  }

  const coupon = await couponsService.findCouponById(id);
  res.status(200).json(coupon);
};

const getAllCoupons = async (req: Request, res: Response) => {
  const coupons = await couponsService.findAll();
  res.status(200).json(coupons);
};

export {
  createcoupon,
  updateCoupon,
  deleteCoupon,
  getCouponById,
  getAllCoupons,
};
