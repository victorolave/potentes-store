import { prisma } from "../../../config/prisma";

// Type definitions
export type Coupon = {
  id?: string;
  code: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// Database operations (Model functionality)
export const CouponModel = {
  findAll: async () => {
    const coupons = await prisma.coupon.findMany();
    return coupons;
  },

  create: async (data: Coupon) => {
    const newCoupon = await prisma.coupon.create({
      data,
    });
    return newCoupon;
  },

  update: async (data: Coupon) => {
    const updatedCoupon = await prisma.coupon.update({
      where: {
        id: data.id,
      },
      data,
    });
    return updatedCoupon;
  },

  delete: async (id: string) => {
    const deletedCoupon = await prisma.coupon.delete({
      where: {
        id,
      },
    });
    return deletedCoupon;
  },

  findById: async (id: string) => {
    const coupon = await prisma.coupon.findUnique({
      where: {
        id,
      },
    });
    return coupon;
  },
};
