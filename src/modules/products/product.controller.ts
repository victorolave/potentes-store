import { Request, Response } from "express";
import { createProductSchema, updateProductSchema } from "./product.validation";
import { Product } from "./product.model";
import { productsService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  console.log("Creating product...", req.body);
  const result = createProductSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error.errors });
    return;
  }

  const product = await productsService.createProduct(result.data);
  res.status(201).json(product);
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = updateProductSchema.safeParse({ ...req.body, id });

  if (!result.success) {
    res.status(400).json({ error: result.error.errors });
    return;
  }

  const product = await productsService.updateProduct(result.data as Product);
  res.status(200).json(product);
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Product ID is required" });
    return;
  }

  const product = await productsService.deleteProduct({ id } as Product);
  res.status(200).json(product);
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Product ID is required" });
    return;
  }

  const product = await productsService.findProductById(id);
  res.status(200).json(product);
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await productsService.findAll();
  res.status(200).json(products);
};

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
};
