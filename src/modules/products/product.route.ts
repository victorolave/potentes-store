import { Router, Request, Response } from "express";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
} from "./product.controller";

const router = Router();

router.post(
  "/",
    async (req: Request, res: Response) => await createProduct(req, res)
);

router.put(
  "/:id",
  async (req: Request, res: Response) => await updateProduct(req, res)
);

router.delete(
  "/:id",
  async (req: Request, res: Response) => await deleteProduct(req, res)
);

router.get(
  "/",
  async (req: Request, res: Response) => await getAllProducts(req, res)
);

router.get(
  "/:id",
  async (req: Request, res: Response) => await getProductById(req, res)
);

export { router as productRoutes };