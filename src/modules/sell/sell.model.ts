type ProductSell = {
    id?: string;
    productId: string;
    quantity: number;
    totalPrice: number; // Total price for the product in the sell
}

type Sell = {
    id?: string;
    customerId: string;
    employeeId?: string;
    totalPrice: number; // Total price for the entire sell
    products: ProductSell[];
};

export type { Sell };