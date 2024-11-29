import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Minus, Plus } from "lucide-react";

export function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={`${item.product.id}-${item.size}-${item.color}`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          {item.size && (
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size}
                            </p>
                          )}
                          {item.color && (
                            <p className="text-sm text-muted-foreground">
                              Color: {item.color}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>${item.product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
