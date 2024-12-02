export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  slug: string;
  totalQuantity: number;
  status: string;
  isDeleted: boolean;
  isPublished: boolean;
  categoryId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description: string | null;
    parentId: string | null;
  };
  seller: {
    name: string;
    contact: string | null;
  };
  variants: Variant[];
  discountedPrice?: number;
  discountPercent?: string;
  isFeatured?: boolean;
}


export type Variant = {
  id: string;
  color: string;
  images: string[];
  productId: string;
  createdAt: string;
  updatedAt: string;
  attributes: Attribute[]
}

export type Attribute = {
  id: string;
  size: string;
  stock: number;
  price: number;
  sku: string | null;
  variantId: string;
}


export type Filters = {
  categoryId?: string;
  categoryName?: string;
  size?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
};