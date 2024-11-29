import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import useCartController from "@/hooks/useCartController";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Cross, X } from "lucide-react";

const CartSlider = () => {
  const { isOpen, onClose } = useCartController();
  const { items } = useCart();
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
      {/* <SheetTrigger>Cart sdfsldfj</SheetTrigger> */}
      <SheetContent side={"right"} className="p-0">
        <SheetHeader>
          <SheetTitle className="text-muted-foreground p-3">
            Items in my cart: {items.length}
          </SheetTitle>
          <SheetDescription className="flex px-2  flex-col gap-2">
            {items.map((item) => (
              <Card key={item.id} className="relative">
                <Button
                  variant={"ghost"}
                  size="icon"
                  className="absolute top-1 right-3 rounded-full "
                >
                  <X />
                </Button>
                <CardContent className="p-2 flex  gap-3">
                  <div className="w-1/4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h6 className="text-lg font-semibold text-muted-foreground">
                      {item.name}
                    </h6>
                    <div className="flex gap-x-3  text-md font-medium">
                      <p className="text-muted-foreground">
                        Size: <span className="text-primary">{item.size} </span>
                      </p>
                      <p className="text-muted-foreground">
                        Qty:{" "}
                        <span className="text-primary">{item.quantity} </span>
                      </p>
                    </div>
                    <p className="text-xl font-bold"> &#8377;{item.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </SheetDescription>
          <div className=" absolute bottom-0 left-0 shadow-inner rounded-t-xl flex flex-col items-start justify-start p-3 m-0 border-t border-2 w-full gap-3">
            <p className="text-lg  font-semibold">Order Details</p>
            <div className="flex text-sm justify-between items-center w-full">
              <p className="text-muted-foreground">Subtotal</p>
              <p className=" font-semibold"> &#8377;{total}</p>
            </div>
            <div className="flex items-center justify-between w-full p-3 border-1 border-secondary-foreground">
              <div className="flex flex-col justify-start items-start  w-full">
                <p className="text-lg font-bold"> &#8377;{total}</p>
                <p className="text-muted-foreground text-sm font-semibold">
                  (Incl.of All Taxes)
                </p>
              </div>
              <Button
                className="px-10 p-3 w-1/2 font-bold text-white bg-green-950 hover:opacity-55"
                disabled={items.length === 0}
              >
                PLACE ORDER
              </Button>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartSlider;
