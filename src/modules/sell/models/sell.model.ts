import { prisma } from "../../../config/prisma";

// Type definitions
export type ProductSell = {
  id?: string;
  productId: string;
  quantity: number;
  colorId: string;
  sizeId: string;
  totalPrice: number; // Total price for the product in the sell
  sellId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Sell = {
  id?: string;
  customerId: string;
  employeeId?: string;
  totalPrice: number; // Total price for the entire sell
  couponCode?: string;
  createdAt?: Date;
  updatedAt?: Date;

  products: ProductSell[];
};

// Database operations (Model functionality)
export const SellModel = {
  findAll: async () => {
    const sells = await prisma.sell.findMany({
      include: {
        customer: true,
        employee: true,
        productSells: {
          include: {
            product: true,
          },
        },
      },
    });

    return sells;
  },

  create: async (data: Sell) => {
    const { products, ...sell } = data;

    const newSell = await prisma.sell.create({
      data: sell,
    });

    const productSellPromises = products.map((product) =>
      prisma.productSell.create({
        data: {
          ...product,
          sellId: newSell.id,
        },
      })
    );

    await Promise.all(productSellPromises);

    const createdSell = await prisma.sell.findUnique({
      where: {
        id: newSell.id,
      },
      include: {
        customer: true,
        employee: true,
        productSells: {
          include: {
            product: true,
          },
        },
      },
    });

    return createdSell;
  },

  update: async (data: Sell) => {
    const { products, ...sell } = data;

    const updatedSell = await prisma.sell.update({
      where: {
        id: data.id,
      },
      data: sell,
    });

    await prisma.productSell.deleteMany({
      where: {
        sellId: data.id,
      },
    });

    const productSellPromises = products.map((product) =>
      prisma.productSell.create({
        data: {
          ...product,
          sellId: updatedSell.id,
        },
      })
    );

    await Promise.all(productSellPromises);

    const refreshedSell = await prisma.sell.findUnique({
      where: {
        id: updatedSell.id,
      },
      include: {
        customer: true,
        employee: true,
        productSells: {
          include: {
            product: true,
          },
        },
      },
    });

    return refreshedSell;
  },

  delete: async (id: string) => {
    await prisma.productSell.deleteMany({
      where: {
        sellId: id,
      },
    });

    const deletedSell = await prisma.sell.delete({
      where: {
        id,
      },
    });

    return deletedSell;
  },

  findById: async (id: string) => {
    const sell = await prisma.sell.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        employee: true,
        productSells: {
          include: {
            product: true,
          },
        },
      },
    });

    return sell;
  },
};
