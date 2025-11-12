// types/Product.ts
export interface Product {
    stock: number;
    status: string;
    deliveryOptions: string[];
    _id: string;
    name: string;
    description: string;
    imageUrl: string[];
    price: number;
    brand:string,
    category:string,
    rating:string[],
    discountPercentage:number,
    priceAfterDiscount:number,
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  