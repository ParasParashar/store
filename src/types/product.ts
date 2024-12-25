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


// User type
export type User = {
  id: string;
  name: string;
  email: string;
  addresses?: Address[];
  orders?: Order[];
}

// Address type
export type Address = {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

// Order type
export type Order = {
  id: string;
  userId: string;
  paymentMethod: PaymentMethod;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: OrderStatus;
  totalAmount: number;
  orderItems: OrderItem[];
  deliveryStatus: DeliveryStatus;
  shippingAddressId: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

// OrderItem type
export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  createdAt: string;
  variant?: Variant;
  attribute?: Attribute;
  updatedAt: string;
}

// ShippingAddress type
export type ShippingAddress = {
  id: string;
  email: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}



export enum PaymentMethod {
  COD = "COD",
  ONLINE = "ONLINE",
}

// Enum for order status
export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  PROCESSING = 'PROCESSING",
}

export enum DeliveryStatus {
  PENDING = "PENDING",
  SHIPPED = 'SHIPPED',
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
}
