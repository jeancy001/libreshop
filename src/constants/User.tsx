
export interface Address {
    type: string;
    city: string;
    street: string;
    postalCode: string;
    country: string;
    _id: string;
  }
  export interface User{
    _id: string;
    username: string;
    email: string;
    profileUrl: string;
    address: Address[];
    tel?: string;
    role: 'admin' | 'client' | string;
    createdAt: string
  }
  