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
    const products = await prisma.product.findMany();
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
    const updatedProduct = await prisma.product.update({
      where: {
        id: data.id,
      },
      data,
    });
    return updatedProduct;
  },

  delete: async (id: string) => {
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
    });
    return product;
  },
};
