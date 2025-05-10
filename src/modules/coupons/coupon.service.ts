import { Coupon } from "./coupon.model";
import { prisma } from "../../config/prisma";

const couponsService = {
  findAll: async () => {
    const coupons = await prisma.coupon.findMany();

    return coupons;
  },

  createCoupon: async (data: Coupon) => {
    const newCoupon = await prisma.coupon.create({
      data,
    });

    return newCoupon;
  },
  updateCoupon: async (data: Coupon) => {
    const updatedCoupon = await prisma.coupon.update({
      where: {
        id: data.id,
      },
      data,
    });

    return updatedCoupon;
  },

  deleteCoupon: async (data: Coupon) => {
    const deletedCoupon = await prisma.coupon.delete({
      where: {
        id: data.id,
      },
    });

    return deletedCoupon;
  },

  findCouponById: async (id: string) => {
    const coupon = await prisma.coupon.findUnique({
      where: {
        id,
      },
    });

    return coupon;
  },
};

export { couponsService };
