import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import { Order, OrderItem, User } from "@/types/product";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import AxiosBase from "@/lib/axios";
import { OrderSkeleton } from "../loaders/OrderSkeleton";
import { Navigate } from "react-router-dom";

export default function MyOrders() {
  const { data: authUser } = useQuery<User>({ queryKey: ["authUser"] });
  if (!authUser) {
    return <Navigate to="/" />;
  }

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await AxiosBase.get(
        "/api/store/profile/orders/" + authUser?.id
      );
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });

  if (isLoading) {
    return <OrderSkeleton />;
  }
  if (!orders) {
    return (
      <p className="text-center py-6 text-sm lg:text-lg text-muted-foreground">
        Currently You don&apos;t have any orders.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8 ">My Orders</h1>
      <Tabs defaultValue="all" className="flex-1 flex flex-col w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted border-2 border-secondary z-50 sticky top-2 px-2">
          <TabsTrigger value="all">All Orders {orders?.length}</TabsTrigger>
          <TabsTrigger value="pending">
            Pending{" "}
            {
              orders.filter(
                (order: Order) => order.deliveryStatus === "PENDING"
              ).length
            }
          </TabsTrigger>
          <TabsTrigger value="completed">
            Delivered{" "}
            {
              orders.filter(
                (order: Order) => order.deliveryStatus === "DELIVERED"
              ).length
            }
          </TabsTrigger>
        </TabsList>
        <div className="overflow-y-auto hide-scrollbar flex-1 ">
          <TabsContent value="all">
            <OrderList isLoading={isLoading} orders={orders} />
          </TabsContent>
          <TabsContent value="pending">
            <OrderList
              isLoading={isLoading}
              orders={orders.filter(
                (order: Order) => order.deliveryStatus === "PENDING"
              )}
            />
          </TabsContent>
          <TabsContent value="completed">
            <OrderList
              isLoading={isLoading}
              orders={orders.filter(
                (order: Order) => order.deliveryStatus === "DELIVERED"
              )}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function OrderList({
  orders,
  isLoading,
}: {
  orders: Order[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <OrderSkeleton />;
  }

  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No orders found.</p>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "OUT_FOR_DELIVERY":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="space-y-6 h-full ">
      {orders.map((order: Order) => (
        <Card key={order.id} className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-sm sm:text-xl">
              <span>
                Order ID: <span>#{order.id}</span>
              </span>
              <Badge className={getStatusColor(order.deliveryStatus)}>
                {order.deliveryStatus}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-sm font-medium">Date Placed</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-sm text-gray-500">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-gray-500">{order.status}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Order Items</h4>
                <div className="space-y-4">
                  {order.orderItems.map((item: OrderItem) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded bg-gray-100">
                        <img
                          src={
                            item.variant?.images?.[0] ||
                            "/placeholder-image.jpg"
                          }
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item?.variant?.color}, {item?.attribute?.size} (Qty:{" "}
                          {item.quantity})
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        ₹{item.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
