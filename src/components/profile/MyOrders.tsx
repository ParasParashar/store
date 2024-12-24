import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import { Order } from "@/types/product";
import { Badge } from "../ui/badge";

export default function MyOrders({ orders }: { orders?: Order[] }) {
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

  if (!orders) {
    return (
      <p className="text-center py-6 text-sm lg:text-lg text-muted-foreground">
        Currently You don&apos;t have any orders.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">My Orders</h1>
      <Tabs defaultValue="all" className="flex-1 flex flex-col w-full">
        <TabsList className="grid w-full grid-cols-3 sticky top-14 bg-muted border-2 border-secondary z-50">
          <TabsTrigger value="all">All Orders {orders?.length} </TabsTrigger>
          <TabsTrigger value="pending">Pending {}</TabsTrigger>
          <TabsTrigger value="completed">Delivered</TabsTrigger>
        </TabsList>
        <div className="overflow-y-auto hide-scrollbar flex-1 max-h-[calc(100vh-220px)]">
          <TabsContent value="all">
            <OrderList orders={orders} getStatusColor={getStatusColor} />
          </TabsContent>
          <TabsContent value="pending">
            <OrderList
              orders={orders.filter(
                (order) => order.deliveryStatus !== "DELIVERED"
              )}
              getStatusColor={getStatusColor}
            />
          </TabsContent>
          <TabsContent value="completed">
            <OrderList
              orders={orders.filter(
                (order) => order.deliveryStatus === "DELIVERED"
              )}
              getStatusColor={getStatusColor}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function OrderList({
  orders,
  getStatusColor,
}: {
  orders: Order[];
  getStatusColor: (status: string) => void;
}) {
  if (orders.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No orders found.</p>;
  }

  return (
    <section>
      <div className="space-y-6 ">
        {orders.map((order: Order) => (
          <Card key={order.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-sm  sm:text-xl">
                <span>
                  Order Id: <span>#{order.id}</span>{" "}
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
                    <p className="text-sm text-gray-500">
                      {order.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-gray-500">{order.status}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Order Items</h4>
                  <div className="grid gap-4">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          <img
                            src={
                              item.product.imageUrl ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLhnhmcS5dy1pOq9OA6HOI4_jvpc0zKa_4xA&s"
                            }
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            // width={64}
                            // height={64}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs min-[380px]:text-sm font-medium text-wrap  ">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
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
      </div>
    </section>
  );
}
