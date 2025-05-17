import { prisma } from "../../../config/prisma";
import { Inventory } from "../../inventory";

// Type definitions
export type Product = {
  id?: string;
  sku: string;
  status: string;
  name: string;
  careInstructions: string;
  imageUrl: string;
  description: string;
  price: number;
  inventory: Inventory[];
  createdAt?: Date;
  updatedAt?: Date;
};

// Database operations (Model functionality)
export const ProductModel = {
  findAll: async () => {
    const products = await prisma.product.findMany({
      include: {
        inventories: {
          include: {
            size: true,
            color: true,
          },
        },
      },
    });
    return products;
  },

  create: async (data: Product) => {
    const { inventory, ...productData } = data;

    const newProduct = await prisma.product.create({
      data: {
        ...productData,
        inventories: {
          createMany: {
            data: inventory.map((inventory) => ({
              sizeId: inventory.sizeId,
              colorId: inventory.colorId,
              quantity: inventory.quantity,
            })),
          },
        },
      },
    });
    return newProduct;
  },

  update: async (data: Product) => {
    const { inventory, ...productData } = data;

    const updatedProduct = await prisma.product.update({
      where: {
        id: data.id,
      },
      data: productData,
    });

    await prisma.inventory.deleteMany({
      where: {
        productId: data.id,
      },
    });

    await prisma.inventory.createMany({
      data: inventory.map((inventory) => ({
        ...inventory,
        productId: data.id!,
      })),
    });

    return updatedProduct;
  },

  delete: async (id: string) => {
    await prisma.inventory.deleteMany({
      where: {
        productId: id,
      },
    });

    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    return deletedProduct;
  },

  findById: async (id: string) => {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        inventories: {
          include: {
            size: true,
            color: true,
          },
        },
      },
    });
    return product;
  },
};
