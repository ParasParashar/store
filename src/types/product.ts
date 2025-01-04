export type Seller = {
  id: string;
  name: string;
  email: string;
  contact?: string | null;
  googleId: string;
  products: Product[];
  shiprocketEmail?: string
  shiprocketPassword?: string
};


export type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  totalQuantity: number;
  status: ProductStatus;
  images: string[];
  isDeleted: boolean;
  isPublished: boolean;
  variants: Variant[];
  discountPercent?: string;
  isFeatured?: boolean;
  slug?: string;
  categoryId: string;
  category: Category;
  sellerId: string;
  seller: Seller;
  createdAt: Date;
  updatedAt: Date;
};


export type Category = {
  id: string; // MongoDB ObjectId
  name: string;
  description?: string | null; // Optional description
  parentId?: string | null; // ID of the parent category (if exists)
  parent?: Category | null; // Parent category object
  subcategories: Category[]; // List of subcategories
  products?: Product[]; // List of products under this category
};


export type Variant = {
  id: string; // MongoDB ObjectId
  color: string; // Color of the variant
  images: string[]; // Images specific to this variant
  attributes: Attribute[]; // Attributes (e.g., size, stock)
  productId: string; // ID of the related product
  product: Product; // Related product object
  createdAt: Date;
  updatedAt: Date;
};


export type Attribute = {
  id: string; // MongoDB ObjectId
  size: string; // Size of the variant
  stock: number; // Stock level for this size
  price?: number | null; // Optional price override
  sku?: string | null; // Optional SKU for inventory tracking
  variantId: string; // ID of the related variant
  variant: Variant; // Related variant object
};


export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  OUT_OF_STOCK = "out_of_stock",
  DISCONTINUED = "discontinued",
}



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
  user: User;
  paymentMethod: PaymentMethod;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: PaymentStatus;
  totalAmount: number;
  deliveryStatus: DeliveryStatus;
  shippingAddressId: string;
  shippingAddress: ShippingAddress;
  createdAt: Date;
  updatedAt: Date;
  SubOrder: SubOrder[];
};

export type SubOrder = {
  id: string;
  parentOrderId: string;
  parentOrder: Order;
  sellerId: string;
  seller: Seller;
  orderItems: OrderItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  deliveryStatus: DeliveryStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  attributeId?: string;
  attribute?: Attribute;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  Delivery: Delivery[];
  subOrderId: string;
  SubOrder: SubOrder;
};

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


export type Delivery = {
  id: string;
  orderItemId: string;
  orderItem: OrderItem;
  sellerId: string;
  seller: Seller;
  deliveryService: string;
  trackingId?: string;
  deliveryStatus: DeliveryStatus;
  estimatedDelivery?: string;
  createdAt: Date;
  updatedAt: Date;
};



export enum PaymentMethod {
  COD = "COD",
  ONLINE = "ONLINE",
}

// Enum for order status
export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  PROCESSING = 'PROCESSING'
}
export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PROCESSING = 'PROCESSING'
}

export enum DeliveryStatus {
  PENDING = "PENDING",
  SHIPPED = 'SHIPPED',
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
}
