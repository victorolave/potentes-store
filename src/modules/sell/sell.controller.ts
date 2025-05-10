import { Request, Response } from 'express';
import { createSellSchema, updateSellSchema } from './sell.validation';
import { sellService } from './sell.service';
import { Sell } from './sell.model';
import { productsService } from '../products/product.service';
import { Product } from '../products/product.model';

const createSell = async (req: Request, res: Response) => {
    const result = createSellSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ error: result.error.errors });
        return;
    }

    const sell = await sellService.createSell(result.data as Sell);

    sell?.productSells.forEach(async (product) => {
        const productData = await productsService.findProductById(product.productId);

        if (!productData) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        productsService.updateProduct({
            id: product.productId,
            stock: productData.stock - product.quantity
        } as Product)
    })


    res.status(201).json(sell);
}

const updateSell = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = updateSellSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ error: result.error.errors });
        return;
    }

    const sell = await sellService.updateSell(result.data as Sell);
    res.status(200).json(sell);
}

const deleteSell = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: 'Sell ID is required' });
        return;
    }

    const sell = await sellService.deleteSell(id);
    res.status(200).json(sell);
}

const getSellById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: 'Sell ID is required' });
        return;
    }

    const sell = await sellService.findSellById(id);
    res.status(200).json(sell);
}

const getAllSells = async (req: Request, res: Response) => {
    const sells = await sellService.findAll();
    res.status(200).json(sells);
}

export {createSell, updateSell, deleteSell, getSellById, getAllSells};