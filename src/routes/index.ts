import { Router } from "express";
import { userRoutes } from "../modules/users/user.routes";
import { productRoutes } from "../modules/products/product.route";
import { sellRoutes } from "../modules/sell/sell.routes";
import { couponRoutes } from "../modules/coupons/coupon.route";

const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/sells", sellRoutes);
router.use("/coupons", couponRoutes);

export default router;
