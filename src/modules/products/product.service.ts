import { prisma } from "../../config/prisma";
import { Product } from "./product.model";

const productsService = {
  findAll: async () => {
    const products = await prisma.product.findMany();

    return products;
  },

  createProduct: async (data: Product) => {
    const newProduct = await prisma.product.create({
      data,
    });

    return newProduct;
  },
  updateProduct: async (data: Product) => {
    const updatedProduct = await prisma.product.update({
      where: {
        id: data.id,
      },
      data,
    });

    return updatedProduct;
  },
  deleteProduct: async (data: Product) => {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: data.id,
      },
    });

    return deletedProduct;
  },

  findProductById: async (id: string) => {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  },
};

export { productsService };
