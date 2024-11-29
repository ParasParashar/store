import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import useCartController from "@/hooks/useCartController";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const CartSlider = () => {
  const { isOpen, onClose } = useCartController();
  const { items, removeItem } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={() => onClose()}>
      <SheetContent
        side={"right"}
        className="p-0 border-none rounded-l-2xl h-full ring-0"
      >
        <SheetHeader>
          <SheetTitle className="text-muted-foreground px-4 py-3 border-b">
            Items in my cart: {items.length}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Scrollable Cart Items */}
          <SheetDescription className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {items.map((item) => (
              <Card
                key={`${item.id}-${item.size}-${item.color}`}
                className="relative mb-4 shadow-md"
              >
                <Button
                  variant={"ghost"}
                  size="icon"
                  className="absolute top-2 right-2 rounded-full"
                  onClick={() => removeItem(item.id)}
                >
                  <X />
                </Button>
                <CardContent className="p-4 flex gap-3 items-start">
                  <div className="w-1/4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg object-cover w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h6 className="text-lg font-semibold text-muted-foreground truncate">
                      {item.name}
                    </h6>
                    <div className="flex gap-3 text-md font-medium mt-1">
                      <p className="text-muted-foreground">
                        Size: <span className="text-primary">{item.size}</span>
                      </p>
                      <p className="text-muted-foreground">
                        Qty:{" "}
                        <span className="text-primary">{item.quantity}</span>
                      </p>
                    </div>
                    <p className="text-xl font-bold mt-2">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </SheetDescription>

          {/* Sticky Footer */}
          <div className="bg-white shadow-inner rounded-t-xl border-t p-4 sticky bottom-0 backdrop-filter ">
            <p className="text-lg font-semibold">Order Details</p>
            <div className="flex justify-between items-center text-sm mt-2">
              <p className="text-muted-foreground">Subtotal</p>
              <p className="font-semibold">₹{total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <p className="text-lg font-bold">₹{total.toFixed(2)}</p>
                <p className="text-muted-foreground text-sm font-medium">
                  (Incl. of All Taxes)
                </p>
              </div>
              <Button
                onClick={handleCheckout}
                className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                disabled={items.length === 0}
              >
                PLACE ORDER
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSlider;
