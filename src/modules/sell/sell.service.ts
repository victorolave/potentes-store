import { prisma } from "../../config/prisma";
import { Sell } from "./sell.model";

const sellService = {
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

    createSell: async (data: Sell) => {

        const { products, ...sell } = data;

        const newSell = await prisma.sell.create({
            data: sell,
        });

        products.forEach(async (product) => {
            await prisma.productSell.create({
                data: {
                    ...product,
                    sellId: newSell.id,
                }
            })
        })

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

    updateSell: async (data: Sell) => {

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

        products.forEach(async (product) => {
            await prisma.productSell.create({
                data: {
                    ...product,
                    sellId: updatedSell.id,
                }
            })
        })

        return updatedSell;
    },

    deleteSell: async (id:string) => {
        const deletedSell = await prisma.sell.delete({
            where: {
             id,
            },
        });

        return deletedSell;
    },

    findSellById: async (id: string) => {
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

export { sellService };