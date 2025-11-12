export interface Product {
    _id: string;
    name: string;
    price: number;
    brand: string;
  }
  
  export interface OrderedProduct {
    _id: string;
    product: Product;
    quantity: number;
    priceAtPurchase: number;
  }
  
  export interface ShippingAddress {
    fullName: string;
    addressLine1: string;
    city: string;
    postalCode: string;
    country: string;
  }
  export interface User{
    _id:string,
    username:string,
    email:string,
    tel:string,
  }
  
  export interface Order {
    _id: string;
    user: User;
    shippingAddress: ShippingAddress;
    products: OrderedProduct[];
    deliveryOption: string;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    totalAmount: number;
    createdAt: string;
    updatedAt?: string;
  }
  