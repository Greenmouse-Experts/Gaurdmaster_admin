export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  type: "product" | "service";
  sku: string;
  price: string;
  cost: string;
  currency: string;
  stock: number;
  trackInventory: boolean;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
}
